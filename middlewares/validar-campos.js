const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Usuario = require('../models/user')

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    next();
}

const validarUsuarioTeacher = async (req, res, next) => {
    const { maestro } = req.body;
    try {
        const existeUsuario = await Usuario.findById(maestro);

        if (!existeUsuario) {
            return res.status(400).json({
                msg: 'El ID de este usuario no existe'
            });
        }

        if (existeUsuario.rol === "TEACHER_ROL") {
            req.body.rol = "TEACHER_ROL";
            next();
        } else {
            return res.status(400).json({
                msg: 'Un estudiante no tiene permitido modificar cursos o eliminarlos, cambie a "TEACHER_ROL" '
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error del servidor'
        });
    }
};

module.exports = {
    validarCampos,
    validarUsuarioTeacher
}