'use strict'

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWD
} = process.env
const { MongoClient } = require('mongodb')

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majo`
let connection

const connectDb = async() =>{
  if (connection) return connection
  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    })
    connection = client.db(DB_NAME)
  } catch (error) {
    console.error(`Could not connect to db: , ${mongoUrl}, ${error}`)
    process.exit(1)
  }

  return connection
}

module.exports = connectDb