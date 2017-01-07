// Exports
module.exports = (express) => {
    const router = express.Router();

    router.get('/status', (req, res) => {
        res.json({
            healthy: true,
        })
    });

    // Routes
    // Route to api.js
    router.use('/api/', require('./api/api')(express));
    // Route to go.js
    router.use('/go/', require('./go/go')(express));

    // Returns the router.
    return router;
}
