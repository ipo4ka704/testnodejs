import csv from "csvtojson";
import fs from "fs";
const csvFilePath = 'files/1.2.csv';
const textFilePath='files/1.2.txt';
const writeText = fs.createWriteStream('files/1.2.txt');
const results = [];

fs.createReadStream(csvFilePath)
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => writeText.write(data))
    .on('error', function(err){
        // console.log('Error while reading file.', err);
    })
    .on('end', function(){
        console.log('After File Content Checked.');
    });
