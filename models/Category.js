const {Schema, model} = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: String,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,//type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },

});

module.exports = model ('Category', CategorySchema);