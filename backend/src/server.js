const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const server = express()

mongoose.connect('mongodb+srv://ian:brito@cluster0-1ybys.mongodb.net/omnistack?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

try { // Fazer o express utilizar JSON
  server.use(express.json())
  server.use(cors())

  server.use(routes)

  server.listen(3333)
} catch (err) {
  console.log(err)
}
console.log('http://localhost:3333')
