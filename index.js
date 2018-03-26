// index.js
// Starting point of execution

var app = require('./app.js');
var port = process.env.PORT || 3010;

var server = app.listen(port, function () {
    console.log('server started on port ' + port);
});
