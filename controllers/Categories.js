const {response} = require('express');
const { Category } = require('../models');


const postCategory = async(req, res= response) => {
        const name = req.body.name.toUpperCase();
        const CategoryDB = await Category.findOne({name});

        //Verificar si la categoria existe en DB
        if(CategoryDB){
            return res.status(400).json({
                ok: false,
                msg: `La category ${CategoryDB.name} ya existe en la base de datos`
            });
        };

        //Generar Data a guardar 
        const dataCategory = { //nombre, state = default true desde modelo, user
            name,
            user: req.uid
        }

        //Nueva Instancia
        const newCategory = new Category(dataCategory);
        //Guardar DB
        await newCategory.save()
        

        res.status(201).json({
            ok: true,
            msg: 'todo chidito',
            newCategory
        })
};


const getCategorys = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
        try {
            //ArrayPromises
            const   [categories, total] = await Promise.all([
                Category.find({state: true})
                                    .limit(limite * 1)
                                    .skip(desde * 1)
                                    .populate('user'),
                Category.countDocuments({state: true})
            ]);
                res.json({
                    ok: true,
                    total,
                    categories
                })
        
    } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error al traer categorys,  intentelo de nuevo o comuniquese con el administrador'
            });
    }
};


const getCategoriesById = async(req, res = response) => {
    const {id} = req.params;
    try {
        const category = await Category.findById(id)
                                                                    .populate('user')    

        res.json({
            ok: true, 
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al tratar de obtener category por id, verifique el id o comuniquese con el administrador'
        })
    }
};


const updateCategory = async(req, res = response) => {
    const {id} = req.params;
    const {name, state, user } = req.body; //extraemos user porque ese campo no se podra actualizar
    //state lo ponemos en algun caso extremo de que alguien quiera volver a retomar esta categori
    let updateCategory;
    try {
        if(state){

            updateCategory = await Category.findByIdAndUpdate(id, {state: true}, {new: true})    
        }else{
            
            updateCategory = await Category.findByIdAndUpdate(id, {name: name.toUpperCase()}, {new: true})
        }
        res.status(200).json({
            ok: true,
            updateCategory
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
                ok: false,
                msg: 'Error al actualizar, intentelo de nuevo o comuniquese con el adminsitrador'
        });
    };
    
};

const DeleteCategory = async(req, res = response) => {
    const {id} = req. params;

    try {
         const category = await Category.findByIdAndUpdate(id, {state: false});

         res.json({
             ok: true,
             msg: `La categoria ${category.name} ha sido eliminada de la base de datos`
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la categoria, intentelo de nuevo o comuniquese con el adminsitrador'
    });
    }

    


}

module.exports = {
    postCategory,
    getCategorys,
    getCategoriesById,
    updateCategory,
    updateCategory,
    DeleteCategory
}