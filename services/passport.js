const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const { googleClientID, googleClientSecret, mongoURI } = require('../config/keys')


const User = mongoose.model('users');


passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id}).then(existingUser => {
            if(existingUser){
            // chekea si la propiedad es valida o null
                done(null, existingUser);
            } else {
                new User({
                    googleId: profile.id
                })
                .save()
                .then(user => done(null, user));
            }
        })
        console.log('new user added, ', profile.name.givenName)
    })
);