const debugMiddleware = (req, res, next) => {
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Body:', req.body);
    next();
};

module.exports = debugMiddleware;
