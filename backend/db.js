// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const ConnectURI = "mongodb://test:test@ds143734.mlab.com:43734/ciklum";
// mongoose.connect(ConnectURI);

// let db = mongoose.connection;
// module.exports = db;
module.exports = MongoClient.connect(ConnectURI);

 // , (err, db) => {
//     if (err){
//         console.error("Error connecting to MongoDb", err);
//     } else {
//         conn = db;
//         module.exports = conn;
//     }
// }