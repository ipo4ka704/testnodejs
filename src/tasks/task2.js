const fs = require('fs');
const events = require('events');
const csv = require('csvtojson');
const { pipeline } = require('stream');
const readline = require('readline');
const csvFilePath='files/1.2.csv';
const textFilePath='files/1.2.txt';
const readText = fs.createReadStream(csvFilePath)
const writeText = fs.createWriteStream(textFilePath);
const results = [];

// async function processChunk(chunk) {
//     return chunk
// }

// readText
//     .pipe(csv())
//     // .on('data', (data) => writeText.write(data))
//     .on('error', function(err){
//         console.log('Error while reading file.', err);
//     })
//     .on('end', function(){
//         console.log('After File Content Checked.');
//     });




// pipeline(
//   csv().fromStream(readText),
//   async function* (source, { signal }) {
//     source.setEncoding('utf8');
//     for await (const chunk of source) {
//       yield await processChunk(chunk);
//     }
//   },
//   writeText,
//   err => {
//     if (err)
//       console.log('Error while reading file.', err);
//     else
//       console.log('After File Content Checked.');
//   }
// );

(async function processLineByLine() {
    try {
        const rl = readline.createInterface({
            input: csv().fromStream(readText),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            line = JSON.parse(line, function(prop, value) {
                var lower = prop.toLowerCase();
                if(prop === lower) return value;
                else this[lower] = value;
            });
            delete  line.amount;
            writeText.write(JSON.stringify(line) + '\r\n');
        });

        await events.once(rl, 'close');

        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    } catch (err) {
        console.error(err);
    }
})();