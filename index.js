// Create an app
var server = require('diet');
var ws = require('./websockets-server');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var app = server();
app.listen('http://localhost:8000');

// When http://localhost:8000/ is requested, respond with "Hello World!"
//app.get('/', function($) {
//$.end('Hello World!');
//});

//app.get('/', function($) {
//console.log($.url);
//$.end('hi');
//});

var static = require('diet-static')({
  path: app.path + '/app/'
});

app.view('file', static);
app.footer(static);
//app.footer(function($) {
//var pathname = $.url.pathname;
//var mimeType = mime.lookup(pathname);
//var extension = path.extname(pathname);
//var source = app.path + pathname;

//if (extension) {
//$.header('Content-Type', mimeType);
//fs.readFile(source, function(error, data) {
//if (!error) {
//$.end(data);
//$.return();
//} else if (error.type != 'ENOENT') {
//$.status(error.status || 500, 'File not found');
//$.return();
//} else {
//throw error;
////$.return();
//}
//});
//} else {
//$.return();
//}
//});

app.get('/', function($) {
  $.redirect('index.html');
});

app.missing(function($) {
  //$.end('My Custom 404 Not Found Page');
  //redirect('error.html'); //gives 500 error
  $.header('content-type', 'text/html');
  //$.status('404', 'File not found'); // -> 404 not found
  fs.readFile(__dirname + '/app/error.html', function(err, data) {
    if (err) {
      throw err;
    } else {
      $.end(data.toString());
    }

  });
});

//app.error(function($, middleware) {
// Log the error
//console.trace('Something bad happened....!!', $.status, $.error.message);
//});
