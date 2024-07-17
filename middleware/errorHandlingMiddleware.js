import { HttpError } from '../errors/index.js';

const errorHandling = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof HttpError) {
        return res.status(err.status).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        message: 'ERROR_NOT_RECOGNIZED',
    });
};

export {errorHandling};

