import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  status: {
    type: String,
    enum: ['en_attente', 'accepte', 'rejete'],
    default: 'en_attente'
  },
  message: {
    type: String,
    required: [true, 'Un message est requis']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances de recherche
requestSchema.index({ status: 1 });
requestSchema.index({ sender: 1, trip: 1 }, { unique: true });

const Request = mongoose.model('Request', requestSchema);

export default Request;