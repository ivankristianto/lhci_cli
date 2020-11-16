import fetch from 'node-fetch';
import { getAuthToken } from '../utils/config';
import log from '../utils/logger';

class Request {
	static defaultHeaders() {
		return {
			'Content-Type': 'application/json',
		};
	}

	static async constructHeaders(headersOpt = {}) {
		const authToken = await getAuthToken();
		return {
			Authorization: `Bearer ${authToken}`,
			...headersOpt,
		};
	}

	static async requestInterface(url, method = 'GET', body = null, headersOpt = {}) {
		const headers = await Request.constructHeaders(headersOpt);

		const opts = { method, headers: { ...headers, ...Request.defaultHeaders() } };

		if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
			opts.body = JSON.stringify(body);
		}

		try {
			return await fetch(url, opts);
		} catch (err) {
			log.error(err);
			return false;
		}
	}

	static async requestAsText(url, method = 'GET', body = null, headersOpt = {}) {
		const response = await Request.requestInterface(url, method, body, headersOpt);

		if (response === false) {
			return response;
		}

		return response.text();
	}

	static async requestWithFormData(url, method = 'POST', body = null, headersOpt = {}) {
		const headers = await Request.constructHeaders(headersOpt);

		const opts = { method, headers, body };

		try {
			const response = await fetch(url, opts);

			return response.json();
		} catch (err) {
			log.error(err);
			return false;
		}
	}

	static async request(url, method = 'GET', body = null, headersOpt = {}) {
		const response = await Request.requestInterface(url, method, body, headersOpt);

		if (!response.ok) {
			return response;
		}

		if (response.status === 204) {
			return true;
		}

		return response.json();
	}
}

export default Request;
