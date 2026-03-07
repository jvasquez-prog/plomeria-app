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
