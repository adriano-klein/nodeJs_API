const fs = require("fs");

fs.createReadStream("./assets/imagem.png")
  .pipe(fs.createWriteStream("./assets/imagem2.png"))
  .on("finish", () => console.log("Imagem escrita com sucesso"));
