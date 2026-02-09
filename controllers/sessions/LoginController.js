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
        // Race conflict: U nekim scenarijima moze da se dogodi da prvo prikaze stranicu pa tek posle postavi cookie(resava sa callback functionom. Mogli smo req.session.callbackFunction(Ovo mi nije bas jasno. Kaze Danilo da pitamo ChatGPT) pa unutra da stavi to. Pa tek kad stavi to onda ide redirect())
        // ovo prethodno se moze primetiti ovako: Prvo se logujemo. Pa dodjemo na neku stranicu i kliknemo na nesto  i ono nas samo izloguje...
        req.session.user = user;  // NAJBITNIJI DEO (trebalo bi da stavimo user.id u cookie ali za sada cemo ovako)
        // console.log(req.session.user)
        res.redirect("/admin/dashboard");

    } catch (error) {
        console.log(error.message);
        res.redirect("/login");
    }
    
};

module.exports = LoginController;