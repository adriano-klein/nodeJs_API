const conexao = require("./conexao");

const runQuery = (query, parameters = "") => {
  return new Promise((resolve, reject) => {
    conexao.query(query, parameters, (erros, campos) => {
      if (erros) {
        reject(erros);
      } else {
        resolve(resultados);
      }
    });
  });
};

module.exports = new runQuery();
