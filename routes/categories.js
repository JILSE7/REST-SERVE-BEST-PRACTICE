const router = require('express').Router();
//Validaciones
const { check } = require('express-validator');
//Controllers
const { postCategory, getCategorys, getCategoriesById, updateCategory, DeleteCategory } = require('../controllers/Categories');
//MIddlewares
const {validateToken, adminRole} = require('../middlewares');
const { validarCampos } = require('../middlewares');
//Helpers
const {categoryVerify} = require('../helpers/db-validator');

//Nueva Category
router.post('/',[
    validateToken,
    check('name', 'El nombre de la categoria es obligatorio').notEmpty(),
    validarCampos
], postCategory );

//Obtener todas las cartegorias
router.get('/', getCategorys)

//Obtener categoria por id
router.get('/:id',[
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(categoryVerify),
    validarCampos,  
] ,getCategoriesById);

//Actualizar categoria
router.put('/:id', [
    validateToken,
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(categoryVerify),
    check('name', 'El de la categoria no puede venir vacia'),
    validarCampos
],updateCategory);

//Eliminar categoria
router.delete('/:id',[
    validateToken,
    adminRole,
    check('id', 'Id no valido').isMongoId(),
    validarCampos
],DeleteCategory)


module.exports  =router;