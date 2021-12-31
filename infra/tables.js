class Tables {
  init(conexao) {
    this.conexao = conexao;
    this.createAttendances()
  }

  createAttendances() {
    const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos(id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, obervacoes text, PRIMARY KEY(id))'
    
    this.conexao.query(sql, (erro) => {
      if(erro) {
        console.log(erro)
      } else {
        console.log("Tabela de Atendimentos criada com sucesso")
      }
    })
  }
}

module.exports = new Tables