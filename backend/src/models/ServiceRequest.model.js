const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    address: {
      neighborhood: {
        type: String,
        required: true
      }
    }
  },
  status: {
    type: String,
    default: 'Pendiente'
  },
  sentTo: [{
    plumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plumber'
    },
    sentAt: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
