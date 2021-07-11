const router = require('express').Router();
//Validaciones
const { check } = require('express-validator');

//Controllers
const {login} = require('../controllers/Auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/login',[
    check('email', 'Email Invalido').isEmail(),
    check('password', 'La contraseña no puede ir vacia').notEmpty(),
    validarCampos
] ,login);



module.exports  =router;