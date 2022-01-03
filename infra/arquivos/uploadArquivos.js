const fs = require("fs");
const path = require("path");

module.exports = (filePath, fileName, callBackImageCreated) => {
  const type = path.extname(filePath);
  const newPath = `./arquivos/assets/images/${fileName}${type}`;
  const validTypes = ["jpg", "jpeg", "png"];
  const isValid = validTypes.indexOf(type.substring(1)) !== -1;

  if (isValid) {
    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newPath))
      .on("finish", () => callBackImageCreated(false, newPath));
  } else {
    const erro = "Tipo de imagem inválida";
    callBackImageCreated(erro);
  }
};
