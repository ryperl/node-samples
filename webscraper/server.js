var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
    // All the scraping magic here
    url = 'http://www.imdb.com/title/tt1229340';

    // The structure of our call
    // The first parameter is our url
    // The callback function takes 3 parmeters, an error, response status code,
    // and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the
        // request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html
            // which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture
            var title, release, rating;
            var json = {title : "", release : "", rating : "" };

            // we'll use the unique title_wrapper class as a starting point
            $('.title_wrapper').filter(function(){
                // Lets store the data we filter into a variable so we can
                // easily see whats going on.

                var data = $(this);

                // In examining the DOM we notice that the title rests within
                // the first child element of the title wrapper tag
                title = data.children().first().text();

                // we will repeat te same process as above. This time we notice
                // that the release is located within the last element
                // Writing this code will move us to the exact location of the
                // release year
                release = data.children().first().children().first().text();

                // Once we have our title, we'll store it to the json object.
                json.title = title;

                // Once again, once we have the data extract it we'll be saved
                // to our json object
                json.release = release
            });

            // Since the rating is in a different section of the DOM, we'll have
            // to write a new jQuery filter to extract this information
            $('.ratingValue').filter(function(){
                var data = $(this);

                // The .ratingValue class was exactly where we wanted to be.
                // To get the rating, we can simply just get the .text(), no
                // need to traverse the DOM any futher
                rating = data.children().first().text();

                json.rating = rating;
            });
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');

            // Finally, we'll just send out a message to the browser reminding
            // you that this app does not have a UI.

            res.send('Check your console!');
        });
    });
});

app.listen('8080');

console.log('Magic happens on port 8080');

exports = module.exports = app;