import ApiError from './apiError.js';

export const getJson = async (url, options = {}) => {
	const response = await fetch(url, {
		...options,
		headers: {
			...(options.headers || {}),
		},
	});

	const contentType = response.headers.get('content-type') || '';
	let payload = null;

	if (contentType.includes('application/json')) {
		try {
			payload = await response.json();
		} catch {
			payload = null;
		}
	} else {
		payload = await response.text();
	}

	if (!response.ok) {
		const message = payload?.status?.message || payload?.message || `Request failed with status ${response.status}`;
		throw new ApiError(message, response.status, payload);
	}

	return payload;
};

