const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: Number,
      default: 0
      // 0=> admin; 1=> author; 2=> reader
   },
   createDate: {
      type: Date,
      default: Date.now
   }
})

module.exports = User = mongoose.model('users', UserSchema);