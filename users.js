const express = require('express');
const router = express.Router();
const client = require('../database/client')
const COLLECTION = 'Users'

/* GET users listing. */
router.get('/', async function(req, res, next) {
  //connect to the database
  await client.connect()
  const db = client.db(process.env.MONGODB_DATABASE_NAME)
  //connect to the users collection
  //get all the users from that collection
  const results = await db.collection(COLLECTION).find({}).toArray()
  //return all those users
  res.json(results)
});

  // /users/new
router.post('/new', async function(req, res, next) {
  // connect to the database
  await client.connect()
  const db = client.db(process.env.MONGODB_DATABASE_NAME)
  //connect to users collection
  //add new user to collection
  const addedUser = await db.collection(COLLECTION).insertOne({
    name: 'Luke Skywalker',
    occupation: 'Jedi'
  })
  //return 'successfully'
  if (addedUser.insertedCount === 1) {
  res.send('succesfully added user')
  return
}
  res.send('unable to add user')
})

router.put('/update', async function(req, res, next) {
  await client.connect()
  const db = client.db(process.env.MONGODB_DATABASE_NAME)

  const result = await db.collection(COLLECTION).updateOne({name:'Luke Skywalker'}, 
  {$set: {homeTown: 'Tatooine'}
  })
  if (result.modifiedCount === 1) {
    res.send('sucessfully updated user')
    return
  }  
    res.send('unable to update user')   
})

router.delete('/delete', async function (req, res, next) {
  await client.connect()
  const db = client.db(process.env.MONGODB_DATABASE_NAME)

  const deleted = await db.collection(COLLECTION).deleteOne({homeTown: 'Tatooine'})  

  if (deleted.deletedCount === 1) {
    res.send ('successfully deleted user')
  } else {
  res.send ('unable to delete user')
}
})

module.exports = router;
