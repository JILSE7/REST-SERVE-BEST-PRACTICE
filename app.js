//dotenv
require('dotenv').config();
//Clase server
const Server = require('./models/server');
//Instancia 
const server = new Server();



server.listen();