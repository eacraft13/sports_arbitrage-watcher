var r = require('rethinkdbdash')(require('../config').rethinkdb);

r.tableCreate('arbitrage');
