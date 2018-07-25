const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../models/user.js");

passport.use(new GoogleStrategy({
	clientID:"1096977822951-pqah0grlilchj3ob7g68a81rn827k8de.apps.googleusercontent.com",
	clientSecret:"whzYAc-jV76K2LgKkSntR9mu",
	callbackURL:"http://localhost:3000/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id, displayName: profile.displayName }, function (err, user) {
         return done(err, user);
       });
  }
));