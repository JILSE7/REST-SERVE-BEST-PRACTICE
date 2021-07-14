

//Middlewares
const validaCampos = require('./validar-campos');
const validaJWT = require('./validar-jwt');
const validaRoles = require('./validar-roles');
const validaCategory = require('./validar-category');

module.exports = { //haciendo el spread para todas la funciones que envuelen 
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validaCategory
}