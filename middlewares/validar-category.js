const {response}  = require('express');
const { Category } = require('../models');


const validarCategory =async (req, res = response, next) =>  {

    const {category} = req.body
    
    try {
        const categoryValidate = await Category.findOne({name: category.toUpperCase()})
        
        if(!categoryValidate){
            return res.status(400).json({
                ok:false,
                msg: 'La categoria no esta registrada en la base datos'
            });
        }
        req.categoryId = categoryValidate._id;

    } catch (error) {
        console.log('error');
        res.status(500).json({
            ok: false,
            msg: 'Error al validar la categoria'
        })
    }


    next();

};





module.exports = {
    validarCategory
}