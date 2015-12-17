#!/usr/bin/env node
var initializer = require('./lib/initializer');



initializer(function(err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    else {
        // console.log(data);
        process.exit();
    }
});
