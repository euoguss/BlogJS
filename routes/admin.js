const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categorie");
const Categorie = mongoose.model("categories");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("Gereciamento de publicações");
});

router.get("/categories", (req, res) => {
  res.render("admin/categories");
});

router.get("/categories/add", (req, res) => {
  res.render("admin/addcategories");
});

router.post("/categories/new", (req, res) => {
  const newCategorie = {
    name: req.body.name,
    slug: req.body.slug,
  };

  new Categorie(newCategorie)
    .save()
    .then(() => {
      console.log("Categoria Salva!");
      res.redirect("/admin/categories");
    })
    .catch((err) => {
      console.log("Erro ao criar categoria");
    });
});

module.exports = router;
