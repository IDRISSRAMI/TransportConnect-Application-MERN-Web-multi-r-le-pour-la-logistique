import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  },
  destination: {
    type: String,
    required: [true, 'La destination est requise']
  },
  startDate: {
    type: Date,
    required: [true, 'La date de début est requise']
  },
  endDate: {
    type: Date,
    required: [true, 'La date de fin est requise']
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix ne peut pas être négatif']
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Le nombre maximum de participants est requis'],
    min: [1, 'Le nombre minimum de participants doit être 1']
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  images: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Validation personnalisée pour s'assurer que endDate > startDate
tripSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('La date de fin doit être postérieure à la date de début'));
  }
  next();
});

// Index pour améliorer les performances de recherche
tripSchema.index({ destination: 1, startDate: 1 });
tripSchema.index({ status: 1 });
tripSchema.index({ driver: 1 });

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;