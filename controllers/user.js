const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");


const Holdings = require('../models/holdings');
const Coin = require('../models/coin.js');
const User = require('../models/user.js')



//   User Index Page
// ============================================
router.get("/", async (req, res) => {
  try {
    const foundUsers = await User.find({});
    res.render('user/index.ejs', {
        users: foundUsers
      });
  } catch (err) {
    res.send(err);
  }
});
// new (user) route
// ============================================
router.get("/new", (req, res) => {
  res.render('user/new.ejs');
});

// show (user) route
// ============================================
router.get("/:id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.render("user/show.ejs", {user: foundUser});
  } catch (err) {
    res. send(err);
  }
});

// edit (user) route
// ============================================
router.get("/:id/edit", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.render("user/edit.ejs", {user: foundUser});
  } catch (err) {
    res.send(err);
  }
});
// put (update user) route
// ============================================
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect("/users");
  } catch (err) {
    res.send(err);
  }
});
// post (create user) route
// ============================================
router.post('/', async (req, res) => {
  try {
    const createdUser = await User.create(req.body)
    res.redirect('/users');
  } catch (err) {
    res.send(err);
  }

});

// delete route
// ============================================
router.delete('/:id', async (req, res) => {
});



module.exports = router;