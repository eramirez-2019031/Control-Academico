const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const User  = require('../models/user');


/*const login = async (req, res) => {
    const { correoU, passwordU} = req.body;

    try{
        // verificar que el correo exista
        const usuario = await Usuario.findOne({ correo });

        console.log(usuario)
        if(!usuario){
            return res.status(400).json({
                msg: 'El correo no está registrado'
            })
        }

        // verificar si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }
        // verificar que la contraseña sea la correcta
        const validPassword = bycriptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Login ok',
            usuario,
            token
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }
}*/

const userPost = async (req, res) =>{
    const { nombreU, passwordU, correoU, Cursos, role} = req.body;
    const user = new User({nombreU, passwordU, correoU, Cursos, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(passwordU, salt);

    await user.save();
    res.status(200).json({
        user
    });
}

const userGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        user
    });
} 

const userPut = async (req, res) => {
    const { id } = req.params;
    const { _id, nombreU, passwordU, correoU, Cursos, ...resto} = req.body;

    await Student.findByIdAndUpdate(id, resto);

    const student = await Student.findOne({_id: id});

    res.status(200).json({
        msg: 'Usuario Actualizado exitosamente',
        student
    })
}

const getUserByid = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}

module.exports = {
    userGet,
    userPut,
    userPost,
    /*login*/
    getUserByid
    
}