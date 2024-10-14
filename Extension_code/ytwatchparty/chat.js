console.log("prime chat js.....");
const memeurl = "https://g.tenor.com/v1/search?";
const key = "LIVDSRZULELA";
let inputt = document.getElementById("gif_box_parent");
const EMOJI1 = chrome.runtime.getURL("img/EMOJI4.gif");
const EMOJI2 = chrome.runtime.getURL("img/EMOJI2.gif");
const EMOJI3 = chrome.runtime.getURL("img/EMOJI_1.gif");
const EMOJI4 = chrome.runtime.getURL("img/EMOJI_5.gif");
const EMOJI5 = chrome.runtime.getURL("img/laugh.gif");
const EMOJI6 = chrome.runtime.getURL("img/EMOJI_3.gif");
const EMOJI7 = chrome.runtime.getURL("img/laugh_2.gif");
const img_send = document.getElementById('img_send');

let gifflg = 0;
const sendimg = chrome.runtime.getURL("img/send.png");
const filesect = chrome.runtime.getURL("img/pfuploadicon.png");
const giff = chrome.runtime.getURL("img/gif_img.png");
const moree = chrome.runtime.getURL("img/more.png");
let   videoContainer = document.querySelector('#columns');
let file;
let count = 0;
console.log("chat injecteddd..%%%%%%%%%%%%%%%%%..");
    // const maincontainer = document.querySelector('#columns');
    function chatinject() {
      return `
            <header class="header">
                <div class="logo">
                    <span class="party">Party</span><span class="flix">Flix</span>
                </div>
                <button class="copy-link" id="copy">Copy Link</button>
                <div class="avatar">
                    <img src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=B4L?flip=X8XR??backgroundType=o6zluR" alt="Avatar" style="width: 25px;height: 25px;" />
                </div>
            </header>
    
          <div class="chat-window">      
      <div id="chat_box_child">
        </div>
        </div>
    <div class="gif_box" id="gif_box_parent"  style="display:none";  >  <input id="input_meme"  style="padding: 4px;width: 100%;" value="" placeholder="Search Gif..."></input>            
    <div  id="gif-box"> 
    </div>
       <input class="hidden_input_img_box" id="input_img_box" type="file" >
         <footer class="footer">
    
    </div>
    <div class="emojis">
                    <div>
                    <img class="input_img_box" id="upload" src="${filesect}" alt="Click to upload" style="width: 25px;height: 25px;">
                 
                    </div><img   src="${giff}" id="gif_button"  alt="Gif" style="width: 25px;height: 25px;"/><img src="${EMOJI1}" alt="" id='EMOJI1' class="emoji_gif" style="width: 25px;height: 25px;"><img src="${EMOJI2}" id="EMOJI2" alt="" class="emoji_gif" style="width: 25px;height: 25px;"><img src="${EMOJI3}" id="EMOJI3" class="emoji_gif" alt="" style="width: 25px;height: 25px;"><img src="${EMOJI4}" class="emoji_gif" id="EMOJI4" alt="" style="width: 25px;height: 25px;"><img src="${EMOJI5}" id="EMOJI5" class="emoji_gif" alt="" style="width: 25px;height: 25px;"><img src="${EMOJI6}" alt="" id="EMOJI6" class="emoji_gif" style="width: 25px;height: 25px;"><img src="${EMOJI7}" alt="" id="EMOJI7" class="emoji_gif" style="width: 25px;height: 25px;"><img src="${moree}" id="emoji_button" alt="more img"  style="width: 25px;height: 25px;" />
                </div>
                <div class="chat-input">
                    <input  id="input_chat_box" type="text" placeholder="Chat...">
                    <button><img id="img_send"  src="${sendimg}" alt="Attach Image" style="width: 25px;height: 25px;" /></button>
                </div>
            </footer>
           `;
    }
    



  
let setinterv = setInterval(()=>{
  videoContainer = document.querySelector('#columns');
    console.log('run setintervalll....')
    if (videoContainer) {
      clearInterval(setinterv);
      window.postMessage({ type: "chatinit" }, "*");
      console.log("runnnn......");
      init();

    } else if (count > 1000) {
      clearInterval(setinterv);
    } 
    count++; 
},1500)


function init(){
  if (videoContainer) {
    // Adjust the video container's style to take up 70% of the width
    videoContainer.style.width = "75%";
    videoContainer.style.height = "100%";
    videoContainer.style.float = "left";
    videoContainer.style.padding = "6px";
  }
 
      let chat_box = document.createElement('div');
      chat_box.id = 'chat_box';
      chat_box.style.background = "#ffff"
  chat_box.className = "chat-container";
      videoContainer.appendChild(chat_box);
      document.getElementById('chat_box').innerHTML = chatinject();


//****************************************** */
let g = document.createElement("div");
g.id = "chat_toggle";

let arrow = document.createElement("div");
arrow.id = 'arrow';


// let text = document.createElement("span");
// text.innerText = "Hide Chat"; 

g.appendChild(arrow);
// g.appendChild(text);


document.body.append(g);



g.addEventListener("click", () => {
  if (chat_box.style.display === "block") {
    chat_box.style.display = "none";
  
    videoContainer.style.width = "100%";

    arrow.style.transform = "rotate(180deg)"; 

    g.style.right = "0px"; 
    g.style.paddingLeft = "0px";

  } else {
    chat_box.style.display = "block"; 
 
    videoContainer.style.width = "75%";
    g.style.paddingLeft = "15px";
    arrow.style.transform = "rotate(0deg)";
    

    g.style.right = "360px"; 
  }
});

//******************************************** */




const picker = new sn();
const button = document.querySelector('#emoji_button');
const input = document.querySelector('#input_chat_box');
// let video = document.querySelector('#subscribe-button-shape');

    let video = document.querySelector('#chat_box');
// let emojidiv = document.querySelector('.emoji-picker__custom-emoji')
// emojidiv[0].style.zIndex = '999999';

picker.on('emoji', e => {
    console.log(e.emoji,'emojiii.....')
    input.value += e.emoji;
    // input.focus();
    document.querySelector('.emoji-picker__wrapper')[0].style.display = 'block';
});

button.addEventListener('click', () => {
    console.log(picker,'pickerrrr....')
    picker.togglePicker(video);


});


let input_img = document.querySelector('#input_img_box');
if (input_img) {
  input_img.addEventListener('change', function() {
    console.log("Input changed");
    file = input_img.files[0];
    console.log(file, 'file object');
  });
} else {
  console.warn('Input element not found');
}



  if(document.querySelector('#chat_box_child')){
    document.querySelector('#img_send').addEventListener('click',()=>{
        console.log('run eventlist')
 let chatstring = document.querySelector('#input_chat_box').value;

if(chatstring.length>0){
   console.log("insisw")
    window.postMessage({ type: "chatsend", chat: chatstring }, "*");

    document.querySelector('#input_chat_box').value = "";
}

if (file) {
   
    const blob = new Blob([file]);
    console.log(file,'fffffff',blob)
  window.postMessage({type:'img_blob',blob:blob},"*");
  file = undefined;
  }


    })

}



async function gifmeme(query) {
  // q=pher%20hera%20pheari&key=LIVDSRZULEL
  try {
      let html="";
    let urll = `${memeurl}q=${query}&key=${key}`;
    console.log(urll, "urllll...");
    let res = await fetch(urll);
    if (!res.ok) {
      console.log("nores", res.status);
      return;
    }
    let data = await res.json();

    console.log(data, data?.results, "dataresul");
    data?.results.map((a, i) => {
      html += `<img src=${a?.media[0].gif["url"]} alt="Gif description" class="meme_gif" id=${i} />`;
    });

    return html;
  } catch (e) {
    console.error(e);
  }
}

function debouncefun() {
  let i;

  return function (qeary) {
    if (i) {
      clearTimeout(i);
    }
    i = setTimeout(async () => {
      console.log(document.querySelector("#gif-box").innerHTML);
      document.querySelector("#gif-box").innerHTML = await gifmeme(qeary);


      let childnode = document.querySelectorAll(".meme_gif");
      Array.from(childnode).forEach((a, i) => {
        a.addEventListener("click", (e) => {
          // Ensure the clicked element is an image with a 'src' attribute
          if (e.target.tagName === "IMG") {
            let url = e.target.src;
            window.postMessage({ type: "memeurl", url: url }, "*");
          }
        });
      });
    }, 500);
  };
}

let debouncer = debouncefun();

document.querySelector("#input_meme").addEventListener("input", (e) => {
  console.log(e.target.value, "targetvalue");
  debouncer(e.target.value);
});

if(document.querySelector("#gif_button")){
  document.querySelector("#gif_button").addEventListener("click", () => {
    if (gifflg == 0) {
      inputt = document.getElementById("gif_box_parent");
      inputt.style.display = "block";
      FirstTImeGIf();
      gifflg = 1;
    } else {
      inputt.style.display = "none";
      gifflg = 0;
    }
  });
  }
  
async function FirstTImeGIf(){
      document.querySelector("#gif-box").innerHTML = await gifmeme("");
      let childnode = document.querySelectorAll(".meme_gif");
      Array.from(childnode).forEach((a, i) => {
        a.addEventListener("click", (e) => {
          // Ensure the clicked element is an image with a 'src' attribute
          if (e.target.tagName === "IMG") {
            let url = e.target.src;
            window.postMessage({ type: "memeurl", url: url }, "*");
            document.querySelector("#gif_button").click();
          }
        });
      });
    }




  const copyButton = document.getElementById("copy");
  if(copyButton){
  copyButton.addEventListener("click", () => {
    chrome.storage.local.get(["crurl"], (r) => {
      if (r.crurl) {
        navigator.clipboard
          .writeText(r.crurl)
          .then(() => {
            console.log("Text copied to clipboard:", r.crurl);
          })
          .catch((err) => {
            console.error("Error copying text: ", err);
          });
      }
    });
  });
  }

document.addEventListener("keydown",(e)=>{
  if(e.key=="Enter" && img_send){
img_send.click();
  }
})




let emoji_gif = document.querySelectorAll('.emoji_gif');
emoji_gif.forEach((el)=>{
el.addEventListener("click",(e)=>{
  console.log('clicked...')
  let emojiId = e.target.src;
  console.log('clicked...',e,e.src);
  window.postMessage({type:"emoji_gif",emoji_Id:emojiId},"*");
})   
})






}
// const script = document.createElement('script');
// script.src = chrome.runtime.getURL('emoji_support.js'); // Adjust path as needed
// script.onload = () => {
//     // Initialize the EmojiButton after the script has loaded
//     const picker = new EmojiButton();
//     const button = document.querySelector('#emoji_button');
//     const input = document.querySelector('#input_chat_box');

//     picker.on('emoji', emoji => {
//         input.value += emoji;
//         input.focus();
//     });

//     button.addEventListener('click', () => {
//         picker.togglePicker(button);
//     });
// };
// document.head.appendChild(script);








    

