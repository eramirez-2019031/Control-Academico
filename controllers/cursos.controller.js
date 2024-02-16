const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Cursos  = require('../models/cursos');


const cursosGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, curso] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        curso
    });
} 

const getCursoByid = async (req, res) => {
    const { id } = req.params;
    const curso = await curso.findOne({_id: id});

    res.status(200).json({
        curso
    });
}

const cursoPost = async (req, res) =>{
    const { nombre, profesor } = req.body;
    const curso = new Cursos({ nombre, profesor });
    await curso.save();
    res.status(200).json({
        curso
    });
}



module.exports = {
    cursoPost,
    cursosGet,
    getCursoByid
}