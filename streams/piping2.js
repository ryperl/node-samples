var request = require('request');

var fs = require('fs');

request('http://www.pluralsight.com').pipe(fs.createWriteStream('pluralsight.html'));