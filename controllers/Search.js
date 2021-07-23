const {response}  = require('express');
//extrayendo funciones para validar id
const {ObjectId} = require('mongoose').Types;
//modelos
const {User, Category, Product} = require('../models')


const collectionsChidas = [
    'users',
    'categories',
    'products',
    'roles'
]


const searchUser = async(search=  '', res = response ) => {

    const isMongoId = ObjectId.isValid(search); // si es un id de mongo regresa un true

    if( isMongoId){
        const user = await User.findById(search);
        return res.json({
            ok: true,
            results: (user) ?  [user] : []
        })
    }

    //expresion regular
    const regex =  new RegExp(search, 'i' );  // la i indica que no es case sensitive, 
                                                                                 //la busqueda puede ir tanto en mayusculas como minusculas
    const users = await User.find({ //con el or podemos flexibilazar la busqueda a mas campos si la que esta antes no se cumple
        $or: [{name: regex},{email: regex}],
        //$and : [{state:true}] y que cumpla esta condicion, si son false no las trae
    }) // trae todos los que coincidan con el

    res.json({
        ok: true,
        result: {
            total : users.length,
            users
        }
    });


}

const searchCategory = async(search=  '', res = response ) => {

    const isMongoId = ObjectId.isValid(search); // si es un id de mongo regresa un true

    if( isMongoId){
        const category = await Category.findById(search);
        return res.json({
            ok: true,
            results: (category) ?  [category] : []
        })
    }

    //expresion regular
    const regex =  new RegExp(search, 'i' );  // la i indica que no es case sensitive, 
                                                                                 //la busqueda puede ir tanto en mayusculas como minusculas
    const category = await Category.find({ //con el or podemos flexibilazar la busqueda a mas campos si la que esta antes no se cumple
        $or: [{name: regex}],
        //$and : [{state:true}] y que cumpla esta condicion, si son false no las trae
    }) // trae todos los que coincidan con el

    res.json({
        ok: true,
        result: {
            total : category.length,
            category
        }
    });


}


const searchProduct = async(search=  '', res = response ) => {

    const isMongoId = ObjectId.isValid(search); // si es un id de mongo regresa un true
    console.log(search);
    try {
        if( isMongoId){
            const product = await Product.findById(search)
                                                                        
            return res.json({
                ok: true,
                results: (product) ?  [product] : []
            })
        }
    
        //expresion regular
        const regex =  new RegExp(search, 'i' );  // la i indica que no es case sensitive, 
                                                                                     //la busqueda puede ir tanto en mayusculas como minusculas
        const products = await Product.find({ //con el or podemos flexibilazar la busqueda a mas campos si la que esta antes no se cumple
            $or: [{name: regex},],
            //$and : [{state:true}] y que cumpla esta condicion, si son false no las trae
        }) // trae todos los que coincidan con el
        .populate('category', 'name')
    
        res.json({
            ok: true,
            result: {
                total : products.length,
                products
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'productos no encontrados'
        })
    }



}





const search = (req, res = response) => {
    const {collection, search} = req.params;
    
    if(!collectionsChidas.includes(collection)){
        return res.status(400).json({
            ok: false,
            msg: `Las colecciones permitidas son ${collectionsChidas}`
        });
        
    }

        switch (collection) {
           case 'users' : 
            searchUser(search, res);
           break;
           case 'categories':
            searchCategory(search, res);
            break;
            case 'products' :
            searchProduct(search, res);
            break;
            
            default:
                res.status(500).json({
                    ok: false,
                    msg: 'Revise la busqueda'
                })
                break;
        }

}


module.exports = {
    search
}