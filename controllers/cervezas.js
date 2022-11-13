const db = require('../models/db')
const { response, request } = require('express');
const Cerveza = require('../models/cerveza');

//Recoge todas las cervezas
async function getBeers(req, res) {
    const {Nombre, Envase} = req.query //Solo voy a recoger estos parámetros para filtrar
    const query = {Nombre, Envase}
    for (const key in query) {
        if (query[key] === undefined) {
          delete query[key];
        }
      }
    // res.json(db.cervezas.find(query))
    const cervezas = await Cerveza.find(query)
    res.json(cervezas)
}

function getBeer(req = request, res = response) {
    const id = req.params.id    //Recoge su id de la request
    const beers = db.cervezas.find({ _id: id });    //Se utiliza el find para buscar la beer con ese id
    if (beers.length) {     //Si encuentra la devuelve
        res.json(beers);
    } else {
        res.json({ message: `La cerveza ${id} no existe` })
    }

}

async function addBeer(req = request, res = response) {
    // const beer = req.body
    // const inserted = db.cervezas.save(beer)
    // res.json(inserted)
    const { Nombre, Descripción, Graduación, Envase, Precio } = req.body;   //Fija los parámetros que va a recoger
    //Necesita todos los que se establezcan en el models/cerveza como required
    const cerveza = new Cerveza({ Nombre, Descripción, Graduación, Envase, Precio });   //Crea el objeto


    // Guardar en BD
    await cerveza.save();   //La guarda en bd

    res.json({
        cerveza
    });
}

function deleteBeer(req = request, res = response) {
    const beerId = req.params.id;   //Saca el id de la request
    const removed = db.cervezas.remove({ _id: beerId });    //Guarda la beer con ese id
    res.json(removed);  //Borra
}

function editBeer(req = request, res = response) {
    const beerId = req.params.id;   //Saca el id
    const beer = req.body;  //Recoge el body de la request
    const updatedBeer = db.cervezas.update({ _id: beerId }, beer);  //Guarda la beer con ese id con el body recogido

    res.json(updatedBeer);  //Updatea
}

//Exporta los métodos para que se puedan usar fuera
module.exports = { getBeers, getBeer, addBeer, deleteBeer, editBeer }