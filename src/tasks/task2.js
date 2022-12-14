const fs = require('fs');
const csv=require('csvtojson');
const csvFilePath='files/1.2.csv';
const textFilePath='files/1.2.txt';
const writeText = fs.createWriteStream(textFilePath);
const results = [];

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => writeText.write(data))
    .on('error', function(err){
        console.log('Error while reading file.', err);
    })
    .on('end', function(){
        console.log('After File Content Checked.');
    });