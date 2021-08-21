const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
var cors = require("cors");
const auth = require("./Routes/auth");
const login = require("./Routes/authLogin");
const validateToken = require("./Routes/validateToken");
const user = require("./Routes/user");
const routines = require("./Routes/routines");
const routineDay = require("./Routes/routineDay");
const training = require("./Routes/trainingRoutine");

require("dotenv").config();

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.l93jg.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));
// import routes
app.use("/api/auth", auth);
app.use("/api/login", login);
app.use("/api/user", validateToken, user);
app.use("/api/routines", validateToken, routines);
app.use("/api/routinesDay", validateToken, routineDay);
app.use("/api/training", validateToken, training);
// route middlewares

app.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "funciona!",
  });
});

// iniciar server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
