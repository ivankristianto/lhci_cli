import Request from './request';

class Lhci extends Request {
	/**
	 * Get Root API URL
	 *
	 * @returns {string}
	 */
	static getRootApiUrl() {
		return 'empty';
	}

	/**
	 * Build object URL from given urlPath
	 *
	 * @param {string} urlPath URL path to concat with root api url
	 * @returns {URL}
	 */
	static buildApiURL(urlPath) {
		return new URL(`${Lhci.getRootApiUrl()}/${urlPath}`);
	}

	/**
	 * List Builds
	 *
	 * @param {string} projectId Project ID
	 * @returns {Promise<*>}
	 */
	static async listBuilds(projectId) {
		const apiUrl = Lhci.buildApiURL(`projects/${projectId}/builds?limit=1000`);

		const response = await Lhci.request(apiUrl.toString());

		if (!response) {
			throw new Error('Cannot get json response');
		}

		return response;
	}

	/**
	 * Delete a Build
	 *
	 * @param {string} projectId Project ID
	 * @param {string} buildId Build ID
	 *
	 * @returns {Promise<*>}
	 */
	static async deleteBuild(projectId, buildId) {
		const apiUrl = Lhci.buildApiURL(`projects/${projectId}/builds/${buildId}`);

		const response = await Lhci.request(apiUrl.toString(), 'DELETE', null, {
			'x-lhci-admin-token': 'empty',
		});

		if (!response) {
			throw new Error('Cannot get json response');
		}

		return response;
	}
}

export default Lhci;
