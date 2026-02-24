const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Información básica de la solicitud
  problemType: {
    type: String,
    enum: ['Canilla', 'Inodoro', 'Pérdida', 'Destapación', 'Instalación', 'Otro'],
    required: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    maxlength: 1000
  },
  urgency: {
    type: String,
    enum: ['Baja', 'Media', 'Alta', 'Emergencia'],
    default: 'Media'
  },
  
  // Ubicación del servicio
  location: {
    address: {
      street: String,
      number: String,
      floor: String,
      apartment: String,
      neighborhood: {
        type: String,
        required: true
      },
      city: {
        type: String,
        default: 'CABA'
      },
      additionalInfo: String // ej: "Timbre 3B", "Puerta verde"
    }
  },
  
  // Preferencias de horario
  preferredSchedule: {
    date: Date,
    timeSlot: String, // ej: "Mañana (9-13)", "Tarde (14-18)"
    flexible: {
      type: Boolean,
      default: true
    }
  },
  
  // Fotos del problema (opcional)
  photos: [{
    url: String,
    publicId: String
  }],
  
  // Estado de la solicitud
  status: {
    type: String,
    enum: ['Pendiente', 'En revisión', 'Cotizado', 'Aceptado', 'En progreso', 'Completado', 'Cancelado'],
    default: 'Pendiente'
  },
  
  // Plomeros que recibieron la solicitud
  sentTo: [{
    plumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plumber'
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    viewed: {
      type: Boolean,
      default: false
    },
    viewedAt: Date
  }],
  
  // Plomero asignado
  assignedPlumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plumber'
  },
  
  // Cotizaciones recibidas
  quotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote'
  }],
  
  // Cotización aceptada
  acceptedQuote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote'
  },
  
  // Información de pago
  payment: {
    method: String, // 'Efectivo', 'Transferencia', 'Tarjeta'
    amount: Number,
    status: {
      type: String,
      enum: ['Pendiente', 'Pagado', 'Reembolsado'],
      default: 'Pendiente'
    },
    paidAt: Date
  },
  
  // Notas internas
  notes: [{
    author: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Fecha de completación
  completedAt: Date,
  canceledAt: Date,
  cancelReason: String
  
}, {
  timestamps: true
});

// Índices
serviceRequestSchema.index({ user: 1, createdAt: -1 });
serviceRequestSchema.index({ status: 1 });
serviceRequestSchema.index({ 'location.address.neighborhood': 1 });
serviceRequestSchema.index({ assignedPlumber: 1 });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
