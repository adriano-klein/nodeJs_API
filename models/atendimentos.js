const moment = require("moment");
const conexao = require("../infra/database/conexao");
const axios = require("axios");
const repository = require("../repositories/Atendimentos");

class Atendimentos {
  adiciona(atendimento) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const dataValida = moment(data).isSameOrAfter(dataCriacao);

    const clienteValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataValida,
        mensagem: "A data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteValido,
        mensagem: "O nome do cliente deve ter pelo menos 5 caracteres",
      },
    ];
    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros > 0) {
      return new Promise((resolve, reject) => reject(erros));
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };

      return repository.adiciona(atendimentoDatado).then((resultado) => {
        const id = resultado.insertId;
        return { ...atendimento, id };
      });
    }
  }

  lista(res) {
    const sql = "SELECT * from Atendimentos";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

    conexao.query(sql, async (erro, resultados) => {
      const existeAtendimento = resultados.length;

      if (!existeAtendimento) {
        res.status(400).json({ message: "Atendimento não encontrado" });
      }

      const atendimento = resultados[0];
      const cpf = atendimento.cliente;

      if (erro) {
        res.status(400).json(erro);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        atendimento.cliente = data;
        res.status(200).json(atendimento);
      }
    });
  }

  altera(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const sql = "UPDATE Atendimentos SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, res) {
    const sql = "DELETE from Atendimentos WHERE id=?";

    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ "Atendimento deletado com o ID": id });
      }
    });
  }
}

module.exports = new Atendimentos();
