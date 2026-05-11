class ApiError extends Error {
<<<<<<< HEAD
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
=======
	constructor(message, statusCode = 500, details = null) {
		super(message);

		this.name = 'ApiError';
		this.statusCode = statusCode;
		this.details = details;
	}
}

export default ApiError;
>>>>>>> f6ecbbf (feat: MongoDB implementation - players, champions, matches, tournament pipeline)

module.exports = { ApiError };
