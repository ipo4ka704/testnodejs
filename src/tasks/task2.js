const fs = require('fs');
const events = require('events');
const csv = require('csvtojson');
const { pipeline } = require('stream');
const readline = require('readline');
const csvFilePath='files/1.2.csv';
const textFilePath='files/1.2.txt';
const readText = fs.createReadStream(csvFilePath)
const writeText = fs.createWriteStream(textFilePath);

pipeline(
  readText,
  csv().subscribe((row) => {
    for (const [key, value] of Object.entries(row)) {
        var lower = key.toLowerCase();
        if(key === lower) return value;
        else {
          row[lower] = value;
          delete row[key];
        }
    }
    delete row.amount;
  }),
  writeText,
  err => {
    if (err)
      console.log('Error while reading file.', err);
    else
      console.log('After File Content Checked.');
  }
);
