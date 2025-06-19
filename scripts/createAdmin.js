import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Vérifier si un admin existe déjà
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('ℹ️ Un administrateur existe déjà');
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }

    // Créer un nouvel admin
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'System',
      email: 'admin@system.com',
      password: hashedPassword,
      role: 'admin',
      status: 'verifie',
      isVerified: true,
      phone: '+33123456789'
    });

    await adminUser.save();
    console.log('✅ Administrateur créé avec succès');
    console.log('Email:', adminUser.email);
    console.log('Mot de passe: Admin123!');
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdminUser(); 