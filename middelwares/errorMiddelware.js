const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultError = {
        statusCode: 500,
        message: 'Something Went Wrong'
    };

    //missing filed error
    if (err.name === 'validationError') {
        defaultError.statusCode = 400,
            defaultError.message = Object.values(err.errors).map(item => item.message).join(',');
    }
    res.status(defaultError.statusCode).json({ message: defaultError.message });
};

export default errorMiddleware;