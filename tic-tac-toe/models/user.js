const mongoose =require('mongoose');
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // skip if password not changed

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('user',userSchema);