var config = require('../config');

module.exports = require('rethinkdbdash')({ db: config.rethinkdb.db, cursor: true });
