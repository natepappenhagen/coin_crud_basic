const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");


// register route
// ============================================
router.get('/', (req, res) => {
    let message = ""
    if(req.session.message){
        message = req.session.message
    }
    res.render("auth/index.ejs", {message: message})
});
// register route
// ============================================
router.post("/register", async (req, res) => {
    try {
        const createdUser = await User.create(req.body)
        console.log(createdUser);
        res.redirect('/');
    } catch (err) {
        console.log(err)
        req.session.message = err.message
    }
});
// login route
// ============================================
router.post('/login', async (req, res, next) => {
    const passportCallback = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth'})
    passportCallback(req, res, next);
    console.log(req.user);
});
router.get("/logout", function (req, res) {
    req.logout();
    console.log(req.user, "logged out");
    res.redirect("/auth");
});
router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;