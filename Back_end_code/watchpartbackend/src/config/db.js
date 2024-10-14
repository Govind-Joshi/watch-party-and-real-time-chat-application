// /config/db.js
const mongoose = require('mongoose');
const db = 'Mogodb connection string';
const connectDB =()=>{  mongoose.connect(db).then(()=>{
   console.log("hhhh")
}).catch(()=>console.log("nnnn"));
}
module.exports = connectDB;
