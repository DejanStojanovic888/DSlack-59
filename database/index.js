const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/dslack')
.then(() => console.log('Database connected'))
.catch(err => console.log(err));    


module.exports = mongoose.connection;