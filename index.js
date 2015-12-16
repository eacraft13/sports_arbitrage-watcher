var config      = require('./config');
var initializer = require('./lib/initializer');
var r           = require('rethinkdbdash')(config.rethinkdb);



initializer(function(err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    else {
        console.log(data);
        process.exit();
    }
});
