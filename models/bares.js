const { Schema, model } = require('mongoose');

const BaresSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    Dirección: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        
    },
    Licencia: {
        type: Number,
        required: [true, 'La licencia es obligatoria'],
    },
    Puntuación: {
        type: Number,
    }
});



module.exports = model( 'Bares', BaresSchema );