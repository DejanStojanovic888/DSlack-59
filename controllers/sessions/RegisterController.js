const User = require("../../models/User");
const bcrypt = require("bcryptjs");  // isto radi kao SSH-key(pricacemo o njemu kasnije)
                                     // postoji algoritam koji od obicnog passworda pravi novi ludacki password(hash-ovan)
                                     // kasnije vracamo iz tog ludackog u ovaj normalni password
const RegisterController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
            // pri registrovanju prvo moramo proveru da li imamo tog usera registrovanog u bazi:
        const testUser = await User.findOne({ email: email }); // .findOne() vraca object. Ali .find() vraca array.
                                                               // Danilo je radio .find() pa posle if(testUser.length > 0)
        // console.log(testUser);  // ovde dobijamo null ako nema usera
        if(testUser) {
            return res.status(400).json({ message: "User already exists" }); // return je bitno. Jer prekida dalju egzekuciju funkcije
                                                                            // mogli smo i da napravimo ERROR page
        }   
        const salt = await bcrypt.genSalt(10); // random algoritam za 10 cifara
        const hashedPassword = await bcrypt.hash(password, salt); // hash-uje password

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword  // bitno(jer je zakonski kaznjivo ako ne bude ovako u bazi)
        });
        await newUser.save();
        // sada, posto smo ga registrovali, mozemo da ga automatski ulogujemo(i redirectujemo na neki page)
        res.redirect("/");  // Danilo vise voli ovako(ako si se registrovao, ajde sad se sam uloguj)
            
    } catch (error) {
        console.log(error.message);
        res.redirect("/register");
    }
    
}

module.exports = RegisterController;