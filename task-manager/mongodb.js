// CRUD operations

//Calling MongoDB function in Application
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Works same as above
const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// ObjectID Lecture
// const id = new ObjectID()
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
       return console.log('Unable to connect');
    }

    const db = client.db(databaseName)

    //FindOne Example
    // db.collection('users').findOne({ _id: new ObjectID("5fae0e386b4c52353867adc8") }, (error, result) => {
    //     if (error) {
    //         return console.log('Not in collection');
    //     }

    //     console.log(result);
    // })

    //FindMany Example
    // db.collection('users').find({ age: 21 }).toArray((error, users) => {
    //     if (error) {
    //         return console.log('Could not find');
    //     }

    //     console.log(users);
    // })
    
    //InsertOne Example
    // db.collection('users').insertOne({
    //     name: 'Vikram',
    //     age: 22
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert');
    //     }

    //     console.log(result.ops);
    // })

    //InsertMany Example 
    // db.collection('users').insertMany([
    //     {
    //         name: 'Tarun',
    //         age: 22
    //     },
    //     {
    //         name: 'Aparna',
    //         age: 20
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert');
    //     }

    //     console.log(result.ops);
    // })

})