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
    sparse: true, // Permite que sea opcional
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
      return this.email !== undefined; // Solo requerido si tiene email
    },
    minlength: 6,
    select: false // No devolver la contraseña por defecto
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hashear password antes de guardar
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

// Método para comparar passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
