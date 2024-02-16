const User = require( '../models/user' );
//const Role = require('../models/role');



const existenteCorreo = async (correoU = '') => {
    const existeEmail = await User.findOne({correoU});
    if(existeEmail){
        throw new Error(`El email ${ correoU } ya fue registrado`);
    }
}
const existeUserById = async ( id = '') => {
    const existeUser = await User.findOne({id});
    if(existeUser){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}



module.exports = {
    existenteCorreo,
    existeUserById,
};