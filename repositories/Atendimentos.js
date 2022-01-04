const query = require("../infra/database/queries");

class Atendimentos {
  adiciona(atendimento) {
    const sql = "INSERT INTO Atendimentos SET ?";
    return query(sql, atendimento);
  }
  lista() {
    const sql = "SELECT * from Atendimentos";

    return query(sql);
  }
}

module.exports = new Atendimentos();
