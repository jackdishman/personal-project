const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
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

passport.use(
    new FacebookStrategy({
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'gender'],
            enableProof: true
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('facebook ID:', profile.id);
            console.log('displayName:', profile.displayName);
            // console.log('birthday: ' + profile.user_birthday);
            console.log('gender: ' + profile.gender);
            User.findOne({ facebookID: profile.id }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({
                        facebookID: profile.id,
                        name: profile.displayName
                    }).save().then(user => done(null, user));
                }
            });
        }
    )
);

passport.use(
    new TwitterStrategy({
            consumerKey: keys.twitterClientID,
            consumerSecret: keys.twitterClientSecret,
            callbackURL: '/auth/twitter/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("twitter ID: ", profile.id);
            console.log("twitter handle: ", profile.username);
        }
    )
);

passport.use(
    new SpotifyStrategy({
            clientID: keys.spotifyClientID,
            clientSecret: keys.spotifyClientSecret,
            callbackURL: '/auth/spotify/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("spotify ID: ", profile.id);
            console.log("recently played: ", profile);
        }
    )
);