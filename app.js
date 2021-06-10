const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000
require('dotenv').config();
const mongoose = require('mongoose');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
// Khai bao url 
const url = process.env.DB_HOST;
console.log(url);

// Ket noi mongoose
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Success')
})
app.use(cors())

const userRouter = require('./routes/api/User')
app.use('/api/user', userRouter);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = app;