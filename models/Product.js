const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    name : {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
 
    state: {
        type: Boolean,
        default: true //cuando se crea un usuario por defecto estara activado
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    category : {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description : {
        type: String,
    },
    available : {
        type: Boolean,
        default: true
    }
    
});

//Quitando __v & renombrando id
ProductSchema.methods.toJSON = function ( ) {
    const {__v ,_id, ...product } = this.toObject();
    product.id = _id;
    return product;    
}


module.exports = model('Product',ProductSchema)