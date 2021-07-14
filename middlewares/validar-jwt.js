//Importando jwt
const jwt = require('jsonwebtoken');
const {response}  = require('express');

//Model user
const User = require('../models/User');


const validateToken = async(req, res = response, next) => {

    const token = req.header('x-token'); //extrayendo el token de la peticion

    //Verificar si viene el token
    if(!token) return res.status(401).json({
        ok: false,
        msg: 'No hay token en la peticion'
    })

    try {
        //Verifica el token, si exites se va al next y si no se salta al catch
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.uid = uid; //creando el uid en la peticion para posteriormente ocuparlo

        const userAuntenticated = await User.findById(uid);

        if(!userAuntenticated){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido - Usuario inexistente'
            });
        } 


        if(!userAuntenticated.state){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido - Usuario Inactivo'
            });
        }

        console.log('token validation',userAuntenticated, uid);
        req.userAuntenticated = userAuntenticated;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        })
    }

}


module.exports = {validateToken}