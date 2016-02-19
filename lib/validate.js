var fs = require('fs');

module.exports = function (argv) {
    if (!fs.existsSync(argv.template)) {
        throw new Error('Template does not exist.');
    }
};
