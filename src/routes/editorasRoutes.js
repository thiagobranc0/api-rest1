import Express from "express";
import EditoraController from "../controllers/editorasController.js";

const router = Express.Router();

router
  .get("/editoras", EditoraController.listarEditoras)
  .get("/editoras/:id", EditoraController.listarEditoraPorId)
  .post("/editoras", EditoraController.cadastrarEditora)
  .put("/editoras/:id", EditoraController.atualizarEditora)
  .delete("/editoras/:id", EditoraController.excluirEditora);

export default router;
