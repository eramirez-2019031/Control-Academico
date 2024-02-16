const { Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del alumno es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },

    password:{
        type: String,
        require: [true, 'la  contraseña es obligatoria']
    },

    role:{
        type: String,
        requier: true,
        enum: ["STUDENT_ROLE"]
    },

    curso: {
        type: String,
        required: [true, 'el curso es obligatorio']
    },

    estado:{
        type: Boolean,
        default: true
    }

    

});

module.exports = model("Alumno", AlumnoSchema);