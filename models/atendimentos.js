const conexao = require('../infra/conexao')

class Atendimentos {
  adicionar(atendimento) {
    const sql = 'INSERT INTO Atendimentos SET ?'

    conexao.query(sql, atendimento, (erro, resultados) => {
      if (erro) {
        console.log(erro)
      } else {
        console.log(resultados)
      }
    })
  }
}

module.exports = new Atendimentos