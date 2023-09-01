import editoras from "../models/Editora.js";

class EditoraController {
  static listarEditoras = (_req, res) => {
    editoras.find((err, editoras) => {
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - Erro ao localizar editoras` });
      } else {
        res.status(200).json(editoras);
      }
    });
  };

  static listarEditoraPorId = (req, res) => {
    const id = req.params.id;
    editoras.findById(id, (err, editora) => {
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - ID da editora não localizado.` });
      } else {
        res.status(200).send(editora);
      }
    });
  };

  static cadastrarEditora = (req, res) => {
    let editora = new editoras(req.body);

    editora.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar editora.` });
      } else {
        res.status(201).send(editora.toJSON());
      }
    });
  };

  static atualizarEditora = async (req, res) => {
    try {
      const id = req.params.id;
      await editoras.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Editora atualizada com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static excluirEditora = (req, res) => {
    const id = req.params.id;
    editoras.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Editora excluída com sucesso." });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default EditoraController;
