const request = require("request");
const fs = require("fs");
const readline = require("readline");
const args = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const fetchAndWriteFile = () => request(args[0], (error, response, body) => {
  if (error) {
    console.log(`${args[0]} is an invalid address, sorry!`);
    process.exit();
  }
  fs.writeFile(args[1], body, (error, data) => {
    if (error) {
      console.log(`${args[1]} is an invalid path.`);
    } else {
      console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}.`);
    }
    rl.close();
  });
});

fs.exists(args[1], function(doesExist) {
  if (doesExist) {
    rl.question("The file already exists. Do you wish to re - write the file? Type Y or N.", (reWriteFile) => {
      if (reWriteFile === "Y") {
        fetchAndWriteFile();
      } else {
        process.exit();
      }
    });
  } else {
    fetchAndWriteFile();
  }
});




