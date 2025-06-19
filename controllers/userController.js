export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Si le mot de passe est inclus, on le hash
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};