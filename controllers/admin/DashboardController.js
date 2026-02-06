// const User = require("../../models/User");  // ovo ne mora jer smo celog user-a stavili u session(sto nije preporucljivo)
// pa mozemo samo let user = req.session.user;
const DashboardController = async (req, res) => {
    let user = req.session.user;
    res.render("admin/dashboard", { user, title: "Dashboard"});  // ovo automatski trazi u views folderu
}

module.exports = DashboardController;