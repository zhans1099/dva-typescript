const path = require('path');
const { directories } = require('../../f2eci.json');
const packageJson = require('../../package.json');
const { env } = require('./env');


const OSS_DIR = `/app/${packageJson.name}/`;

const PUBLIC_PATH = {
    NONE: './',
    DEV: '/dist/',
    LOCAL: '../static/',
    HTML: path.relative(directories.html, directories.static) + '/'   // TODO: 此处未判断html目录为空
}

const PATH_MAPPING = {
    'css': {
        'dev': PUBLIC_PATH.DEV,
        'local': PUBLIC_PATH.LOCAL,
        'beta': PUBLIC_PATH.NONE,
        'product': PUBLIC_PATH.NONE
    },
    'other': {
        'dev': PUBLIC_PATH.DEV,
        'local': PUBLIC_PATH.LOCAL,
        'beta': PUBLIC_PATH.BETA,
        'product': PUBLIC_PATH.PRODUCT
    }
}

let publicPath = (type) => (PATH_MAPPING[type] || PATH_MAPPING['other'])[env];

module.exports = {
    PUBLIC_PATH,
    publicPath
}
