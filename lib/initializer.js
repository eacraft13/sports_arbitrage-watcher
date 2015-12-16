var calculator = require('./calculator');
var config     = require('../config');
var moment     = require('moment');



module.exports = function(callback) {
    var r = require('rethinkdbdash')({ db: config.rethinkdb.db, cursor: true });

    r.table('lines')
    .filter(r.row('ttl').gt(moment().unix()))
    .group('match_id')
    .run()
    .then(function(results) {
        results.each(function(err, grouping) {
            if (err) return callback(err);
            calculator(grouping.reduction, 1000, function(err, data) {
                if (data)
                    r.table('arbitrage')
                    .insert({
                        group: grouping,
                        data: data,
                        created: moment().unix()
                    })
                    .run();
            });
        }, callback);
    });

};
