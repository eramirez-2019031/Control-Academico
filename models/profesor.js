const { Schema, model} = require('mongoose');

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del profesor es obligatorio']
    },

    correo:{
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },

    password:{
        type: String,
        required: [true,'la contraseña es obligatoria']
    },

    curso: {
        type: String,
        required: [true, 'El curso que imparte el profesor es obligatorio']
    },

    role:{
        type: String,
        require: true,
        enum: ["TEACHER_ROLE"]
    },
    
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model("Profesor", ProfesorSchema);