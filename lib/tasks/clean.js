const del = require('del');

module.exports = () => del.sync('dist/**');
