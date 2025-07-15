const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({
        error: "Forbidden : You do not have permission to access this resoure.",
      });
    }
    next();
  };
};

export default authorizeRoles;
