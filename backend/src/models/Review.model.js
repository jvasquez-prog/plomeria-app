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
  
  // Calificación general
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  
  // Calificaciones detalladas
  ratings: {
    punctuality: {
      type: Number,
      min: 1,
      max: 5
    },
    quality: {
      type: Number,
      min: 1,
      max: 5
    },
    professionalism: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    cleanliness: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  // Comentario
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  
  // Recomendaciones específicas
  wouldRecommend: {
    type: Boolean,
    required: true
  },
  
  // Respuesta del plomero
  response: {
    text: String,
    date: Date
  },
  
  // Moderación
  isVerified: {
    type: Boolean,
    default: true // Asumimos que es verificada si proviene de un servicio real
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  flagged: {
    type: Boolean,
    default: false
  },
  flagReason: String
  
}, {
  timestamps: true
});

// Índices
reviewSchema.index({ plumber: 1, createdAt: -1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ serviceRequest: 1 }, { unique: true }); // Una reseña por servicio

// Middleware para actualizar stats del plomero después de crear/actualizar una reseña
reviewSchema.post('save', async function() {
  const Plumber = mongoose.model('Plumber');
  const Review = mongoose.model('Review');
  
  // Calcular promedio de calificaciones
  const stats = await Review.aggregate([
    { $match: { plumber: this.plumber, isPublic: true } },
    {
      $group: {
        _id: '$plumber',
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Plumber.findByIdAndUpdate(this.plumber, {
      'stats.rating': Math.round(stats[0].avgRating * 10) / 10, // Redondear a 1 decimal
      'stats.totalReviews': stats[0].totalReviews
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
