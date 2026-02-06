//sve u vezi login register
const isGuest = require("../middlewares/isGuest");
const express = require("express");
const router = express.Router();

router.get("/", isGuest, (req, res) => { //ovde smo blokirali sa isGuest
    res.render("index");
});

router.get("/register", isGuest, (req, res) => {  // a-element za '/register'
                                                  // ovde smo blokirali sa isGuest
    res.render("register");
});

router.get("/logout", (req, res) => { 
    req.session.destroy(); 
    res.redirect("/");
});

router.post("/login", require("../controllers/sessions/LoginController.js"));  

router.post("/register", require("../controllers/sessions/RegisterController.js"));

module.exports = router;