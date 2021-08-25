const { json } = require('express')
const fs = require('fs')

class crudDataBase {
    tempMemoryArray = [{
        uEmail: `kit@gmail.com`,
        uPassword: `123`,
        uName: `Kit`
    }]

    checkUser;

    constructor(file) {
        this.file = file
    }


    create(email, password) {
        console.log(`create in progress...`)
        
        const user = {
            uEmail: email,
            uPassword: password
        }

        for (let i = 0; i < this.tempMemoryArray.length; i++) {
            if (email === this.tempMemoryArray[i].uEmail) {
             
                this.checkUser = false
            } else {
               
                this.checkUser = true
            }
        }

        if (this.checkUser === false) {
            console.log(`user ${email} exist`)
            return console.log(`***create fail`)
        }

        if (this.checkUser === true) {
            this.tempMemoryArray.push(user)
            console.log(`***create successful, user ${email} added`)
            return console.log(`New user list: ${this.tempMemoryArray.map((user) => user.uEmail)}`)
        }
    }

    read(email) {
        console.log(`read in progress...`)

        for (let i = 0; i < this.tempMemoryArray.length; i++) {
            if (email === this.tempMemoryArray[i].uEmail) {
                console.log(`read ${this.tempMemoryArray[i].uEmail}, User Name: ${this.tempMemoryArray[i].uName}`)
            } else {
                console.log(`${email} Not found`)
            }
        }
    }

    update() { }
    delete() { }

    flushDB() {
        fs.writeFile(`${this.file}`, JSON.stringify(users), (err) => {
            if (err) throw err;
            console.log(`user added`)
        })
    }


    reloadDB() {
        fs.readFile(`${this.file}`, (err, data) => {
            const content = JSON.parse(data)
            console.log(content)

        })
    }





}

const db = new crudDataBase('./db.json')
// db.create('kit', 'awepfp')
// db.create('asdasd', '12344')
// db.create(`kit@gmail.com`, `12345`, `So`)
// db.create(`alex@gmail.com`, `12345`, `So`)

db.read(`kit@gmail.com`, `12345`, `So`)
db.read(`asdasd@gmail.com`, `12345`, `So`)