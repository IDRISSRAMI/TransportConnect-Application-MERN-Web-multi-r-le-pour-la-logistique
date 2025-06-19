import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, 'Le prénom est requis'],
    trim: true
  },
  lastName: { 
    type: String, 
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, "L'email est requis"], 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'Le mot de passe est requis']
  },
  phone: { 
    type: String,
    trim: true
  },
  role: { 
    type: String, 
    enum: ['conducteur', 'expediteur', 'admin'], 
    default: 'expediteur'
  },
  status: {
    type: String,
    enum: ['en_attente', 'verifie', 'rejete'],
    default: 'en_attente'
  },
  isVerified: { 
    type: Boolean, 
    default: false
  }
}, { 
  timestamps: true 
});

// Méthode pour ne pas renvoyer le mot de passe
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', userSchema);