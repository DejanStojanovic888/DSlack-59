const express = require("express");
const isGuest = require("../middlewares/isGuest");
const router = express.Router();

router.use('/', require('./session-routes'));

router.use('/admin', require('../middlewares/isAuth')); // ovo se pokrece pre svih admin-routes(sledeca linija koda)
router.use('/admin', require('./admin-routes')); // razdelili smo na '/admin' i '/dashboard'

module.exports = router;