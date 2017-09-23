const MongoClient = require('mongodb').MongoClient;
const ConnectURI = "mongodb://test:test@ds143734.mlab.com:43734/ciklum";

module.exports = MongoClient.connect(ConnectURI);