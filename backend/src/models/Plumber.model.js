const mongoose = require('mongoose');

const plumberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  profilePhoto: {
    url: String,
    publicId: String
  },
  bio: {
    type: String,
    maxlength: 500
  },
  experience: {
    years: {
      type: Number,
      min: 0,
      default: 0
    },
    description: String
  },
  credentials: [{
    name: String, // ej: "Matriculado RPCGC"
    number: String,
    issuedBy: String,
    issuedDate: Date,
    expiryDate: Date,
    verified: {
      type: Boolean,
      default: false
    }
  }],
  serviceAreas: [{
    neighborhood: String,
    city: {
      type: String,
      default: 'CABA'
    }
  }],
  specialties: [{
    type: String,
    enum: [
      'Reparaciones generales',
      'Instalaciones',
      'Destapaciones',
      'Cañerías',
      'Gas',
      'Calefones',
      'Termotanques',
      'Emergencias',
      'Mantenimiento preventivo'
    ]
  }],
  availability: {
    monday: { available: Boolean, hours: String },
    tuesday: { available: Boolean, hours: String },
    wednesday: { available: Boolean, hours: String },
    thursday: { available: Boolean, hours: String },
    friday: { available: Boolean, hours: String },
    saturday: { available: Boolean, hours: String },
    sunday: { available: Boolean, hours: String }
  },
  pricing: {
    consultationFee: {
      type: Number,
      default: 0
    },
    hourlyRate: Number,
    emergencyRate: Number,
    minimumCharge: Number
  },
  stats: {
    totalJobs: {
      type: Number,
      default: 0
    },
    completedJobs: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    responseTime: String, // ej: "30 minutos"
    acceptanceRate: {
      type: Number,
      default: 0
    }
  },
  badges: [{
    type: String,
    enum: ['Verificado', 'Premium', 'Asegurado', 'Top Rated', 'Respuesta Rápida']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  subscriptionExpiry: Date,
  bankInfo: {
    cbu: String,
    alias: String,
    accountHolder: String
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
plumberSchema.index({ 'serviceAreas.neighborhood': 1 });
plumberSchema.index({ 'stats.rating': -1 });
plumberSchema.index({ isPremium: -1, 'stats.rating': -1 });

module.exports = mongoose.model('Plumber', plumberSchema);
