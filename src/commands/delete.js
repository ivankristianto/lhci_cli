exports.command = 'lhciserver';
exports.desc = 'Lighthouse CI Server Utilities';
exports.builder = function (yargs) {
	return yargs.commandDir('lhciserver_cmd');
};
exports.handler = {};
