var initializer = require('./lib/initializer');
var r           = require('rethinkdb');



r.connect({ host: 'delphi.website' })
.then(function(conn) {
    conn.use('board');
    initializer(conn, function() {
        conn.close();
        process.exit();
    });
});
