const db = require("../models/db");
const { response, request } = require("express");
const Usuario = require("../models/usuarios");

//Recoge todas las cervezas
async function getUsers(req, res) {
  const { Nombre } = req.query; //Solo voy a recoger estos parámetros para filtrar
  const query = { Nombre };
  for (const key in query) {
    if (query[key] === undefined) {
      delete query[key];
    }
  }
  // res.json(db.cervezas.find(query))
  const users = await Usuario.find(query);
  res.json(users);
}

async function getUser(req = request, res = response) {
  const nickUser = req.params.Nick; //Recoge su id de la request
  const user = await Usuario.find({ Nick: nickUser }); //Se utiliza el find para buscar la beer con ese id
  if (user.length) {
    //Si encuentra la devuelve
    res.json(user);
  } else {
    res.json({ message: `El usuario ${nickUser} no existe` });
  }
}

async function addUser(req = request, res = response) {
  const { Nombre, Apellidos, Nick, Email, Password } = req.body; //Fija los parámetros que va a recoger
  //Necesita todos los que se establezcan en el models/usuarios como required
  if (Password.length < 3 || Password.length > 20) {
    res.json({ message: "El password no cumple la longitud (3-20)" });
  } else if (Email.indexOf("@") == -1) {
    res.json({ message: "No es un email valido" });
  }
  const user = new Usuario({ Nombre, Apellidos, Nick, Email, Password }); //Crea el objeto

  // Guardar en BD
  await user.save(); //La guarda en bd

  res.json({
    user,
  });
}

async function deleteUser(req = request, res = response) {
  const userNick = req.params.Nick; //Saca el id de la request
  const removed = await Usuario.remove({ Nick: userNick }); //Guarda la beer con ese id
  res.json(removed); //Borra
}

async function editUser(req = request, res = response) {
  const nickUser = req.params.Nick; //Saca el id
  const user = req.body; //Recoge el body de la request
  const updatedBeer = await Usuario.update({ Nick: nickUser }, user); //Guarda la beer con ese id con el body recogido

  res.json(updatedBeer); //Updatea
}

//Exporta los métodos para que se puedan usar fuera
module.exports = { addUser, getUsers,getUser,deleteUser,editUser };
