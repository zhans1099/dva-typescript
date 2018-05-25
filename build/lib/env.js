'use strict';

module.exports = {
    env: process.env.DIST_ENV || 'dev',
    isDev: process.env.DIST_ENV === 'dev',
    isBeta: process.env.DIST_ENV === 'beta',
    isProd: process.env.DIST_ENV === 'product',
    isMock: process.env.IS_MOCK === 'mock'
}