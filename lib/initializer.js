var calculator = require('./calculator');
var moment     = require('moment');
var r          = require('../bin/r');



module.exports = function(callback) {
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
                        group: grouping.group,
                        data: data,
                        created: moment().unix()
                    })
                    .run();
            });
        }, callback);
    });
};
