const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true} )

module.exports = client