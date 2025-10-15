const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized: You must be logged in.' });
    }
};

module.exports = isAuthenticated;