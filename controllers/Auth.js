const {response} = require('express');
//Modelo User
const User = require('../models/User');
//bcryptjs
const bcrypt = require('bcryptjs');
//Generador de tokens
const tokenGenerate = require('../helpers/tokenGenerate');
const { googleTokenVerify } = require('../helpers/googleToken-verify');

//Login de usuario
const login = async(req, res = response) => {

    const {email, password}  = req.body; //extrayendo la info de la peticion
    try {

            //1.- Verificar si el email existe
            const user = await User.findOne({email});
            if(!user) return res.status(400).json({
                ok: false,
                msg: 'Email no registrado en la base de datos, verifiquelo porfavor'
            });

            //2.- Verificar si el usuario esta activi
            if(!user.state) return res.status(400).json({
                ok: false,
                msg: 'Este usuario no esta activo en la base de datos, acerquese con la administracion'
            });

            //3.- Verificar la contraseña
            const validatePass = bcrypt.compareSync(password, user.password) //Comparando la contraseña con la del usuario;
            if(!validatePass) return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta, verifiquela porfavor'
            })
            //4-. Generar el JWT
            const token = await tokenGenerate(user._id);

    
        res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}


const googleSI = async (req, res= response) => {
    
    const id_token = req.header('x-token')

    try {
        const payload= await googleTokenVerify(id_token);
        const {name, picture , email}  = payload;

        let user = await User.findOne({email});

        if(!user){
            //si no existe en db lo creamos
            const data = {
                name,
                email,
                password : ':p',
                img : picture ,
                google: true
            }
            user = new User(data);
            await user.save();
        }

        if(!user.state){ //si esl usuario esta "borrado" => state false
            return res.status(401).json({
                ok: false,
                msg: 'Hable con el administrador, Usuario bloqueado'
            })
        }

          //Generar el JWT
          const token = await tokenGenerate(user._id);
     
        res.json({
            ok: true,
            msg: 'Todo chidito',
            token,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: 'Token no reconocido por google'
        })
    }
}




module.exports  = {
    login,
    googleSI
}