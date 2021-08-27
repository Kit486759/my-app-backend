const express = require('express')
const app = express()
const basicAuth = require('express-basic-auth')
const cors= require('cors')

app.use(cors())

// app.use(basicAuth({
//     users:{'admin':'admin'}
// }))

// use safe compare prevent time attack
// app.use(basicAuth({
//     authorizer: (userName, passWord) => {
//         const userMatch = basicAuth.safeCompare(userName, 'admin')
//         const passWordMatch = basicAuth.safeCompare(passWord, 'admin')
//         return userMatch & passWordMatch
//     }
// }))

app.get('/profile', (req, res, next) => {
    console.log('You have login')
    res.end(`This is profile page`)
})

app.post('/api/login', (req, res, next) => {
    // console.log('test')
    res.status(302).redirect('/profile')
})

app.get('/', (req, res, next) => {
    // console.log('test')
    res.end("This is home page.")
})

app.use('/', (req, res, next) => {
    // console.log(res.status)
    res.status(404).end(`Error 404 - Page not found`)
})

app.listen(1111, err => {
    if (err) return console.log(`There is an error${err}`)
    console.log(`Server listening on port "${1111}"`)
})