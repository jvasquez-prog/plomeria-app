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
  
  // Descripción del trabajo propuesto
  workDescription: {
    type: String,
    required: true,
    maxlength: 2000
  },
  
  // Desglose de costos
  costs: {
    labor: {
      description: String,
      amount: {
        type: Number,
        required: true,
        min: 0
      }
    },
    materials: [{
      item: String,
      quantity: Number,
      unitPrice: Number,
      totalPrice: Number
    }],
    consultation: {
      amount: {
        type: Number,
        default: 0
      },
      refundableIfHired: {
        type: Boolean,
        default: true
      }
    },
    travel: {
      amount: {
        type: Number,
        default: 0
      }
    },
    other: [{
      description: String,
      amount: Number
    }]
  },
  
  // Total
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Validez de la cotización
  validUntil: {
    type: Date,
    required: true
  },
  
  // Estimación de tiempo
  estimatedDuration: {
    hours: Number,
    description: String // ej: "2-3 horas aproximadamente"
  },
  
  // Disponibilidad del plomero
  availability: {
    date: Date,
    timeSlot: String,
    alternative: String
  },
  
  // Garantía ofrecida
  warranty: {
    duration: String, // ej: "6 meses"
    description: String
  },
  
  // Notas adicionales del plomero
  notes: {
    type: String,
    maxlength: 1000
  },
  
  // Estado de la cotización
  status: {
    type: String,
    enum: ['Enviado', 'Visto', 'Aceptado', 'Rechazado', 'Expirado', 'Modificado'],
    default: 'Enviado'
  },
  
  // Seguimiento
  viewedByClient: {
    type: Boolean,
    default: false
  },
  viewedAt: Date,
  
  acceptedAt: Date,
  rejectedAt: Date,
  rejectReason: String,
  
  // Si el cliente solicita modificaciones
  modificationRequested: {
    requested: {
      type: Boolean,
      default: false
    },
    requestText: String,
    requestedAt: Date
  },
  
  // Versión de la cotización (si hay modificaciones)
  version: {
    type: Number,
    default: 1
  },
  previousVersion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote'
  }
  
}, {
  timestamps: true
});

// Método para calcular el total automáticamente
quoteSchema.methods.calculateTotal = function() {
  let total = this.costs.labor.amount || 0;
  total += this.costs.consultation.amount || 0;
  total += this.costs.travel.amount || 0;
  
  if (this.costs.materials && this.costs.materials.length > 0) {
    this.costs.materials.forEach(material => {
      total += material.totalPrice || 0;
    });
  }
  
  if (this.costs.other && this.costs.other.length > 0) {
    this.costs.other.forEach(item => {
      total += item.amount || 0;
    });
  }
  
  this.totalAmount = total;
  return total;
};

// Pre-save para calcular total si no está definido
quoteSchema.pre('save', function(next) {
  if (!this.totalAmount || this.isModified('costs')) {
    this.calculateTotal();
  }
  next();
});

// Índices
quoteSchema.index({ serviceRequest: 1, plumber: 1 });
quoteSchema.index({ plumber: 1, createdAt: -1 });
quoteSchema.index({ status: 1 });

module.exports = mongoose.model('Quote', quoteSchema);
