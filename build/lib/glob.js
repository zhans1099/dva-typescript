const glob = require('glob');

module.exports = {
    sync(pattern, options) {
        return glob.sync(pattern, options);
    },

    async(pattern, options) {
        return new Promise(function(resolve, reject) {
            glob(pattern, options, function(error, files) {
                if (error) {
                    reject(error);
                } else {
                    resolve(files);
                }
            });
        });
    }
}