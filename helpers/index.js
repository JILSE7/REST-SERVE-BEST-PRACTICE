const dbValidator = require('./db-validator');
const generarJWT = require('./tokenGenerate');
const googleVerify = require('./googleToken-verify');
const  uploadFile = require('./uploadFile');


module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...uploadFile
}
