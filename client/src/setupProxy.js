const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google', '/auth/facebook', '/auth/instagram', '/auth/twitter', '/auth/linkedin', '/auth/spotify'], { target: 'http://localhost:5000' }));
}