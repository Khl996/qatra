const sendResponse = (res, statusCode, data, message = null) => {
    const response = {
        status: statusCode < 400 ? 'success' : 'error',
        data
    };

    if (message) {
        response.message = message;
    }

    res.status(statusCode).json(response);
};

module.exports = { sendResponse };
