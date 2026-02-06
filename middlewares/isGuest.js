function isGuest(req, res, next) {
    if (req.session.user) {
        res.redirect("/admin/dashboard");
    } else {
        next();
    }
}

module.exports = isGuest;