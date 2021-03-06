import Lhci from '../classes/lhci';
import log from '../utils/logger';

exports.command = 'delete <number>';
exports.desc = 'Delete number of oldest Lighthouse CI Server Builds';
exports.builder = {
	serverUrl: {
		describe: 'LHCI Server Url',
		type: 'string',
		demandOption: true,
	},
	adminToken: {
		describe: 'LHCI Admin API Token',
		type: 'string',
		demandOption: true,
	},
	projectId: {
		describe: 'Project ID',
		type: 'string',
		demandOption: true,
	},
	branch: {
		describe: 'Filter branch',
		type: 'string',
	},
	exclude: {
		describe: 'Exclude branch(es)',
		type: 'array',
	},
};
exports.handler = async function (argv) {
	const { adminToken, branch, exclude, number, serverUrl, projectId } = argv;

	let builds = await Lhci.listBuilds(serverUrl, projectId);

	if (branch) {
		builds = builds.filter((build) => build.branch === branch);
	}

	if (exclude) {
		builds = builds.filter((build) => exclude.indexOf(build.branch) < 0);
	}

	// Reverse, Split, Get Ids.
	const ids = builds
		.reverse()
		.slice(0, number)
		.map((build) => build.id);

	// eslint-disable-next-line no-plusplus
	for (let i = 0, len = ids.length; i < len; i++) {
		log.info(`Deleting build id: ${ids[i]}`);
		// eslint-disable-next-line no-await-in-loop
		await Lhci.deleteBuild(serverUrl, adminToken, projectId, ids[i]);
		log.success(`Delete id ${ids[i]} success`);
	}
};
