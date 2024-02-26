const { Schema, model, Types } = require('mongoose');

const usuarioCursoSchema = Schema ({
    estudiante: {
        type: Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Estudiante obligatorio']
    },
    curso: {
        type: Types.ObjectId,
        ref: 'Curso',
        required: [true, 'Curso obligatorio']
    },
    fecha_inscripcion:{
        type: Date,
        default: Date.now()
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('usuarioCurso', usuarioCursoSchema);