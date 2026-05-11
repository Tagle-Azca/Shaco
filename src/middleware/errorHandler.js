import ApiError from '../utils/apiError.js';

export const notFoundHandler = (req, res, next) => {
	next(new ApiError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const errorHandler = (error, req, res, next) => {
	const statusCode = error.statusCode || 500;

	if (statusCode >= 500) {
		console.error(error);
	}

	res.status(statusCode).json({
		message: error.message || 'Internal Server Error',
		...(error.details ? { details: error.details } : {}),
	});
};

