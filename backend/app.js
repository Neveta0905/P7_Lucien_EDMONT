const express = require('express')
const helmet = require("helmet");
const bodyParser = require('body-parser')
const path = require('path');
const Sequelize = require('sequelize')
const morgan = require('morgan')('dev')

// Dotenv to config port
const dotenv = require("dotenv");
dotenv.config();

// Connect to Mongo
const app = express()

const tester = require('./models/index.js')
// Use middleware
app.use(express.json()) // for parsing application/json
app.use(morgan)
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(helmet());

// Import User Router
const userRouter = require('./routes/user')
app.use('/api/auth',userRouter)


// Import Post Router
const postRouter = require('./routes/post')
app.use('/api/post',postRouter)

// Import Comment Router
const commentRouter = require('./routes/comment')
app.use('/api/comment',commentRouter)

// Export app to server
module.exports = app