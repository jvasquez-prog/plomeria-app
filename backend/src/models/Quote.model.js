const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  serviceRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest',
    required: true
  },
  plumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plumber',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Enviado'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quote', quoteSchema);
