const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");

const userController = require("./controllers/user.js");
const authController = require("./controllers/auth.js");
const holdingsController = require("./controllers/holdings.js");
const port = 3000;

require("./passport/serialize.js");
require("./passport/local-config.js");
require("./passport/google-config.js");
require('./db/db');

const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "secrets",
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/holdings", holdingsController);
app.use("/users", userController);
app.use("/auth", authController);

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.listen(port, () => {
	console.log("onward, upward");
});