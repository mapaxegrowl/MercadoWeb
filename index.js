const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3007;

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      formatearNumber: function (numberString) {
        return (+numberString).toLocaleString();
      },
      primeraMayuscula: function (texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      },
      boldHeroTitle: function (options) {
        return '<h1 class="fw-bold">' + options.fn(this) + "</h1>";
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto http://localhost:3007`);
});
app.use("/bootstrap_css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/bootstrap_js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/public", express.static("./public"));

const datos = [
  { articulo: "banana", precio: "1500", medida: "1", unidad: "kg" },
  { articulo: "cebollas", precio: "100", medida: "1", unidad: "unidad" },
  { articulo: "lechuga", precio: "500", medida: "1", unidad: "unidad" },
  { articulo: "papas", precio: "2000", medida: "3", unidad: "kg" },
  { articulo: "pimenton", precio: "500", medida: "1", unidad: "unidad" },
  { articulo: "tomate", precio: "800", medida: "1", unidad: "kg" },
];

app.get("/", (req, res) => {
  res.render("inicio", { datos });
});
