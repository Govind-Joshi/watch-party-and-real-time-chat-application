console.log("runnnn.......")

let host = "http://localhost:5002/api/"
let videourl;
let fetchvideourl = `http://localhost:5002/api/ytr?ytSessionId=`
let sassionId;
function generateSessionId() {
    return 'session-' + Math.random().toString(36).substr(2, 9);
  }


  chrome.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
    if (request.action === "createSession" && request.url) {
        // Perform the session creation logic
        let u = generateSessionId()
        const sessionURL = `${host}ytr?ytSessionId=${u}`;
     sassionId = u;
   
        sendResponse({ sessionURL: sessionURL });
     await   senddatatoserver(request.url,request.timestamp,u,sessionURL,request.h);
     let createrId = generateUUID();
     chrome.storage.local.set({ ypsessionId: u,createrId}, () => {
        console.log('ypsessionId saved to storage');

        if(request.h=="youtube.com"){
        injectscript(sender.tab.id);
        }
        else if(request.h=="hotstar.com"){
            injectscriptHot(sender.tab.id,request.h)
          
        }
        else if(request.h=="jiocinema.com"){
            injectscriptHot(sender.tab.id,request.h)

        }
        else if(request.h=="primevideo.com"){
            injectscriptHot(sender.tab.id,request.h)
        }
    });
 
    }
    return true;  // Indicate that sendResponse will be called asynchronously
});



async function senddatatoserver(yturl, timestamp, sassionid, sasionurl,h) {
    let reqbody = {
        sasid: sassionid,
        sasionurl: sasionurl,
        yturl: yturl,
        timestamp: timestamp, 
        domain:h
    };

    try {
        const response = await fetch(`${host}sassiondata`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqbody)
        });

        if (response.ok) {
            console.log('Data sent successfully');
        } else {
            console.error('Failed to send data');
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}



// https://www.primevideo.com/



let flag = false;
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      
        if (changeInfo.url) {
            console.log('URL changed to:', changeInfo.url);
    
            const url = new URL(changeInfo.url);
            const ypsessionIdMatch = url.href.match(/[?&]ypsessionId=([^&#]*)/);
    
        
            if (ypsessionIdMatch && ypsessionIdMatch[1])  {
                const ypsessionId = ypsessionIdMatch[1];
                flag=true;
             console.log(url,tab.url,'cheta e kede');
                console.log('ypsessionId:', ypsessionId);
                let crurl = `${fetchvideourl}${ypsessionId}`
                chrome.storage.local.set({ ypsessionId: ypsessionId,leave2:true,crurl:crurl}, () => {
                    console.log('ypsessionId saved to storage');
                   if(tab.url.includes('youtube.com')){
                    injectscript(tabId)
                   }
                   else if(tab.url.includes('hotstar.com')) {
                    console.log('run...')
                    injectscriptHot(tabId,"hotstar.com")
                   
                   }
                   else if(tab.url.includes('jiocinema.com')){
                    injectscriptHot(tabId,"jiocinema.com")


                   }
                   else if(tab.url.includes('primevideo.com')){
                    injectscriptHot(tabId,"primevideo.com")
                   }

                });
             
            
                // console.log("injeccccccc***********************")
            //     setTimeout(()=>{
            //     injectchat(tabId);
            // })
      
              
          
             
            
            }
        }

        if(changeInfo.status === 'complete'){
            
            if(flag){
          
             if(tab.url.includes('youtube.com')){
                 injectchat(tabId);
             }
             else if(tab.url.includes('hotstar.com')){
                console.log("injeccccccc******complete...*****************")
                injectchath(tabId,'hotstar.com')
             }
             else if(tab.url.includes('jiocinema.com')){
                injectchath(tabId,'jiocinema.com')

             }
             else if(tab.url.includes('primevideo.com')){
                injectchath(tabId,'primevideo.com')
             }
           
            }
            flag = false;
            chrome.storage.local.set({tabid_reload2:tabId})
               
        }

    });
    



   async function injectscript(tabid){
    chrome.scripting.executeScript({
        target: { tabId: tabid },
        files: ['c1.js']
    }, function() {
        console.log('added script');
    });
   }

   
   async function injectscriptHot(tabid,domain){
    console.log('runnnn.')
    let script;
  if(domain=='hotstar.com'){
script = 'htcontent.js';

  }else if(domain=='jiocinema.com'){
    script = 'jioCinemaInit.js';
  }
  else if(domain=='primevideo.com'){

    script = 'primeinit.js';
  }


    chrome.scripting.executeScript({
        target: { tabId: tabid },
        files: [script]
    }, function() {
        console.log('added script');
    });
   }


   chrome.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
    if (request.action === "chatcreate") {
     console.log('chatcreate....chatcreate')
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if(request.h.includes("youtube.com")){
            injectchat(tabs[0].id);
            }
            else if(request.h.includes("hotstar.com")){

                injectchath(tabs[0].id,"hotstar.com");
            }
            else if(request.h.includes('jiocinema.com')){
                injectchath(tabs[0].id,"jiocinema.com");
            }
            else if(request.h.includes("primevideo.com")){
                injectchath(tabs[0].id,"primevideo.com");

            }



            chrome.storage.local.set({tabid_reload:tabs[0].id})
          });
  
    }

});


function injectchath(tabid,domain){
    console.log('runn....')
    let sct;
if(domain.includes("hotstar.com")){
sct = 'hotchat.js';
}
else if(domain.includes("jiocinema.com")){
    sct = 'jiocinemaChat.js'

}else if(domain.includes("primevideo.com")){
 sct = 'primechat.js'
}





    chrome.scripting.executeScript({
        target: { tabId: tabid },
        files: [sct]
    }, function() {
        console.log('added script');
    });
}
function injectchat(tabid){
    chrome.scripting.executeScript({
        target: { tabId: tabid },
        files: ['chat.js']
    }, function() {
        console.log('added script');
    });
}



function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



// chrome.storage.local.get(['ypsessionId'],(r)=>{
//     if(r.ypsessionId){
// console.log(r.ypsessionId,'ypsassionid')


// }

//     })


// async function fetchHotUrl(finala) {
//     return new Promise((resolve, reject) => {
//     //   let finala = `http://localhost:5002/api/hot?ytSessionId=session-xsignn5ie`;
//       fetch(finala)
//         .then((res) => res.json())
//         .then((d) => {
//           console.log(d.url);
//      videourl =d.url;
//           resolve(d.url);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//           reject(error); // Ensure you reject the promise on error
//         });
//     });
//   }
  
//   chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
//     if (req.msg === "hsurl") {
//       try {

//         sendResponse({ url: videourl });
//         // fetchHotUrl().then(url => {console.log('Direct fetch URL:', videourl);
          
//         // }).catch(console.error);


//       } catch (error) {
//         sendResponse({ error: 'Failed to fetch URL' }); // Handle errors and send an appropriate response
//       }
//     }
  
//     return true; 
//   });
  


chrome.runtime.onMessage.addListener((req,sender,scallback)=>{
   if(req.msg=='leavesassion'){
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            let url = tab.url;
       if(url.includes("youtube.com")||url.includes('jiocinema.com')||url.includes('hotstar.com')||url.includes('primevideo.com')){     
          chrome.tabs.reload(tab.id);
       }
        });
      });
    }    
})
//if(url.includes("youtube.com/watch")|| (url.includes('hotstar.com')&& url.includes('watch')) ||(url.includes('primevideo.com')&& url.includes('detail')) ||(url.includes('jiocinema.com')&& url.includes('tv-shows')) || (url.includes('jiocinema.com')&& url.includes('movies'))

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                let url = tab.url;
           if(url.includes("youtube.com")||url.includes('jiocinema.com')||url.includes('hotstar.com')||url.includes('primevideo.com')){     
              chrome.tabs.reload(tab.id);
           }
            });
          });
    }
})