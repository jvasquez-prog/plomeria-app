const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  serviceRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plumber',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
