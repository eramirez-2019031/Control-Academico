const { Schema, model} = require('mongoose');

const CursosSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    profesor: {
        type: String,
        required: [true, 'El profesor es obligatorio']
    },
    
}); 

module.exports = model('curso', CursosSchema);