const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return this.email !== undefined;
    },
    minlength: 6,
    select: false
  },
  address: {
    street: String,
    number: String,
    floor: String,
    apartment: String,
    neighborhood: String,
    city: {
      type: String,
      default: 'CABA'
    },
    zipCode: String
  },
  role: {
    type: String,
    enum: ['user', 'plumber', 'admin'],
    default: 'user'
  },
  age: Number,
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
