var fs = require('fs');
var request = require('request');

function githubRequest(endpoint, callback) {
  var githubRoot = "https://api.github.com";

  var options = {
    url: `${githubRoot}${endpoint}`,
    headers: {
      'User-Agent': 'request'
    }
  };

  request.get(options, callback);
}

function getRepoContributors(repoOnwner, repoName, callback) {

  githubRequest(`/repos/${repoOwner}/${repoName}/contributors`, callback);
}

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log(`Getting ${repoOwner} contributors...\n`);

getRepoContributors(repoOwner, repoName, function(error, response, body) {
  if (error) {
    console.log("Something went wrong:", error);
    return;
  }

  var contributors = JSON.parse(body);

  contributors.forEach(function(contributor){
    downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.png`, function(){

  });
  });
});

function downloadImageByURL(url, filePath, callback) {

  request.head(url, function(err, res, body){

    request(url).pipe(fs.createWriteStream(filePath)).on('close', callback);
  });
};



