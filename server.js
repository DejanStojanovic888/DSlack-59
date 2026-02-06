const express = require("express");
const session = require("express-session");
const router = require("./router"); 
const db = require("./database");
const app = express();

app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.set("view engine", "ejs");
app.set("view options", { root: __dirname + "/views" }); //ovo sluzi da nam putanje u EJS FAJLOVIMA krecu od VIEWS foldera(dashboard.ejs)
app.use(express.static("public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/css/"));
app.use(express.static(__dirname + "/node_modules/bootstrap-icons/font/"));
app.use(express.static(__dirname + "/node_modules/jquery/dist/")); 
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/js/"));
app.use(express.urlencoded({ extended: true }));

app.use("/", router); // router uvek na dnu podesavanja da bi sve bilo dostupno


app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});