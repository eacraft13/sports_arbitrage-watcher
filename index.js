var initializer = require('./lib/initializer');



setTimeout(function() {

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

}, 1000 * 60);
