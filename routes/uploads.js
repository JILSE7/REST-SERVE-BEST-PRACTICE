const router = require('express').Router();
//Validaciones
const { check } = require('express-validator');
const {validateToken, validarCampos, validateFile} = require('../middlewares/');
//Controllers
const { loadFiles, updateImage, mostrarImagen, updateImageCloudinary } = require('../controllers/Uploads');
const { collectionsValids } = require('../helpers');

router.get('/:collection/:id',[
    check('id', 'Id invalido, verifique porfavor').isMongoId(),
    check('collection').custom(c => collectionsValids(c, ['users', 'products'])),
    validarCampos
], mostrarImagen)


router.post('/', [
    validateFile,
], loadFiles);

//actualizar imgs de colleciones
/* router.put('/:collection/:id',[
    check('id', 'Id invalido, verifique porfavor').isMongoId(),
    check('collection').custom(c => collectionsValids(c, ['users', 'products'])),
    validateFile,
    validarCampos
], updateImage); */

router.put('/:collection/:id',[
    check('id', 'Id invalido, verifique porfavor').isMongoId(),
    check('collection').custom(c => collectionsValids(c, ['users', 'products'])),
    validateFile,
    validarCampos
], updateImageCloudinary);






module.exports  =router;