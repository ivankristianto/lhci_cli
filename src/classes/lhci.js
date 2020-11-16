import Request from './request';

class Lhci extends Request {
	/**
	 * Build object URL from given urlPath
	 *
	 * @param {string} serverUrl Server URL
	 * @param {string} urlPath URL path to concat with root api url
	 * @returns {URL}
	 */
	static buildApiURL(serverUrl, urlPath) {
		return new URL(`${serverUrl}/${urlPath}`);
	}

	/**
	 * List Builds
	 *
	 * @param {string} serverUrl serverUrl Server URL
	 * @param {string} projectId Project ID
	 * @returns {Promise<*>}
	 */
	static async listBuilds(serverUrl, projectId) {
		const apiUrl = Lhci.buildApiURL(serverUrl, `v1/projects/${projectId}/builds?limit=1000`);

		const response = await Lhci.request(apiUrl.toString());

		if (!response) {
			throw new Error('Cannot get json response');
		}

		return response;
	}

	/**
	 * Delete a Build
	 *
	 * @param {string} serverUrl Server URL
	 * @param {string} adminToken LHCI Admin API Token
	 * @param {string} projectId Project ID
	 * @param {string} buildId Build ID
	 * @returns {Promise<*>}
	 */
	static async deleteBuild(serverUrl, adminToken, projectId, buildId) {
		const apiUrl = Lhci.buildApiURL(serverUrl, `v1/projects/${projectId}/builds/${buildId}`);

		const response = await Lhci.request(apiUrl.toString(), 'DELETE', null, {
			'x-lhci-admin-token': adminToken,
		});

		if (!response) {
			throw new Error('Cannot get json response');
		}

		return response;
	}
}

export default Lhci;
