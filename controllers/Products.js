const {response} = require('express');
//Modelo Product
const {Product} = require('../models')



//getProducts
const getProducts = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    try {
        const   [products, total] = await Promise.all([
            Product.find({state: true})
                                .limit(limite * 1)
                                 .skip(desde * 1)
                                 .populate('category', 'name'),
            Product.countDocuments({state: true})
        ])
    
    
            res.json({
                ok: true,
                total,
                products
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : 'Error al traer los productos, comuniquese con el administrador'
        });
    };    
    
  
}
const getProductById = (req, res = response) => {

}
const postProduct = async(req, res = response) => {
    //Extrayendo los datos necesarios de la peticion
    const {name,description, price} = req.body;
    const categoryId = req.categoryId;
    const user = req.uid;

    
    const newProduc = {
        name :  name[0].toUpperCase()+name.substring(1),
        user,
        category: categoryId,
        price,
        description,
    };

    try {
        const product = new Product(newProduc);
        await product.save()

        res.status(201).json({
            ok: true,
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar producto en la base, intentelo de nuevo'
        });
    }
    
}
const updateProduct =async (req, res = response) => {
    const {id} = req.params
    const { user, state, ...product}  = req.body;
    try {
        const productUpdate = await Product.findByIdAndUpdate(id, {...product}, {new: true});

        res.status(200).json({
            ok: true,
            productUpdate
        })
        
    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error al actualizar el producto, intentelo de nuevo'
            })
    }


    


}
const deleteProduct = async(req, res = response) => {
    
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndUpdate((id), {state: false}, {new: true});
        if(!product){
            return res.status(400).json({
                ok: false,
                msg: `Este producto no esta registrado en la base de datos`
            })
        }
        res.json({
            ok: true,
            msg: `El producto ${product.name} ha sido eliminado`
        });
    } catch (error) {

        console.log(error);
        res.json({
            ok: false,
            msg: `El producto no ha podido ser eliminado, verifique el id`
        });
    };
};

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}