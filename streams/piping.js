var request = require('request');
var fs = require('fs');
var zlib = require('zlib');
//var s = request('http://www.pluralsight.com/');

//s.pipe(process.stdout);

request('http://www.pluralsight.com/').pipe(zlib.createGzip()).pipe(fs.createWriteStream('pluralsight.html.gz'));