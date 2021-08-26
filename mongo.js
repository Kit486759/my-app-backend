const db = require('mongodb')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("mydb");
    // console.log(db.db)
    // dbo.createCollection("users", function (err, res) {
    //     if (err) throw err;
    //     console.log("Collection created!");
    //     db.close();
    // });

    const createUser = (user) => {


        dbo.collection("customers").insertOne(user, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    }


    const editUser = (user) => {
        dbo.collection("customers").find({ name: user }).toArray(function (err, res) {
            if (err) throw err;
            if (res.length !== 0) {
                console.log(res);
            } else {
                console.log(`${user} not found`)
            }


            db.close();
        });
    }

    // createUser({ name: 'so', gender: 'male' })

    editUser('Kit')
})

