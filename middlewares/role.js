export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentification requise'
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Accès refusé. Le rôle ${req.user.role} n'est pas autorisé`
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
