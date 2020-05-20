require('dotenv').config()

const express = require('express')
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const path = require('path')

const mongoose = require('mongoose')
mongoose.connect('mongodb://root:password123@host.docker.internal:27017/weatherDB?authSource=admin3')
console.log("process.env.MONGO_CONNECTION_STRING", process.env.MONGO_CONNECTION_STRING)

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(1001 || process.env.PORT, function() {
  console.log(`Server up and running on port ${process.env.PORT}`)
})
