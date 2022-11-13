const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    Apellidos: {
        type: String,
        required: [true, 'Los apellidos es obligatoria'],
        
    },
    Nick: {
        type: String,
        required: [true, 'El nick es obligatoria'],
        
    },
    Email: {
        type: String
    },
    Password: {
        type: String,
        required: [true, 'El password es obligatoria']
    },
});



module.exports = model( 'Usuario', UsuarioSchema );