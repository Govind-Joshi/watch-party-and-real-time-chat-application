
const SUID = require('../modals/uidModel');


exports.saveUID = async (req, res) => {
    let obj = req.body;   
    let ssionid = req.body.sasid; 
console.log(obj,'objjj....')
    try {
        const savesaion = new SUID({
            ...obj 
        });
        await savesaion.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (err) {
        console.log(err, 'errr');
        res.status(500).json({ error: 'Server error' });
    }
};




// const sessionId = req.params.id;

// if (sessionMap[sessionId]) {
//     const { url, timestamp } = sessionMap[sessionId];
//     const redirectUrl = `${url}&t=${timestamp}s`;

//     // Redirect the user to the specific YouTube video and timestamp
//     res.redirect(redirectUrl);
// } else {
//     // Handle invalid session ID
//     res.status(404).send('Session ID not found');
// }

exports.redirectSassion = async (req, res) => {
    const sessionId = req.query.ytSessionId;
// { [sessionId]: { $exists: true } }
    try {
        const sessionData = await SUID.findOne({sasid:sessionId});
        console.log(sessionData)
        if (!sessionData) {
            return res.status(404).json({ error: 'Session not found' });
        }
        const { yturl, timestamp,domain } = sessionData;
   console.log(yturl,timestamp,'TIMESTAP....',domain);
let redirectUrl;
if(domain.includes("youtube.com")){
    redirectUrl = `${yturl}&t=${timestamp}s&ypsessionId=${sessionId}`;

}
else{
    if(!yturl.includes('?')){
    redirectUrl =  `${yturl}?ypsessionId=${sessionId}`;
    }
else{
    redirectUrl  = `${yturl}&ypsessionId=${sessionId}`;
}
}
// else if(domain.includes("hotstar.com")){

//     redirectUrl =   `${yturl}?ypsessionId=${sessionId}`;

// }
// else if(domain.includes("jiocinema.com")){

//     redirectUrl = `${yturl}?ypsessionId=${sessionId}`;
// }
// else if(domain.includes("primevideo.com")){
//     redirectUrl = `${yturl}&ypsessionId=${sessionId}`;
// }
//         // const redirectUrl = !h?`${yturl}&t=${timestamp}s&ypsessionId=${sessionId}`:`${yturl}?ypsessionId=${sessionId}`;
  console.log(redirectUrl,'redirectUrl_redirectUrl')
        res.redirect(redirectUrl);
    
    } catch (err) {
        console.error(err, 'Error occurred while redirecting');
        res.status(500).json({ error: 'Server error' });
    }
};

// let reqbody = {
//     sasid: sassionid,
//     sasionurl: sasionurl,
//     yturl: yturl,
//     timestamp: timestamp, // Fixed the typo from 'timstamp' to 'timestamp'
//     savetime :Date.now(),
//     domain:h
// };







