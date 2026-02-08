const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const LoginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }); // mora prvo da se proveri da li postoji user u bazi pa tek onda da se proveri da li je password ispravan
        if(!user) {
            return res.redirect("/");
        }
        const bpass = await bcrypt.compare(password, user.password); // vraca true ili false
        if(!bpass) {
            return res.redirect("/");
        }
        // Logovanje korisnika
        req.session.user = user;  // NAJBITNIJI DEO (trebalo bi da stavimo user.id u cookie ali za sada cemo ovako)
        // console.log(req.session.user)
        console.log("Uspesno ste se logovali")
        res.redirect("/admin/dashboard");

    } catch (error) {
        console.log(error.message);
        res.redirect("/login");
    }
    
};

module.exports = LoginController;