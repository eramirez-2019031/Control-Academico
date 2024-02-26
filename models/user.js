const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email obligatorio']
    },
    contra: {
        type: String,
        required: [true, 'la contraseña obligatoria']
    },
    rol:{
        type: String,
        required: true,
        enum: ["STUDENT_ROL", "TEACHER_ROL"],
        default: "STUDENT_ROL"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, contra, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);