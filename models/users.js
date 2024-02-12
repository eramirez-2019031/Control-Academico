const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la cuenta es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },

    password:{
        type: String,
        require: [true,'El tipo de password es requerido'],
    },

    role:{
        type: String,
        enum: ["TEACHER_ROLE", "USER_ROLE"], //Tipos de roles que se pueden dar a un usuario.
    }

});

module.exports = model("User", UserSchema);