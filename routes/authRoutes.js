const passport = require('passport');

module.exports = (app) => {

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['user_friends']
        })
    );
    app.get(
        '/auth/twitter',
        passport.authenticate('twitter', {
            scope: ['profile']
        })
    );
    app.get(
        '/auth/spotify',
        passport.authenticate('spotify', {
            scope: ['user-read-recently-played']
        })
    );


    app.get('/auth/google/callback', passport.authenticate('google'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter'));
    app.get('/auth/spotify/callback', passport.authenticate('spotify'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
}