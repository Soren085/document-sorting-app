const fs = require('fs');

// create a folder

function exportFile() {
  if (!fs.existsSync('OUTPUT')) {
    fs.mkdir('OUTPUT', res => {
      console.log(res)
    });
  }
}

module.exports.exportFile = exportFile;
