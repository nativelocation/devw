const methods = {
    generalError: (err, res) => {
        const data = err.code ? undefined : err.message;
        const code = err.code || 500;
        return res.status(code).json({
            status: code,
            message: err.msg || "An error has ocurred, try again",
            data
        });
    },
    generalSuccess: (res, message, data) => {
        return res.status(201).json({
            status: 201,
            message,
            data
        });
    }
}

module.exports = methods;