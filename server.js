const express = require('express')
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const path = require('path')

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/weatherDB")

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(1996, function() {
  console.log("Server up and running on port 1996")
})
