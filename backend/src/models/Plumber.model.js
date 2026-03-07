const mongoose = require('mongoose');

const plumberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: String,
  experience: {
    years: Number,
    description: String
  },
  serviceAreas: [{
    neighborhood: String,
    city: String
  }],
  stats: {
    rating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plumber', plumberSchema);
