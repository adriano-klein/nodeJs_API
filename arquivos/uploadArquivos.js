const fs = require("fs");

module.exports = (path, fileName, callBackImageCreated) => {
  const newPath = `./arquivos/assets/images/${fileName}`;

  fs.createReadStream(path)
    .pipe(fs.createWriteStream(newPath))
    .on("finish", () => callBackImageCreated(newPath));
};
