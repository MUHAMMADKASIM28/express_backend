const can = (requiredPermission) => {
    return (req, res, next) => {
        // Ambil permissions dari sesi
        const userPermissions = req.session.user ? req.session.user.permissions : [];

        if (!userPermissions.includes(requiredPermission)) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required permission.' });
        }
        
        // Pengguna memiliki izin, lanjutkan
        next();
    };
};

module.exports = can;