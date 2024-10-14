console.log("prime init js.....");

// let interval = setInterval(()=>{
//   if(window.location.href==d.url){
//     console.log('clr interval')
//   clearInterval(interval)
//   }
//   window.location.href = d.url;
//     //   },5000)
//  async function changeurl(){
//    let {url} = await fetcres()
// console.log(url)
//   if(url.length>0){
//     window.location.href=url
//   let intervl =  setInterval(() => {
//       if(window.location.href==url){
//         console.log('clrintervl')
//      clearInterval(intervl);
//       }
//       window.location.href=url

//     }, 5000);

//   }

// }

// changeurl()

// async function fetcres() {
//   return new Promise((resolve) => {
//     chrome.runtime.sendMessage({ msg: 'hsurl' }, (res) => {
//       console.log(res, 'resss...');
//       resolve(res); // Ensure that `res` is defined and correctly passed
//     });
//   });
// }

window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "chatinit") {
    flag = false;
    let interval = setInterval(() => {
      if (
        document.querySelectorAll(".dv-player-fullscreen")[0] &&
        document.querySelectorAll("video")[1] &&
        !document.querySelectorAll("video")[1].paused
      ) {
        console.log("intilizeee....");
        inntilize();
        clearInterval(interval);
      }
    }, 5000);
  }
});

// },5000)

function inntilize() {
  console.log("inject c1 script.....");
  let room_id;
  const socket = io("http://localhost:5002");
  const myVideo = document.querySelectorAll("video")[1];
  let globalFlag = true;
  let userIconDefault = chrome.runtime.getURL("img/any.png");
  let usetName = "Unknown";
  let otheruserIcon = chrome.runtime.getURL("img/any.png");
  let otheruserName = "Unknown";
  let isyoucreater = true;
  chrome.storage.local.get(["imgurl", "username"], (r) => {
    if (r.imgurl && r.username.length > 0) {
      userIconDefault = r.imgurl;
      usetName = r.username;
    }
  });

  // chrome.storage.local.get(['cheackbox'],(r)=>{
  //     globalFlag = r?.cheackbox?true:false;
  // })

  let iscontrol;
  let createrSocketId;
  socket.on("welcome", (message) => {
    console.log(message, "ssssmggggg");
  });

  chrome.storage.local.get(["ypsessionId", "cheackbox"], (r) => {
    if (r) {
      room_id = r.ypsessionId;
      globalFlag = r?.cheackbox ? true : false;
      socket.emit("clientEvent", { data: r.ypsessionId, globalFlag });
    }
  });

  socket.on("createrObj", (data) => {
    console.log("Received createrObj:", data);

    if (data.isyoucreater) {
      console.log("You are the creator!");
      isyoucreater = data.isyoucreate;
    }
    if (data?.iscontrol) {
      iscontrol = data?.iscontrol;
    }
    if (data.createrSocketId) {
      createrSocketId = data.createrSocketId;
    }
    if (!data.isyoucreater) {
      const video = document.querySelectorAll("video")[1];
      if (video) {
        console.log("videotaggpppprr...");
        video.addEventListener("canplay", handlecnplay);

        function handlecnplay() {
          setvideotime();
          video.removeEventListener("canplay", handlecnplay);
        }
        // video.addEventListener('readystatechange', () => {
        //     if (video.readyState === 3) {
        //         console.log('Video has enough data to play the next frame.');
        //         setvideotime();

        //     }
        //     if (video.readyState === 4) {
        //         console.log('Video has enough data to play through to the end without buffering.');
        //         setvideotime();
        //     }
        // });
        setvideotime();
      } else {
        ("absenttt");
      }
    }
  });

  function setvideotime() {
    let video = document.querySelectorAll("video")[1];

    console.log("create socket is ", createrSocketId);
    socket.emit("settime", { createrSocketId: createrSocketId });
  }

  socket.on("settime", () => {
    let video = document.querySelectorAll("video")[1];
    console.log("runnnn...");
    socket.emit("newtime", { timestamp: video.currentTime, room: room_id });
  });
  socket.on("newtime", (d) => {
    let video = document.querySelectorAll("video")[1];
    if (d.timestamp) {
      let creatortime = Math.round(d.timestamp);
      let usertime = Math.round(video.currentTime);
      let diff = Math.abs(creatortime - usertime);
      console.log(diff, "difffff.....");
      if (diff > 1) {
        console.log("run for diff timme", video.currentTime);
        video.currentTime = d.timestamp;
        // seekVideo2(d.timestamp);
        console.log(video.currentTime, "videoo.currrtime");
        // videoActionTriggeredByCode.seek = true;
        setvideotime();
      }
    }
  });

  chrome.runtime.onMessage.addListener((d) => {
    if (d.msg == "destory") {
      // chrome.storage.local.get(['ypsessionId'],(r)=>{
      //   console.log('destroySession',r.ypsessionId,isyoucreater )
      // if(r.ypsessionId){
      // // socket.emit('destorySassion',{roomId:r.ypsessionId})
      // socket.emit('destroySession', { roomId: r.ypsessionId }, (acknowledgment) => {
      //   if (acknowledgment.success) {
      //       console.log('Message sent and processed successfully:', acknowledgment.message);
      //   } else {
      //       console.log('Message failed to process:', acknowledgment.message);
      //   }
      // });

      // console.log("destorysassion....888**", r.ypsessionId)
      // //window.location.reload()
      // }
      // })
      chrome.storage.local.remove("crurl");
      chrome.storage.local.remove("tabid_reload");
      chrome.storage.local.remove("leave2");
      chrome.storage.local.remove("tabid_reload2");
      ss();
      window.location.reload();
    }
  });

  function ss() {
    console.log("runn..", room_id, isyoucreater);
    socket.emit("destroySession", { roomId: room_id });
  }

  // document.querySelector('video').addEventListener('play',(e)=>sendMessageToContent(e))
  // document.querySelector('video').addEventListener('pause',(e)=>sendMessageToContent(e))
  // document.querySelector('video').addEventListener('seek',(e)=>sendMessageToContent(e))

  // function sendMessageToContent(event) {

  //     console.log('Event Type:', event.type);
  //     console.log('Event Target:', event.target);
  //     console.log('Current Time:', event.target.currentTime);
  // let d = {
  //     etype:event.type,
  //     currtime: event.target.currentTime
  // }

  //     socket.emit('trrigerrevent', { data: d });

  //     // window.postMessage({ type: 'PLAY_EVENT', currentTime: event.target.currentTime }, '*');
  // }

  // Assuming you have a function to send messages to the server

  function sendMessageToServer(eventType, data) {
    if (!eventType) return;
    console.log(eventType, "eventtype", iscontrol);
    if (iscontrol) {
      socket.emit("videoEvent", { type: eventType, ...data, roomId: room_id });
    }
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.msg === "leavesassion") {
      console.log("Received message to leave session");
      chrome.storage.local.get(["ypsessionId"], (r) => {
        if (r.ypsessionId) {
          disconnectFromServer();
          //  socket.emit('leavesassion',r.ypsessionId)
          // chrome.storage.local.remove("crurl");
          // chrome.storage.local.remove("tabid_reload");
          window.location.reload();
        }
      });
    }
  });

  // document.querySelector('video').addEventListener('play', () => {

  //     sendMessageToServer('PLAY', { time: document.querySelector('video').currentTime });
  // });

  // document.querySelector('video').addEventListener('pause', () => {
  //     sendMessageToServer('PAUSE', { time: document.querySelector('video').currentTime });
  // });

  // document.querySelector('video').addEventListener('seeked', () => {
  //     sendMessageToServer('SEEK', { time: document.querySelector('video').currentTime });
  // });

  const videoElement = document.querySelectorAll("video")[1];
  socket.on("videoEvent", (event) => {
    switch (event.type) {
      case "PLAY":
        playVideo(event.time);
        break;
      case "PAUSE":
        pauseVideo(event.time);

        break;
      case "SEEK":
        // videoElement.currentTime = event.time;
        seekVideo(event.time, event.isvideopause);
        // if(event.isvideopause){
        //     pauseVideo()
        // }
        break;
    }
  });

  let videoSeekedByCode = false;

  let videoActionTriggeredByCode = {
    play: false,
    pause: false,
    seek: false,
    progress: false,
  };

  function playVideo(time) {
    try {
      if (!myVideo.paused) {
        return;
      }

      videoActionTriggeredByCode.play = true;
      // myVideo.currentTime = time;

      myVideo.play();
      // seekVideo(time)
      //seekVideo2(time);
      //  myVideo.currentTime = time;
    } catch {
      (error) => console.warn(error);
    }
  }

  function pauseVideo(time) {
    if (myVideo.paused) {
      return;
    }

    videoActionTriggeredByCode.pause = true;
    myVideo.pause();
    seekVideo(time);
    // myVideo.currentTime = time;
    //   videoElement.pause();
    //seekVideo2(time);
  }
  function seekVideo2(time, status) {
    videoSeekedByCode = true;
    videoActionTriggeredByCode.progress = false;
    myVideo.currentTime = time;
  }
  function seekVideo(time, status) {
    videoActionTriggeredByCode.seek = true;

    videoActionTriggeredByCode.progress = true;
    myVideo.currentTime = time;
    // setvideotime();
  }
  // myVideo.addEventListener('seeking', () => {
  //   videoActionTriggeredByCode.progress = true; // Seeking in progress
  //   console.log('Seeking started',Math.random()+1*10);
  // });
  myVideo.addEventListener("seeking", () => {
    videoActionTriggeredByCode.progress = true;

    // if (videoSeekedByCode) {
    //   console.log('Seeking triggered by code');
    //   // Reset the flag

    // } else {
    //   console.log('Seeking triggered by user');
    //   videoActionTriggeredB;yCode.progress = true
    // }
  });

  myVideo.addEventListener("play", () => {
    if (
      videoActionTriggeredByCode.play ||
      videoActionTriggeredByCode.progress
    ) {
      videoActionTriggeredByCode.progress = false;
      videoActionTriggeredByCode.play = false;
      return;
    }
    console.log("play is runn...");

    sendMessageToServer("PLAY", {
      time: document.querySelectorAll("video")[1].currentTime,
    }); // Handle user-triggered play event
  });

  myVideo.addEventListener("pause", () => {
    if (
      videoActionTriggeredByCode.pause ||
      videoActionTriggeredByCode.progress
    ) {
      videoActionTriggeredByCode.pause = false;
      return;
    }
    console.log("pause is run");

    sendMessageToServer("PAUSE", {
      time: document.querySelectorAll("video")[1].currentTime,
    });
  });

  myVideo.addEventListener("seeked", () => {
    if (videoActionTriggeredByCode.seek) {
      videoActionTriggeredByCode.seek = false;
      return;
    }
    pauseVideo();
    sendMessageToServer("SEEK", {
      time: document.querySelectorAll("video")[1].currentTime,
    });
  });

  function disconnectFromServer() {
    socket.disconnect();
    console.log("Disconnected from the server");
  }

  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "chatsend") {
      let chatMessage = event.data.chat;
      console.log("Received chat message:", chatMessage);
      send_chat_server(chatMessage);
      addchat(chatMessage, "user_chat", usetName, userIconDefault);
    }
  });

  function send_chat_server(msg) {
    console.log(msg, "msgg");
    socket.emit("chatmsg", {
      type: "chat",
      chatmsg: msg,
      roomId: room_id,
      otheruserN: usetName,
      otheruserI: userIconDefault,
    });
  }

  function addchat(chatstring, user, namee, url) {
    let imgclass = "imgdivuser";
    if (user == "other_img" || user == "other_chat") {
      imgclass = "imgdivother";
    }

    let chatbox = document.querySelector("#chat_box_child");
    if ((chatbox && user == "user_img") || (chatbox && user == "other_img")) {
      console.log(chatstring, "chats");
      let chatdiv = `
        <img class=${user} src=${chatstring}></img>
           <div class=${imgclass}>
         <img class="user_img2" src=${url}/>
    <span class="spantext" >${namee}~</span>
        </div>
        `;
      chatbox.innerHTML += chatdiv;
    } else if (chatbox) {
      let chatdiv = `

  <div class=${user}>
   ${chatstring}
   </div>
      <div class=${imgclass}>
         <img class="user_img2" src=${url}/>
    <span class="spantext" >${namee}~</span>
        </div>
`;
      chatbox.innerHTML += chatdiv;
    } else {
      console.log("not injectfrom c1");
    }
  }
  // socket.emit('chatmsg',{type:"chat",chatmsg:msg,roomId:room_id ,otheruserN:usetName,otheruserI:userIconDefault});

  socket.on("chatmsg", (event) => {
    console.log(event.chatmsg, "eventchat...");
    addchat(event.chatmsg, "other_chat", event.otheruserN, event.otheruserI);
  });
  window.addEventListener("message", (e) => {
    if (e.data.type == "img_blob") {
      socket.emit("imageBlob", {
        blob: e.data.blob,
        roomId: room_id,
        otheruserN: usetName,
        otheruserI: userIconDefault,
      });
      const blob = new Blob([e.data.blob]);
      const url = URL.createObjectURL(blob);
      console.log(e.data.blob, url);
      addchat(url, "user_img", usetName, userIconDefault);
    }
  });
 
  window.addEventListener("message", (e) => {
    if (e.data.type == "emoji_gif") {
      // socket.emit("memeurl", {
      //   url: e.data.url,
      //   roomId: room_id,
      //   otheruserN: usetName,
      //   otheruserI: userIconDefault,
      // });
      socket.emit("emoji_gif",{
       Emoji :e.data.emoji_Id,
       roomId: room_id,
       otheruserN: usetName,
       otheruserI: userIconDefault
      })

      addchat(e.data.emoji_Id, "user_img", usetName, userIconDefault);
    }
  });

socket.on("emoji_gif",(e)=>{
  addchat(e.Emoji, "other_img", e.otheruserN, e.otheruserI);

})



  window.addEventListener("message", (e) => {
    if (e.data.type == "memeurl") {
      socket.emit("memeurl", {
        url: e.data.url,
        roomId: room_id,
        otheruserN: usetName,
        otheruserI: userIconDefault,
      });

      addchat(e.data.url, "user_img", usetName, userIconDefault);
    }
  });
  socket.on("memeurl", (e) => {
    console.log("recive img blobsocket", e);

    addchat(e.url, "other_img", e.otheruserN, e.otheruserI);
  });

  socket.on("imageBlob", (imageData) => {
    console.log("recive img blobsocket", imageData);
    const blob = new Blob([imageData.blob]);
    const url = URL.createObjectURL(blob);
    addchat(url, "other_img", imageData.otheruserN, imageData.otheruserI);
  });

  //********************************************* */

  // let videoPlayedByCode = false;

  // function playVideo() {
  //   // If the video's already playing, do nothing
  //   if (!myVideo.paused) {
  //     return;
  //   }

  //   // Record that the video playing was triggered by code
  //   videoPlayedByCode = true;
  //   myVideo.play().catch((error) => console.warn(error));
  // }

  // myVideo.addEventListener('play', () => {
  //   // If this event was triggered by code, return early and don't
  //   // perform our actions.
  //   if (videoPlayedByCode) {
  //     // But make sure to reset this variable for the next
  //     // time the video plays.
  //     videoPlayedByCode = false;
  //     return;
  //   }

  // console.log('dosomthin')
  // });

  window.onbeforeunload = () => {
    chrome.storage.local.remove('crurl');
    chrome.storage.local.remove('tabid_reload');
    // chrome.runtime.sendMessage({msg:'leavesassion'})
    disconnectFromServer();
  };
}
