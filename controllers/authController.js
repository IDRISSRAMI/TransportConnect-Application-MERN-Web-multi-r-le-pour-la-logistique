import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log('🔍 Login attempt started');
    console.log('📧 Email:', req.body.email);
    console.log('🔑 Password provided:', !!req.body.password);
    
    const { email, password } = req.body;
    
    // Validation des champs requis
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ 
        success: false,
        message: 'Email et mot de passe requis' 
      });
    }

    // Trouver l'utilisateur
    console.log('🔍 Searching for user...');
    const user = await User.findOne({ email });
    console.log('👤 User found:', !!user);
    
    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ 
        success: false,
        message: 'Utilisateur non trouvé.' 
      });
    }

    // Vérifier le mot de passe
    console.log('🔒 Verifying password...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ Password match:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password incorrect');
      return res.status(400).json({ 
        success: false,
        message: 'Mot de passe incorrect.' 
      });
    }

    // Vérifier que JWT_SECRET existe
    console.log('🔐 JWT_SECRET exists:', !!process.env.JWT_SECRET);
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not defined in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Erreur de configuration du serveur - JWT_SECRET manquant'
      });
    }

    // Générer le token
    console.log('🎫 Generating token...');
    const tokenPayload = { 
      id: user._id, 
      role: user.role 
    };
    console.log('📄 Token payload:', tokenPayload);
    
    const token = jwt.sign(
      tokenPayload, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    console.log('✅ Token generated successfully');
    console.log('🎫 Token preview:', token.substring(0, 50) + '...');

    // Préparer la réponse
    const response = { 
      success: true,
      message: 'Connexion réussie', 
      token: token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    };

    console.log('📤 Sending response...');
    console.log('📊 Response includes token:', !!response.token);
    
    // Retourner la réponse avec le token
    res.status(200).json(response);

  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('📍 Error stack:', error.stack);
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Aucun utilisateur trouvé avec cet email' 
      });
    }

    // Ici vous pourriez générer un token de réinitialisation et l'envoyer par email
    // Pour l'instant, on simule juste la réponse
    res.status(200).json({ 
      success: true,
      message: 'Un email de réinitialisation a été envoyé' 
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { resettoken } = req.params;
    const { password } = req.body;

    // Validation basique
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Ici vous devriez vérifier le resettoken et trouver l'utilisateur correspondant
    // Pour l'instant, on simule juste la réponse
    res.status(200).json({ 
      success: true,
      message: 'Mot de passe réinitialisé avec succès' 
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // req.user est disponible grâce au middleware verifyToken
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({ 
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateDetails = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    
    // Vérifier si l'email existe déjà (s'il est différent de l'actuel)
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Cet email est déjà utilisé'
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
        ...(phone && { phone })
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({ 
      success: true,
      data: updatedUser,
      message: 'Détails utilisateur mis à jour avec succès' 
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel et nouveau mot de passe requis'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Vérifier le mot de passe actuel
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe
    await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });

    res.status(200).json({ 
      success: true,
      message: 'Mot de passe mis à jour avec succès' 
    });
  } catch (error) {
    next(error);
  }
};