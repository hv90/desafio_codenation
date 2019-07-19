const https = require('https');
const fs = require('fs');

let token = '';//entre seu token aqui

https.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token='+ token, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
    fs.writeFile('answer.json', data, (err) => {
        if(err) throw err;
      });
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});