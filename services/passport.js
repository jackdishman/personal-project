const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


//fetch
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('profile:', profile.id);
            User.findOne({ googleID: profile.id }).then(existingUser => {
                if (existingUser) {
                    //we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    new User({
                        googleID: profile.id,
                        name: profile.displayName
                    }).save().then(user => done(null, user));
                }
            });

        }
    )
);