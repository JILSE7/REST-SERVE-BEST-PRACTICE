//Conexion a la base de datos con mongoose
const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('> Database Online :D');
    } catch (error) {
        //Error que se dispara
        console.log(error);
        //Error mostrado en la base de datos por nosotros
        throw new Error('Error al conectar a la base de datos');
    }


}


module.exports = {
    dbConection
};