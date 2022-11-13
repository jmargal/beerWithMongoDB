const db = require("../models/db");
const { response, request } = require("express");
const bares = require("../models/bares");


//Recoge todos las bares
async function getBares(req, res) {
  const { Nombre, Dirección } = req.query; //Solo voy a recoger estos parámetros para filtrar
  const query = { Nombre, Dirección };
  for (const key in query) {
    if (query[key] === undefined) {
      delete query[key];
    }
  }
  const bar = await bares.find(query);
  res.json(bar);
}

async function getBar(req = request, res = response) {
  const nombre = req.params.Nombre; //Recoge su nombre de la request
  const bar = await bares.find({ Nombre: nombre }); //Se utiliza el find para buscar el bar con ese id
  if (bar.length) {
    //Si encuentra la devuelve
    res.json(bar);
  } else {
    res.json({ message: `El bar ${nombre} no existe` });
  }
}

async function addBar(req = request, res = response) {
  const { Nombre, Dirección, Licencia, Puntuación } = req.body; //Fija los parámetros que va a recoger
  //Necesita todos los que se establezcan en el models/bares como required
  const bar = new bares({ Nombre, Dirección, Licencia, Puntuación }); //Crea el objeto

  // Guardar en BD
  await bar.save(); //La guarda en bd

  res.json({
    bar,
  });
}

async function deleteBar(req = request, res = response) {
    const barNom = req.params.Nombre;   //Saca el id de la request
    const removed = await bares.remove({ Nombre: barNom });    //Guarda la beer con ese id
    res.json(removed);  //Borra
}


async function editBar(req,res){
    const barNom = req.params.Nombre;   //Saca el id
    const bar = req.body;  //Recoge el body de la request
    const updatedBar =await bares.updateOne({ Nombre: barNom }, bar);  //Guarda el bar con ese id con el body recogido
    res.json(updatedBar);  //Updatea
}

//Exporta los métodos para que se puedan usar fuera
module.exports = { addBar, getBares, getBar,deleteBar,editBar };
