import User from '../models/User.js';
import Trip from '../models/Trip.js';
import Request from '../models/Request.js';

// Get dashboard statistics
export const getDashboard = async (req, res, next) => {
  try {
    const users = await User.countDocuments();
    const trips = await Trip.countDocuments();
    const requests = await Request.countDocuments();
    const acceptedRequests = await Request.countDocuments({ status: 'accepte' });

    res.status(200).json({
      success: true,
      data: {
        users,
        trips,
        requests,
        acceptedRate: requests > 0 ? (acceptedRequests / requests) * 100 : 0,
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Update user verification status
export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Vérifier si le status est valide
    if (!['en_attente', 'verifie', 'rejete'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status invalide. Les valeurs possibles sont: en_attente, verifie, rejete'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Mettre à jour le statut et isVerified
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { 
        status,
        isVerified: status === 'verifie'
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

// Delete a trip
export const deleteTrip = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Voyage non trouvé'
      });
    }

    // Vérifier s'il y a des requêtes associées
    const relatedRequests = await Request.find({ trip: id });
    if (relatedRequests.length > 0) {
      // Supprimer d'abord les requêtes associées
      await Request.deleteMany({ trip: id });
    }

    await Trip.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Voyage et requêtes associées supprimés avec succès'
    });
  } catch (error) {
    next(error);
  }
};

