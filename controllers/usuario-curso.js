const { response, json } = require('express');
const usuarioCurso = require('../models/usuarios-curso');
const Usuario = require('../models/user');
const Curso = require('../models/cursos');

const usuarioCursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, usuarioCursos] = await Promise.all([
        usuarioCurso.countDocuments(query),
        usuarioCurso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        usuarioCursos
    });
}

const getUsuarioCursoByid = async (req, res) => {
    const { email } = req.body;
    try {
        const estudiante = await Usuario.findOne({ email });
        const cursosInscritos = await usuarioCurso.find({ estudiante: estudiante.id, estado: true }).populate('curso');
        if (cursosInscritos.length === 0) {
            return res.status(400).json({ msg: 'El estudiante no esta asignado a cursos' });
        }
        const listaCursos = cursosInscritos.map(curso => ({
            nombre: curso.curso.nombre,
            fecha_inscripcion: curso.fecha_inscripcion
        }));
        res.status(200).json({ 
            cursos: listaCursos 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
}

const usuarioCursoDelete = async (req, res) => {
    const { id } = req.params;
    const usuarioCursos = await usuarioCurso.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        msg: 'Estudiante eliminado del curso exitosamente'
    });
}

const usuarioCursoPost = async (req, res) => {
    const { email, materia } = req.body;
    const Estudiante = await Usuario.findOne({ email });
    const estudiante = Estudiante.id;
    const Cursoo = await Curso.findOne({ nombre: materia });
    if(!Cursoo){
        return res.status(400).json({
            msg:
                'El curso no existe'
        });
    }
    
    const curso = Cursoo.id;



    try {
        const cantidadCursosInscritos = await usuarioCurso.countDocuments({ estudiante });

        if (cantidadCursosInscritos >= 3) {
            return res.status(400).json({
                msg: 'El estudiante ya está inscrito en 3 cursos, el límite es de 3 cursos.'
            });
        }

        const existeAsignacion = await usuarioCurso.findOne({ estudiante, curso });

        if (existeAsignacion) {
            return res.status(400).json({
                msg:
                    'El estudiante ya está en este curso'
            });
        }

        const usuarioCursos = new usuarioCurso({
            estudiante: estudiante,
            curso: curso
        });

        await usuarioCursos.save();

        res.status(200).json({
            estudiante: Estudiante.nombre,
            email_estudiante: email,
            curso: materia,
            fecha_inscripcion: usuarioCursos.fecha_inscripcion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg:
                'Error del servidor'
        });
    }
};




module.exports = {
    usuarioCursoDelete,
    usuarioCursoPost,
    usuarioCursoGet,
    getUsuarioCursoByid
}
