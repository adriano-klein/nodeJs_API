module.exports = app => {
  app.get("/atendimento", (req, res) => res.send('Rota atendimentos'));

  app.post("/atendimentos", (req, res) => {
    console.log("atendimento enviado")
    console.log(req.body)
    res.send("Post atendimento")
  })
}