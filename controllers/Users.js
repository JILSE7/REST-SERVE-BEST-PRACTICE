//Manteniendo el intelligence
const {response} = require('express');
//Instancia del modelo
const {User} = require('../models/');
//Bcryptjs
const bcrypt = require('bcryptjs');

const getUsers = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    
    
  /*   const users = await User.find({state: true})
                                                    .limit(limite * 1)
                                                    .skip(desde * 1);
    const total = await User.countDocuments({state: true})
 */
    const   [users, total] = await Promise.all([
        User.find({state: true})
                            .limit(limite * 1)
                             .skip(desde * 1),
        User.countDocuments({state: true})
    ])


        res.json({
            ok: true,
            total,
            users
        })
}

const postUser = async(req, res = response) => {
    try {
        
            const {name, password, email, role} = req.body;
            const usuario = new User ({name, password, email, role});

            //Encriptar la contraseña
            const salt = bcrypt.genSaltSync(); //10 default
            usuario.password = bcrypt.hashSync(password, salt);
            
            await usuario.save();

            res.status(201).json({
                ok: true,
                User: usuario
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al grabar en bd, revise la consola"
        })
    }
    
}
const updateUser = async(req, res = response) => {
        const {id}  = req.params; //Extrayendo el id
        console.log(id);
        //google y id es una propiedad que no se puede actualiza por eso se extrae
        //password es un caso diferente, se extrae y despues se vuelve a generar
        //el correo es otro asunto
        const {_id, password, google,email,  ...rest}  = req.body;

        if(password) {
             //Encriptar la contraseña
             const salt = bcrypt.genSaltSync(); //10 default
             rest.password = bcrypt.hashSync(password, salt);
        };

        const usuario = await User.findByIdAndUpdate(id, rest, {new: true});
        res.status(200).json({
            ok: true,
            usuario
        })
}

const updateUserPatch = (req, res = response) => {
    
    res.json("PATCH")
}


const deleteUser = async(req, res = response) => {
    const {id} = req.params
    //const {uid, userAuntenticated} = req;
    //Borrar Fisicamente
    //const user = await User.findByIdAndDelete(id);

    //Cambiar el estado a false, para no producir conflitos con relaciones
    const user = await User.findByIdAndUpdate(id, {state: false}, {new: true});
    
    res.json({
        ok: true,
        msg: `usuario con id ${id} eliminado`,
    })
}

module.exports = {
    getUsers,
    updateUser,
    updateUserPatch,
    postUser,
    deleteUser
}