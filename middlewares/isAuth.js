const isAuth = (req, res, next) => {
    if(!req.session.user) {
        res.redirect("/");  // ovako je bolje(bez return res.redirect("/");)
    } else {
        next();
    }
}

module.exports = isAuth;