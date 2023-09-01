import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (_req, res) => {
    livros
      .find()
      .populate(["autor", "editora"])
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;
    livros
      .findById(id)
      .populate("autor", "nome")
      .populate("editora", "nome")
      .then((livro) => {
        res.status(200).json(livro);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao buscar livro.` });
      });
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar livro.` });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static excluirLivro = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro excluído com sucesso." });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query;
    console.log(req.query);
    livros
      .find(editora)
      .populate("autor", "nome")
      // .populate("editora")
      .exec((err, livros) => {
        if (!err) {
          res.status(200).send(livros);
        } else {
          res.status(500).send({ message: `${err.message} - Erro na busca` });
        }
      });
  };
}

export default LivroController;
