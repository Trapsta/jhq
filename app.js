var express = require('express');
const path = require('path');
var app = express();

// Routes
app.get('/api', function(req, res) {
    res.send('Back-end is ready. Sending some cool friendly chimps over to iHub , Fuzu and LinkedIn...!');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname+'/client/build/index.html'));
});



//Scraper
let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');




//Get iHUB
axios.get('https://ihub.co.ke/jobs')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let ihubList = [];
            $('.jobsboard-row').each(function(i, elem) {
                ihubList[i] = {
                    jobTitle: $(this).find('h3').text(),
                    company: $(this).find('.post-company').text(),
                    source: "iHub",
                    date: $(this).find('.job-time').text(),
                    url: "https://ihub.co.ke" + $(this).find('.job-more').attr('href'),
                    category: $(this).find('.job-cat').text(),
                    jobLikes: 0

                }
            });
            const ihubListTrimmed = ihubList.filter(n => n != undefined)
            fs.writeFile('./client/src/components/ihubList.json',
                JSON.stringify(ihubListTrimmed, null, 4),
                (err) => console.log('ihubListTrimmed File successfully written!'))
        }
    }, (error) => console.log(err));





var pages;
var lastPage;
let fuzuList = [];

//Get FUZU
axios.get('https://www.fuzu.com/categories/it-software')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            pages = $('.indicator').text();
            let mats = [];
            pages.match(/\d+/g).forEach(function(i, j) {
                mats[j] = parseInt(i);
            });


            lastPage = mats[mats.length - 1];        
        }


        var j;
        for (j = 0; j <= lastPage; j++) {
          if (j > 0) {
            var fuzUrl = "https://www.fuzu.com/categories/it-software?page=" + j;

            axios.get(fuzUrl)
                .then((response) => {
                    if (response.status === 200) {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        $('.carton-job').each(function(i, elem) {
                            fuzuList.push({
                                jobTitle: $(this).find('h3').text(),
                                company: $(this).find('.carton-logo.block').attr('href'),
                                company2: $(this).find('.carton-logo.block').children('img').attr('alt'),
                                source: "Fuzu",
                                date: new Date().toLocaleDateString(),
                                url: "https://www.fuzu.com" + $(this).find('.btn-main').attr('href'),
                                category: "IT & Software",
                                jobLikes: 0
                            });
                                
                        });


                        for (var prop in fuzuList) {
                            if (fuzuList[prop]["company"] === undefined ) {
                                fuzuList[prop]["company"] = 'Undisclosed';
                            } else {
                                fuzuList[prop]["company"] = fuzuList[prop]["company"].replace('/company/','');
                                fuzuList[prop]["company"] = fuzuList[prop]["company"].replace(/-/g, ' ');
                            }
                        }


                        for (var prop in fuzuList) {
                            if (fuzuList[prop]["company2"] === undefined ) {
                            } else {
                                fuzuList[prop]["company2"] = fuzuList[prop]["company2"].replace('logo'," ");
                            }
                        }

                        const fuzuListTrimmed = fuzuList.filter(n => n != undefined)
                        fs.writeFile('./client/src/components/fuzuList.json',
                            JSON.stringify(fuzuListTrimmed, null, 4),
                            (err) => console.log(fuzUrl + ' successfully written!'))
                    }
                }, (error) => console.log(err));
          }
        }


    }, (error) => console.log(err));




var getLinkedIn = function () {
    const $ = cheerio.load(fs.readFileSync('./linkedin.html'));
    let liList = [];
    $('.card-list__item').each(function(i, elem) {
        liList[i] = {
            jobTitle: $(this).find('h3').text(),
            company: $(this).find('h4').text(),
            source: "LinkedIn",
            date: new Date().toLocaleDateString(),
            category: $(this).find('.job-cat').text(),
            url: "https://www.linkedin.com/jobs/view/" + $(this).find('.pl4').attr('data-job-id'),
            jobLikes: 0

        }
    });
    const liListTrimmed = liList.filter(n => n != undefined)
    fs.writeFile('./client/src/components/linkedin.json',
        JSON.stringify(liListTrimmed, null, 4),
        (err) => console.log('LinkedIn File successfully written!'))
}


getLinkedIn();



app.listen(process.env.PORT || 3000)
console.log('Running on port 3000');
exports = module.exports = app;