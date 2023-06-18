const express = require ('express');
const router = express.Router();
const Cod = require ('../models/codi.js');
const mongoose = require ('mongoose')

router.get('/', (req, res, next) =>
{
        res.render('home');
});

router.get("/db", async (req, res) =>
{
    const data = await Cod.find();
    
    res.render("dbs", {data});
});

router.post("/dbs/submit", async (req, res) =>
{   
    const cods = new Cod(req.body);
    await cods.save();
    res.redirect("/db");
});

router.get("/db/edit/:id", async (req, res) =>
{
    const {id} = req.params;
    const data = await Cod.findById(id);
    res.render("edit", {data});
});

router.get("/db/delete/:id", async (req, res) =>
{
    const {id} = req.params;
    const data = await Cod.deleteOne({_id: id});
    res.redirect("/db");
});

router.post('/db/submit', (req, res) => {
    const bd1 = req.body.db1; 
    const URI ='mongodb+srv://' + bd1 +
      ':HHnOQn2B4iVtEdOU@cluster0.pgfsbij.mongodb.net/shpro?retryWrites=true&w=majority';
      console.log(bd1)
      mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(() => {
          console.log("Conexión exitosa a la base de datos");
        })
        .catch(error => {
          console.log("Error al conectar a la base de datos:", error);
        });
        res.redirect("/db");
    
  });

  router.post("/db/update/:id", async (req, res) =>
{
    const {id} = req.params;
    await Cod.updateOne({_id: id}, req.body);
    res.redirect("/db");
});

module.exports = router