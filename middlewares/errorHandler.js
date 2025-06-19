// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur détectée:', err.stack);
  
  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      message: 'Erreur de validation',
      errors: errors
    });
  }
  
  // Erreur de cast Mongoose (ID invalide)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID invalide',
      error: 'Format d\'ID incorrect'
    });
  }
  
  // Erreur de duplication (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: 'Données en doublon',
      error: `${field} existe déjà`
    });
  }
  
  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Token invalide'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expiré'
    });
  }
  
  // Erreur générique
  res.status(err.statusCode || 500).json({
    message: err.message || 'Erreur serveur interne',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;