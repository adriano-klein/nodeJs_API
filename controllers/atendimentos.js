const Atendimento = require('../models/atendimentos')

module.exports = app => {
  app.get("/atendimento", (req, res) => res.send('Rota atendimentos'));

  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    Atendimento.adicionar(atendimento);

    res.send("Atendimento criado com sucesso");
  })
}