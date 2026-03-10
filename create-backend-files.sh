#!/bin/bash

# Script para crear TODOS los archivos del backend automáticamente
# Uso: bash create-backend-files.sh

echo "🚀 Creando estructura completa del backend..."

# Verificar que estamos en la carpeta correcta
if [ ! -d "backend" ]; then
    echo "❌ Error: Debes ejecutar este script desde la raíz del proyecto (donde está la carpeta 'backend')"
    exit 1
fi

cd backend/src || exit 1

# Crear carpetas
echo "📁 Creando carpetas..."
mkdir -p config models controllers routes middleware services

# ============================================
# CONFIG
# ============================================
echo "📝 Creando config/database.js..."
cat > config/database.js << 'EOF'
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
EOF

# ============================================
# MIDDLEWARE
# ============================================
echo "📝 Creando middleware/auth.middleware.js..."
cat > middleware/auth.middleware.js << 'EOF'
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

exports.protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No autorizado - No hay token'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'No autorizado - Token inválido'
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `El rol ${req.user.role} no tiene permiso`
      });
    }
    next();
  };
};

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};
EOF

# ============================================
# MODELS
# ============================================
echo "📝 Creando models/User.model.js..."
cat > models/User.model.js << 'EOF'
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
EOF

echo "📝 Creando models/Plumber.model.js..."
cat > models/Plumber.model.js << 'EOF'
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
EOF

echo "📝 Creando models/ServiceRequest.model.js..."
cat > models/ServiceRequest.model.js << 'EOF'
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
EOF

echo "📝 Creando models/Quote.model.js..."
cat > models/Quote.model.js << 'EOF'
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
EOF

echo "📝 Creando models/Review.model.js..."
cat > models/Review.model.js << 'EOF'
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
EOF

# ============================================
# CONTROLLERS
# ============================================
echo "📝 Creando controllers/auth.controller.js..."
cat > controllers/auth.controller.js << 'EOF'
const User = require('../models/User.model');
const { generateToken } = require('../middleware/auth.middleware');

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    
    let user = await User.findOne({ 
      $or: [{ email }, { phone }]
    });
    
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }
    
    user = await User.create({
      name, email, phone, password,
      role: role || 'user'
    });
    
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    
    if ((!email && !phone) || !password) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales requeridas'
      });
    }
    
    const query = email ? { email } : { phone };
    const user = await User.findOne(query).select('+password');
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    const token = generateToken(user._id);
    
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.quickRegister = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y teléfono requeridos'
      });
    }
    
    let user = await User.findOne({ phone });
    
    if (user) {
      const token = generateToken(user._id);
      return res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          token
        }
      });
    }
    
    user = await User.create({
      name, phone, address,
      role: 'user'
    });
    
    const token = generateToken(user._id);
    
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
EOF

echo "📝 Creando controllers/plumber.controller.js..."
cat > controllers/plumber.controller.js << 'EOF'
const Plumber = require('../models/Plumber.model');
const User = require('../models/User.model');

exports.getPlumbers = async (req, res) => {
  try {
    const { neighborhood } = req.query;
    
    let query = { isActive: true };
    
    if (neighborhood) {
      query['serviceAreas.neighborhood'] = new RegExp(neighborhood, 'i');
    }
    
    const plumbers = await Plumber.find(query)
      .populate('user', 'name phone email')
      .limit(20);
    
    res.json({
      success: true,
      count: plumbers.length,
      data: plumbers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPlumberById = async (req, res) => {
  try {
    const plumber = await Plumber.findById(req.params.id)
      .populate('user', 'name phone email');
    
    if (!plumber) {
      return res.status(404).json({
        success: false,
        message: 'Plomero no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: plumber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createPlumberProfile = async (req, res) => {
  try {
    const plumber = await Plumber.create({
      user: req.user._id,
      ...req.body
    });
    
    await User.findByIdAndUpdate(req.user._id, { role: 'plumber' });
    
    res.status(201).json({
      success: true,
      data: plumber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updatePlumberProfile = async (req, res) => {
  try {
    const plumber = await Plumber.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    
    res.json({
      success: true,
      data: plumber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
EOF

echo "📝 Creando controllers/request.controller.js..."
cat > controllers/request.controller.js << 'EOF'
const ServiceRequest = require('../models/ServiceRequest.model');
const Plumber = require('../models/Plumber.model');

exports.createRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.create({
      user: req.user._id,
      ...req.body
    });
    
    const plumbers = await Plumber.find({
      'serviceAreas.neighborhood': req.body.location.address.neighborhood,
      isActive: true
    }).limit(5);
    
    for (const plumber of plumbers) {
      request.sentTo.push({
        plumber: plumber._id,
        sentAt: new Date()
      });
    }
    
    await request.save();
    
    res.status(201).json({
      success: true,
      message: `Solicitud enviada a ${plumbers.length} plomeros`,
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getUserRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPlumberRequests = async (req, res) => {
  try {
    const plumber = await Plumber.findOne({ user: req.user._id });
    
    if (!plumber) {
      return res.status(404).json({
        success: false,
        message: 'Perfil de plomero no encontrado'
      });
    }
    
    const requests = await ServiceRequest.find({
      'sentTo.plumber': plumber._id
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
EOF

echo "📝 Creando controllers/quote.controller.js..."
cat > controllers/quote.controller.js << 'EOF'
const Quote = require('../models/Quote.model');
const ServiceRequest = require('../models/ServiceRequest.model');
const Plumber = require('../models/Plumber.model');

exports.createQuote = async (req, res) => {
  try {
    const plumber = await Plumber.findOne({ user: req.user._id });
    
    const quote = await Quote.create({
      ...req.body,
      plumber: plumber._id
    });
    
    await ServiceRequest.findByIdAndUpdate(req.body.serviceRequest, {
      status: 'Cotizado'
    });
    
    res.status(201).json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.acceptQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Cotización no encontrada'
      });
    }
    
    quote.status = 'Aceptado';
    await quote.save();
    
    await ServiceRequest.findByIdAndUpdate(quote.serviceRequest, {
      status: 'Aceptado'
    });
    
    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
EOF

# ============================================
# ROUTES
# ============================================
echo "📝 Creando routes/auth.routes.js..."
cat > routes/auth.routes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { register, login, quickRegister, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/quick-register', quickRegister);
router.get('/me', protect, getMe);

module.exports = router;
EOF

echo "📝 Creando routes/user.routes.js..."
cat > routes/user.routes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/profile', protect, (req, res) => {
  res.json({ success: true, data: req.user });
});

module.exports = router;
EOF

echo "📝 Creando routes/plumber.routes.js..."
cat > routes/plumber.routes.js << 'EOF'
const express = require('express');
const router = express.Router();
const {
  getPlumbers,
  getPlumberById,
  createPlumberProfile,
  updatePlumberProfile
} = require('../controllers/plumber.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/', getPlumbers);
router.get('/:id', getPlumberById);
router.post('/profile', protect, createPlumberProfile);
router.put('/profile', protect, authorize('plumber', 'admin'), updatePlumberProfile);

module.exports = router;
EOF

echo "📝 Creando routes/request.routes.js..."
cat > routes/request.routes.js << 'EOF'
const express = require('express');
const router = express.Router();
const {
  createRequest,
  getUserRequests,
  getPlumberRequests
} = require('../controllers/request.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.post('/', protect, createRequest);
router.get('/my-requests', protect, getUserRequests);
router.get('/plumber-requests', protect, authorize('plumber', 'admin'), getPlumberRequests);

module.exports = router;
EOF

echo "📝 Creando routes/quote.routes.js..."
cat > routes/quote.routes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { createQuote, acceptQuote } = require('../controllers/quote.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.post('/', protect, authorize('plumber', 'admin'), createQuote);
router.put('/:id/accept', protect, acceptQuote);

module.exports = router;
EOF

echo "📝 Creando routes/review.routes.js..."
cat > routes/review.routes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, (req, res) => {
  res.json({ success: true, message: 'Endpoint de reseñas' });
});

module.exports = router;
EOF

# ============================================
# SERVICES
# ============================================
echo "📝 Creando services/sms.service.js..."
cat > services/sms.service.js << 'EOF'
exports.sendSMS = async (to, message) => {
  console.log(`SMS a ${to}: ${message}`);
  return { success: true };
};
EOF

echo "📝 Creando services/email.service.js..."
cat > services/email.service.js << 'EOF'
exports.sendEmail = async ({ to, subject }) => {
  console.log(`Email a ${to}: ${subject}`);
  return { success: true };
};
EOF

echo "📝 Creando services/image.service.js..."
cat > services/image.service.js << 'EOF'
exports.uploadImage = async (fileBuffer, folder) => {
  console.log(`Subiendo imagen a ${folder}`);
  return { 
    success: true,
    url: 'placeholder.jpg'
  };
};
EOF

# ============================================
# RESUMEN
# ============================================
echo ""
echo "=========================================="
echo "✅ ¡TODOS LOS ARCHIVOS CREADOS!"
echo "=========================================="
echo ""
echo "Archivos creados:"
echo "  📁 config/          (1 archivo)"
echo "  📁 models/          (5 archivos)"
echo "  📁 controllers/     (4 archivos)"
echo "  📁 routes/          (6 archivos)"
echo "  📁 middleware/      (1 archivo)"
echo "  📁 services/        (3 archivos)"
echo ""
echo "Total: 20 archivos"
echo ""
echo "Próximos pasos:"
echo "  1. cd ../.."
echo "  2. git add backend/src/"
echo "  3. git commit -m 'Add complete backend structure'"
echo "  4. git push origin main"
echo ""
echo "🚀 Railway re-deployará automáticamente"
echo ""
