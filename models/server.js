const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config')

class Server  {

        constructor(){
            this.app = express();
            this.port = process.env.PORT;
            this.path = '/api/users';
            this.authPath = '/api/auth'

            //conexion con mongo
            this.database();

            //middlewares
            this.middleware();

            //rutas de mi app
            this.routes();

        }

        async database(){
            await dbConection();
        }


        middleware(){
            //Cors
            this.app.use(cors());
            //Parseo del body
            this.app.use(express.json());

            //Directorio publico
            this.app.use(express.static('public'))
        }

        routes(){
            this.app.use(this.authPath, require('../routes/auth'));
            this.app.use(this.path, require('../routes/user'));
        }

        listen(){
            this.app.listen(this.port, (req, res) => {
                console.log(`> Servidor corriendo en el puerto ${this.port}`);
            })
        }

}

module.exports =  Server;