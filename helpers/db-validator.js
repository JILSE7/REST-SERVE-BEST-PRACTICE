const { Category, Product } = require('../models');
const Role = require('../models/role');
const User = require('../models/User');

const roleValidate = async (role = " ") => {
    const roleExist = await Role.findOne({role});
    if(!roleExist){
        throw new Error( `El role ${role} no esta registrado en la base de datos`);
    }
};

const emailVerify = async (email) => {    
    const emailExist = await User.findOne({email});
    if(emailExist){
      throw new Error(`El email ${email} ya esta registadro en la base de datos`)
    }
}    

const userVerify = async (id) => {    
    const userExist = await User.findById(id);
    if(!userExist){
      throw new Error(`El usuario con id ${id} no esta registadro en la base de datos`)
    }
};


const categoryVerify = async(id) => {
    const categoryExist =await Category.findById(id);

    if(!categoryExist){
        throw new Error(`La categoria con id ${id} no esta registrada en la base de datos`)
    }
};


const productVerify = async(name) => {
    const productExist = await Product.findOne({name : name[0].toUpperCase()+name.substring(1)});

    if(productExist){
        throw new Error(`Ya existe un producto con este nombre ${name}`)
    }
}


const productNoExist = async(name) => {
    const productExist = await Product.findOne({name : name[0].toUpperCase()+name.substring(1)});

    if(!productExist){
        throw new Error(`No existe ningun producto con este nombre ${name}`)
    }
}


const collectionsValids =(collection = '' , dbValidate = []) => {
    console.log(collection, dbValidate);

    const coleccion = dbValidate.includes(collection);
    if(!coleccion){
        throw new Error(`La coleccion ${collection} no esta incluida, ${dbValidate}`)
    }

    return true;
}


module.exports = {
    roleValidate,
    emailVerify,
    userVerify,
    categoryVerify,
    productVerify,
    productNoExist,
    collectionsValids
}