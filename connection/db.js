const mongoose = require('mongoose');

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

module.exports = connection;