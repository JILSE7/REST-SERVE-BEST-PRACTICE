const router = require('express').Router();
//Validaciones
const { check } = require('express-validator');

const {validateToken} = require('../middlewares/')

//Controllers
const {login, googleSI} = require('../controllers/Auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/login',[
    check('email', 'Email Invalido').isEmail(),
    check('password', 'La contraseña no puede ir vacia').notEmpty(),
    validarCampos
] ,login);

router.post('/google',[
    check('id_token', 'El id token es necesario').notEmpty(),
    validarCampos
] ,googleSI);   


module.exports  =router;