const conexao = require("../infra/conexao");
const fileUpload = require("../arquivos/uploadArquivos");

class Pets {
  adiciona(pet, res) {
    const query = "INSERT INTO Pets SET ?";
    fileUpload(pet.imagem, pet.nome, (newPath) => {
      const newPet = { nome: pet.nome, imagem: newPath };

      conexao.query(query, newPet, (erro) => {
        if (erro) {
          console.log(erro);
          res.status(400).json(erro);
        } else {
          res.status(200).json(newPet);
        }
      });
    });
  }
}

module.exports = new Pets();
