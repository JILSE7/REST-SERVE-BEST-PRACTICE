const router = require('express').Router();
//Express Validator
const {check} = require('express-validator');
const { getProducts, getProductById, postProduct, updateProduct, deleteProduct } = require('../controllers/Products');
const { productVerify, productNoExist } = require('../helpers/db-validator');
const { validateToken, validarCategory, validarCampos, adminRole } = require('../middlewares');



router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/',[
    validateToken,
    check('name', 'El nombre del producto no puede ir vacio').notEmpty(),
    check('name').custom(productVerify),
    check('category', 'El campo category no puede ir vacio').notEmpty(),
    validarCategory,
    check('description', 'La descripcion no puede ir vacia').notEmpty(),
    validarCampos
],postProduct);

router.put('/:id',[
    check('id','El id no puede ir vacio').notEmpty(),
    check('id','Id de producto invalido, verifiquelo porfavor').isMongoId(),
    //check('name').custom(productNoExist),
    validarCampos
],updateProduct);

router.delete('/:id',[
    validateToken,
    adminRole,
    check('id', 'Id no valido').isMongoId(),
    validarCampos
],deleteProduct);





module.exports = router;