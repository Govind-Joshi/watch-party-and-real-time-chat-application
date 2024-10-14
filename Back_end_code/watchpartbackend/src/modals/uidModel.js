

const { json } = require('express');
const mongoose = require('mongoose');

const uidSchema = new mongoose.Schema({}, { strict: false });

const SUID = mongoose.model('SUID', uidSchema);


// const uidSchema = new mongoose.Schema({
//     data: {
//         type: Object, 
//         required: true,
//     }

// });
// const UID = mongoose.model('UID', uidSchema);

//   const uidSchemaa = new mongoose.Schema({
//     data: {
//         type: Array, // or Object, depending on your data structure
//         required: true
//     },
//     // other fields
// });

// const AffilateUrlCollection = mongoose.model('AffilateUrlCollection', uidSchema);
// module.exports = AffilateUrlCollection;


 
module.exports = SUID;

