import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://Alura:123@clusteralura.xcu9lwd.mongodb.net/alura-node"
);

let db = mongoose.connection;

export default db;
