const {response}  = require('express');
const adminRole = (req, res = response, next) => {

    if(!req.userAuntenticated){
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    };

    const {role,  name}  = req.userAuntenticated; 

    if(role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            msg: `EL usuario ${name} no tiene permisos como administrador`
        });
    }

    next();

};  

const  haveRole = (...roles) => {
    return (req, res, next) => {
        console.log(roles, req.userAuntenticated.role);

        if(!req.userAuntenticated){
            return res.status(500).json({
                ok: false,
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        };

        if(!roles.includes(req.userAuntenticated.role)){
            return res.status(401).json({
                ok: false,
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

            next();
    }

}

module.exports = {
    adminRole,
    haveRole
};