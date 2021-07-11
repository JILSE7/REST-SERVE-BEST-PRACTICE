const router = require('express').Router();
//Validaciones
const { check } = require('express-validator');


const {
getUsers,
updateUserPatch,
updateUser,
deleteUser,
postUser
} = require('../controllers/Users');
const { roleValidate, emailVerify, userVerify } = require('../helpers/db-validator');

/* //Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const validateToken = require('../middlewares/validar-jwt');
const {adminRole, haveRole} = require('../middlewares/validar-roles'); */
const {
    validarCampos, 
    validateToken,
    haveRole
} = require('../middlewares')

//Obtner users
router.get('/', getUsers)

//Agregar uSER
router.post('/',[

    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'Porfavor, ingresa un email valido').isEmail(),
    check('email').custom(emailVerify),
    check('password', 'La contraseña debe de ser de al menos 6 caracteres').isLength({min: 6}),
    //check('role', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(roleValidate), // < esto es igual a esto>  check('role').custom((role)  => roleValidate(role)),
    validarCampos

] ,postUser)

//Actualizar user
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userVerify),
    check('role').custom(roleValidate), // < esto es igual a esto>  check('role').custom((role)  => roleValidate(role)),
    validarCampos
],updateUser)

//Eliminar user
router.delete('/:id', [
    validateToken,
    //adminRole, fuerza a que el usuario sea admin
    haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userVerify),
    validarCampos
],deleteUser)



router.patch('/', updateUserPatch)

module.exports = router;