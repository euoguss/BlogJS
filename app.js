const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const admin = require("./routes/admin");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

app.use(
  session({
    secret: "AZ6mkdVccRRQQbrPlMD1lV2JSVuML/GcXxEdjVr8VtI",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("Conectado ao Mongo");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao Mongo");
  });

app.use("/admin", admin);

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server UP");
});
