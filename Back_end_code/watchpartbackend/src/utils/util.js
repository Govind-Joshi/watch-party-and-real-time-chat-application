const SUID = require('../modals/uidModel')



async function sendToDataBase(socketid, sasionId, globalFlag, time) {
    try {
        // Find the document where the field corresponding to 'sasionId' exists
        let sid = await SUID.findOne({sasid:sasionId});
        if (sid) {
            // Properly set the new fields using `set()`
            sid.set({
                iscontrol: globalFlag,
                time: time,
                sassioncreatorId: socketid
            });
            await sid.save();
            console.log('saved');
            return 'saved';
        } else {
            console.log('Document not found');
            return 'Document not found';
        }
    } catch (e) {
        console.log(e, 'Error');
        return 'Error';
    }
}


async function recivedata(sassionId){
let sid = await SUID.findOne({sasid:sassionId})
// await SUID.findOne({ [sessionId]: { $exists: true } });
console.log(sid['sassioncreatorId'],'xxxxxx',sid)
return sid['sassioncreatorId'];
}

async function deletefun(){


}

// SUID.deleteMany({$expr{$lt[{$toDate:'$_id'},fourHoursAgo]}})

async function  cleanUpOldSessions () {
    try {
//         const fourHoursAgo = Date.now() - ( 4 * 60 * 60 * 1000);
//    console.log(typeof(sessions),'typeee..');
//   let datleted_obj = await SUID.deleteMany({ savetime: { $lt: fourHoursAgo } });
const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000); // Time 4 hours ago
let deleted_obj = await SUID.deleteMany({
  $expr: {
    $lt: [
      { $toDate: "$_id" }, 
      fourHoursAgo         
    ]
  }
});
  ;
    //     sessions.forEach(async(session)=>{
    //         const sessionId = Object.keys(session.toObject())[1];
    //         // console.log(sessionId.length,'lengthhhh.......')
    //         console.log(sessionId,'clg sassion id')
    //         const sessionData = session[sessionId];
    //          console.log(sessionData,'sassiondata..',sessionData.savetime)
    //         if (sessionData.savetime < fourHoursAgo) {
              
    //             await SUID.deleteOne({ _id: session._id });
    //             console.log(`Session ${sessionId} deleted.`);
    //         }
    //     }
    // )


        console.log(deleted_obj,'length.....')

        console.log('Old sessions cleanup complete.');
    } catch (err) {
        console.error('Error during cleanup:', err);
    }
};







// (async()=>{
// //console.log(await sendToDataBase("ou8w292K_ROSQJ3vAAAF","session-no9pvk3vb",false,"3456555"),'')
//  console.log(await recivedata("session-vkos7lfgy"),'')
// })()
module.exports = {
    sendToDataBase,
    recivedata, 
    cleanUpOldSessions
};


// ou8w292K_ROSQJ3vAAAF
// session-no9pvk3vb
// false

