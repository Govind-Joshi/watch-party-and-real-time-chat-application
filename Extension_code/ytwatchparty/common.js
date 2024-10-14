console.log('inject..tttt');




// function recivemsg(){
// chrome.runtime.onMessage.addListener(()=>{

// })
// }

// chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//     if (req.msg === "createsaission") {
//         // Return true to indicate that sendResponse will be called asynchronously
//         console.log('msg in commenjs')
//         let flag = true;
//         if (flag) {
//             flag = false;
//             creatession(req.msg).then((kk) => {
//                 flag = true;
//                 sendResponse(kk);
//             }).catch(error => {
//                 console.error('Error creating session:', error);
//                 flag = true;
//                 sendResponse({ error: 'Session creation failed' });
//             });
//         }
//         return true; // Keeps the message channel open for sendResponse
//     }
// });


//     async function sendresponse(key) {
//         return new Promise((resolve, reject) => {
//             // Get the currently active tab in the current window
//             chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//                 if (tabs.length === 0) {
//                     reject('No active tab found');
//                     return;
//                 }
    
//                 // Send a message to the content script of the active tab
//                 chrome.tabs.sendMessage(tabs[0].id, { msg: [key],url:window.location.href }, (response) => {
//                     if (chrome.runtime.lastError) {
//                         reject(chrome.runtime.lastError);
//                     } else {
//                         resolve(response);
//                     }
//                 });
//             });
//         });
//     }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getURL") {
        const currentURL = window.location.href;
      let video =   document.querySelector('video');
      console.log(video.currentTime)
     
        chrome.runtime.sendMessage({ action: "createSession", url: currentURL,timestamp:video.currentTime,h:request.h}, (response) => {
            sendResponse(response); 
        });

        return true;  
    }
});


// if (window.location.href.includes('your-redirect-url-here')) {
 
// }

console.log(window.location.href)
