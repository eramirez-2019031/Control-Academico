const { Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del alumno es obligatorio']
    },

    grado: {
        type: String,
        required: [true, 'El Grado debe ser obligatorio']
    },

    seccion: {
        type: String,
        required: [true, 'la seccion del alumno es obligatoria']
    },

    curso: {
        type: String,
        required: [true, 'el curso es obligatorio']
    },

    

});

module.exports = model("Alumno", AlumnoSchema);