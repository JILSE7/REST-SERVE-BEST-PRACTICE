const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name : {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email : {
        type: String,
        required : [true, 'El correo es obligatorio'],
        unique: true
    },
    password : {
        type: String,
        required : [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true //cuando se crea un usuario por defecto estara activado
    },
    role: {
        type: String,
        required: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Quitando __v & password
UserSchema.methods.toJSON = function ( ) {
    const {__v , password,_id, ...user } = this.toObject();
    user.uid = _id;
    return user;    
}


module.exports = model('User',UserSchema)