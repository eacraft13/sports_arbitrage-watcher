var calculator = require('./calculator');
var moment     = require('moment');
var r          = require('rethinkdb');



module.exports = function(conn, callback) {

    r.table('lines').filter(r.row('ttl').gt(moment().unix())).group('match_id').run(conn)
    .then(function(results) {
        results.each(function(err, grouping) {
            calculator(grouping.reduction, 1000, function(err, data) {
                if (data) {
                    console.log(grouping.group);
                    console.log(JSON.stringify(data, null, 4));
                    console.log();
                } else {
                    console.log(grouping.group);
                    console.log('*********************');
                    console.log();
                }
            });
        }, callback);
    });

};
