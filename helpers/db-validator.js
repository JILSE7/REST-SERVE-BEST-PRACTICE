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
}    


module.exports = {
    roleValidate,
    emailVerify,
    userVerify
}