const clientAuthMiddleware = (req, res, next) => {
    if (!req.client.authorized) {
        return res.status(401).send('Invalid client certificate authentication.');
    }
    return next();
};
export default clientAuthMiddleware()

