const { Schema, model} = require('mongoose');

const CursoSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    clase: {
        type: String,
        required: true,
        enum: ["Informatica", "Sociales", "TAC", "Mate", "No Curso"],
        default: "No Curso"
    },
    estado:{
        type: Boolean,
        default: true
    },
    maestro:{
        type: String,
        required: [true, 'El maestro obligatorio']
    }
});

module.exports = model('Curso', CursoSchema);