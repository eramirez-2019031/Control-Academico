const { Schema, model} = require('mongoose');

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del profesor es obligatorio']
    },

    curso: {
        type: String,
        required: [true, 'El curso que imparte el profesor es obligatorio']
    },

    edad: {
        type: Number,
        required: [true, 'la edad es obligatoria']
    },

    especialidad: {
        type: String,
        required: [true, 'la especialidad del maesrtro es obligatoria']
    }

});

module.exports = model("Profesor", ProfesorSchema);