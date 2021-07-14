const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config')

class Server  {

        constructor(){
            this.app = express();
            this.port = process.env.PORT;
            this.path = {
                users : '/api/users',
                auth: '/api/auth',
                categories : '/api/categories',
                search: '/api/search',
                product: '/api/products'
            }

           /*  this.path = '/api/users';
            this.authPath = '/api/auth'
            this.categoriesPath = '/api/categories' */

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
            this.app.use(this.path.auth, require('../routes/auth'));
            this.app.use(this.path.categories, require('../routes/categories'));
            this.app.use(this.path.search, require('../routes/search'));
            this.app.use(this.path.product, require('../routes/product'));
            this.app.use(this.path.users, require('../routes/user'));

        }

        listen(){
            this.app.listen(this.port, (req, res) => {
                console.log(`> Servidor corriendo en el puerto ${this.port}`);
            })
        }

}

module.exports =  Server;