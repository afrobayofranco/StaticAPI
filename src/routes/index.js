module.exports = (express) => {
    const router = express.Router();

    router.get('/status', (req, res) => {
        res.json({
            healthy: true,
        })
    });

    // Routes
    router.use('/api/', require('./api/api')(express));
    router.use('/go/', require('./go/go')(express));

    return router;
}
