

const { response, json } = require('express');
const Curso = require('../models/cursos');
const Usuario = require('../models/user');
const usuarioHasCurso = require('../models/usuarios-curso');

const cursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const getCursoByid = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findOne({ _id: id });
    res.status(200).json({
        curso
    });
}

const cursoPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    const curso = await Curso.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg: 'El Curso fue actualizado correctamente'
    })
}

const cursoDelete = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findByIdAndUpdate(id, { estado: false });
    await usuarioHasCurso.updateMany({ curso: id }, { estado: false });
    res.status(200).json({
        msg_1: 'El curso fue eliminado exitosamente:',
        msg_2: curso.nombre
    });
}

const cursoPost = async (req, res) => {
    const { nombre, clase, maestro } = req.body;

    const Maestro = await Usuario.findOne({ email: maestro });
    if (!Maestro) {
        res.status(400).json({
            msg: 'no existe el maestro asignado'
        })
    }
    if (Maestro.rol !== "TEACHER_ROL") {
        return res.status(400).json({
            msg: 'Un estudiante no puede crear cursos'
        });
    }
    const curso = new Curso({ nombre, clase, maestro });
    await curso.save();
    res.status(200).json({
        curso
    });
}

module.exports = {
    cursoDelete,
    cursoPost,
    cursoGet,
    getCursoByid,
    cursoPut
}