//Importando el paquete jwt
const jwt = require('jsonwebtoken');

//Generando el token
const tokenGenerate = (uid = '' ) => {
    return new Promise((resolve, reject) => {
            
        const payload = {uid};

            jwt.sign(payload,process.env.SECRETORPRIVATEKEY, {
                expiresIn: '4h'
            }, (err, token) => {
                //si existe un error
                if(err){
                    console.log(err);
                    reject('No se pudo generar el jwt');  
                } else{
                    //regresamos el token si todo sale bien
                    resolve(token);
                }

                }
        );

    } )
}


module.exports = tokenGenerate;