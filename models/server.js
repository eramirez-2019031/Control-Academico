const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
 
 
class Server{
 
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = 'api/usuario';
       
        this.conectarDB();
 
        this.middlewares();
 
        this.routs();
    }
 
    async conectarDB(){
        await dbConnection();
 
    }
 
    middlewares(){
        this.app.use(express.static('public'));  
        this.app.use(cors());
        this.app.use(express.json());
    }
   
    routs(){
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ajecutando y escuchando en el puerto' , this.port);
        });
 
    }
 
}
 
 
module.exports = Server;