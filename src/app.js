import Express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => {
  console.log("A conexão com o banco foi feita com sucesso!");
});

const app = Express();

app.use(Express.json());

routes(app);

export default app;
