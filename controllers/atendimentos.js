module.exports = app => {
  app.get("/atendimento", (req, res) => res.send('Rota atendimentos'));

  app.post("/atendimentos", (req, res) => {
    res.json( req.body.name )
  })
}