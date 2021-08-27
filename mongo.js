const db = require('mongodb')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const bcrypt = require('bcryptjs');


const createUser = (emailInput, passwordInput) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("mydb");

        dbo.collection("users").findOne({ email: emailInput }, (err, res) => {
            if (err) throw err;
            if (res !== null) {
                console.log(`Email: ${res.email} found`);
                db.close();
            } else {
                console.log(`Email Not found`)
                // Encrypt password ,hash and salt
                bcrypt.hash(emailInput, 12)
                    .then(hashedPassword => {
                        dbo.collection("users").insertOne({ email: emailInput, password: hashedPassword }, function (err, res) {
                            if (err) throw err;
                            console.log("User created");
                            db.close();
                        });
                    })

            }
        });
    })
}

const readUser = (emailInput) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("mydb");
        dbo.collection("users").findOne({ emailInput: email }, (err, res) => {
            if (err) throw err;
            if (res !== null) {
                console.log(`Email: ${res.email} found`);
            } else {
                console.log(`Email Not found`)
            }
            db.close();
        });
    })
}

const login = (emailInput, passwordInput) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("mydb");
        dbo.collection("users").findOne({ email: emailInput }, (err, res) => {
            if (err) throw err;
            if (res !== null) {
                console.log(`Email: ${res.email} found`);
                console.log(passwordInput)

                const doMatch = bcrypt.compare(`${passwordInput}`, res.password)
                if (doMatch) {
                    console.log(`pw match ,logged in`)
                    // res.redirect('/')
                } else {
                    console.log(doMatch)
                    console.log(`pw not match`)
                    // res.redirect('/login')
                }


            } else {
                console.log(`Email Not found`)
            }
            db.close();
        });
    })
}


// createUser({ email: 'kit@gmail.com', password: '12345' })
// createUser('so@gmail.com','12345')
// createUser('test3@gmail.com', 'helloworld')
login('test3@gmail.com', 'helloworld')


// readUser(`kit@gmail.com`)
// readUser(`kit@gmail.com`)


// const testHash = () => {
//     bcrypt.hash('helloworld', 12, function (err, hash) {
//         if (err) { throw (err); }
//         console.log(hash)

//         bcrypt.compare('helloworld', hash, function (err, result) {
//             if (err) { throw (err); }
//             console.log(result);
//         });
//     });
// }

// testHash()