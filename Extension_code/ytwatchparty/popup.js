

window.onload = ()=>{
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let url    =  tabs[0].url;
if(url.includes("youtube.com/watch")|| (url.includes('hotstar.com')&& url.includes('watch')) ||(url.includes('primevideo.com')&& url.includes('detail')) ||(url.includes('jiocinema.com')&& url.includes('tv-shows')) || (url.includes('jiocinema.com')&& url.includes('movies'))||(url.includes('jiocinema.com')&& url.includes('sports'))){
  document.querySelector('#g_para').style.display = 'none';
document.querySelector('#input_section_p').style.display = 'block';
//movies,tv-shows
console.log("run if block ....")
}
else{
document.querySelector('#input_section_p').style.display = 'none';
document.querySelector('#g_para').style.display = 'block';
console.log("run else block ....")
}
})

const copyButton = document.getElementById('copy');
copyButton.addEventListener('click', () => {
  chrome.storage.local.get(['crurl'],(r)=>{
      if(r.crurl){
      navigator.clipboard.writeText(r.crurl)
      .then(() => {
        console.log('Text copied to clipboard:', r.crurl);
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });
  }
  });
  }) 

  chrome.storage.local.get(["crurl"],(r)=>{
    let inputt_url = document.querySelector("#showurl");
    let create =   document.getElementById("create_party")
    if(r.crurl){
      if(inputt_url){
        userinfoDiv.style.display = 'block';
        inputt_url.value = r.crurl;
        create.textContent = "leave Sassion";
      }
    }
  })
 



}



class first {
  constructor() {
    this.cheackbox = document.querySelector("#cheack_box_control");
    this.createparty = document.getElementById("create_party");
    
    // this.leaveButton = document.getElementById("disconnectButton");
    this.userName = document.getElementById("userName");
    this.saveButton = document.getElementById("save_name");
    this.iconurl =  "https://api.dicebear.com/9.x/fun-emoji/svg"
   this.usericon = document.getElementById('UserImg');
   this.userinfo = document.getElementById('userinfoDiv');
   this.parent = document.getElementById('parent');
   this.showurl =  document.querySelector("#showurl")
   this.flag = true;
  }
}

class second extends first {
  constructor() {
    super();
  }

  async callcheacboxclick() {
//    chrome.storage.local.get(['crurl',"leave2"],(result)=>{
// if(result.crurl.length>0){
//     this.userinfo.style.display = 'block';
//     document.querySelector("#showurl").textContent  = result.crurl;
// }

//  if(result.leave2){
//   this.createparty.disabled =true;
//   this.createparty.disabled = true;
//   this.parent.style.display = 'none'
//   this.destoryButton.style.display = 'block';
// }
//    })

chrome.storage.local.get(['imgurl','username','crurl'],(r)=>{
if(r.imgurl && r.username){
    console.log(r.imgurl,'imgurlll..')
    this.usericon.src = r.imgurl;
    this.userName.value = r.username;
}
else{
  document.querySelector('#alert_msg').textContent = "Set Name First"
}
})    

    this.saveButton.addEventListener("click", () => {
        console.log('ooooo')
      if (this.userName.value.length > 0) {
        console.log('ffff')
        let createurl = `${this.iconurl}?seed=${this.getRandomString(3)}?flip=${this.getRandomString(4)}??backgroundType=${this.getRandomString(6)}`
        chrome.storage.local.set({ username: this.userName.value,imgurl:createurl });
        window.location.reload();
      }
    });

    this.giveUserName().then((S)=>{
       if(S.length>0)this.createparty.disabled =false;
    });

   

    this.cheackbox.addEventListener("change", () => {
      chrome.storage.local.get(["cheackbox"], (r) => {
        let f = r.cheackbox || false;
        chrome.storage.local.set({ cheackbox: !f });
      });
    });

    this.createparty.addEventListener("click", async (e) => {
      let id = e.target.id;
      let start_leave_button = document.querySelector(`#${id}`)
      if(start_leave_button.textContent=='Start the Party'){
       
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          let url    =  tabs[0].url;
   chrome.storage.local.set({"tabid_reload": tabs[0].id})
   start_leave_button.textContent = 'leave Sassion';
         if(url.includes('youtube.com/watch')  ){
           this.flag = false;   
      this.sendMessageToContent("youtube.com")
        .then((response) => {
          console.log("Session URL:", response.sessionURL);
          this.userinfo.style.display = 'block';
          document.querySelector("#showurl").value = response.sessionURL;


            chrome.storage.local.set({crurl:response.sessionURL})
            chrome.runtime.sendMessage({ action: "chatcreate",h:"youtube.com"});
     
        })
        .catch((error) => {                                   
          document.querySelector('#alert_msg').textContent = "Please Refresh Page";
          console.error("Error:", error);
        })
    }
  else if(url.includes('hotstar.com')&& url.includes('watch')){
    this.sendMessageToContent("hotstar.com")
    .then((response) => {
      console.log("Session URL:", response.sessionURL);
      this.userinfo.style.display = 'block';
      document.querySelector("#showurl").value = response.sessionURL;


        chrome.storage.local.set({crurl:response.sessionURL})
        chrome.runtime.sendMessage({ action: "chatcreate",h:"hotstar.com"});
 
    })
    .catch((error) => {
      document.querySelector('#alert_msg').textContent = "Please Refresh Page";
      console.error("Error:", error);
    })

  }
  else if(url.includes("jiocinema.com")){
    this.sendMessageToContent("jiocinema.com")
    .then((response) => {
      console.log("Session URL:", response.sessionURL);
      this.userinfo.style.display = 'block';
      document.querySelector("#showurl").value = response.sessionURL;

        chrome.storage.local.set({crurl:response.sessionURL})
        chrome.runtime.sendMessage({ action: "chatcreate",h:"jiocinema.com"});
 
    })
    .catch((error) => {
      document.querySelector('#alert_msg').textContent = "Please Refresh Page";
      console.error("Error:", error);

    })

  } 
  else if(url.includes("primevideo.com") && url.includes('detail')){
    this.sendMessageToContent("primevideo.com")
    .then((response) => {
      console.log("Session URL:", response.sessionURL);
      this.userinfo.style.display = 'block';
      document.querySelector("#showurl").value = response.sessionURL;


        chrome.storage.local.set({crurl:response.sessionURL})
        chrome.runtime.sendMessage({ action: "chatcreate",h:"primevideo.com"});
 
    })
    .catch((error) => {
      document.querySelector('#alert_msg').textContent = "Please Refresh Page";
      console.error("Error:", error);
    })
  }
  else{
        confirm('This Is Not A Valid  Page Open A YouTube/HOtStar Page Video')
    }

    }) 
  }
  else{

    start_leave_button.textContent = 'Start the Party';
    this.handleleave();

  }
  
 
    });

    // this.leaveButton.addEventListener("click", this.handleleave.bind(this));
    
  }
  

  sendMessageToContent(h) {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          reject("No active tab found");
          return;
        }
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getURL",h:h },
          (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          }
        );
      });
    });
  }

  handleleave(e) {
    chrome.storage.local.remove("crurl")
    chrome.storage.local.remove("tabid_reload");
  //  chrome.storage.local.get(['tabid_reload'],(r)=>{
  //  if(r.tabid_reload){ 
  //   console.log(r.tabid_reload,'tabb==>>reloaddd...');
  //   chrome.storage.local.remove("tabid_reload");
  //       chrome.tabs.sendMessage(r.tabid_reload, { msg: "leavesassion" },()=>{
            
  //       });
    
  // }
  //     }); 
      chrome.runtime.sendMessage({msg:"leavesassion"},()=>{
        window.location.reload();  
      });
     
  }
  async giveUserName() {
    return new Promise((resolve) => {
      chrome.storage.local.get(["username"], (d) => {
        if (d.username) {
          resolve(d.username);
        } else {
          resolve("");
        }
      });
    });
  }

   getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}


}

const executeclss = new second();

executeclss.callcheacboxclick();



