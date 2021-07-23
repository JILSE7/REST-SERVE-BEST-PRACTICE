const {response} = require('express');
const path = require('path');
const fs = require('fs');
const { uploadFile } = require('../helpers');
const {User, Product} = require('../models/index')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const loadFiles = async(req, res= response) => {

   

    try {
      //const pathCompleto = await uploadFile(req.files, ['txt', 'md'], 'textos');
      const pathCompleto = await uploadFile(req.files, undefined, 'imgs');
  
        res.json({
          path: pathCompleto
        })
    
      
    } catch (error) {
        console.log(error);
        res.status(400).json({
          ok:false,
          msg: error
        })
    }

};


const updateImage = async (req, res = response) => {

  const {id, collection} = req.params
  let modelo;
  switch (collection) {
    case 'users': 
          modelo = await User.findById(id);
          if(!modelo){
            return res.status(400).json({
              ok: false,
              msg: `No existe un usuario con este id, ${id}`
            });
          };
      break;
    case 'products':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          ok: false,
          msg: `No existe un producto con este id, ${id}`
        });
      };
        break;
  
    default:
    return res.status(500).json({
      ok:false,
      msg: 'Se me olvido validar esto'
    })
  }
  
  //LImpiar imagenes del servidor
  if(modelo.img){
    console.log(true);
    //Hay que borrar la imagen del servidor
    const pathImagen = path.resolve(__dirname, '../uploads', collection, modelo.img);
    console.log(pathImagen);
    if(fs.existsSync(pathImagen)){
          fs.unlinkSync(pathImagen); //Borrando el archivo
    }
  }
  const imagen = await uploadFile(req.files, undefined, collection);
  //igualando la propiedad con el path
  modelo.img = imagen;

  //guardando en db
  await modelo.save()

  res.json(modelo);
}


const mostrarImagen = async(req, res = response) => {

  const {id, collection} = req.params
  let modelo;
  switch (collection) {
    case 'users': 
          modelo = await User.findById(id);
          if(!modelo){
            return res.status(400).json({
              ok: false,
              msg: `No existe un usuario con este id, ${id}`
            });
          };
      break;
    case 'products':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          ok: false,
          msg: `No existe un producto con este id, ${id}`
        });
      };
        break;
  
    default:
    return res.status(500).json({
      ok:false,
      msg: 'Se me olvido validar esto'
    })
  }
  
  //LImpiar imagenes del servidor
  if(modelo.img){
    console.log(true);
    //Hay que borrar la imagen del servidor
    const pathImagen = path.resolve(__dirname, '../uploads', collection, modelo.img);
    console.log(pathImagen);
    if(fs.existsSync(pathImagen)){
          return res.sendFile(pathImagen)
    }
  }
  const pathImagen = path.resolve(__dirname, '../assets/no-image.jpg');
  return res.sendFile(pathImagen);

}

const updateImageCloudinary = async (req, res = response) => {

  const {id, collection} = req.params
  let modelo;
  switch (collection) {
    case 'users': 
          modelo = await User.findById(id);
          if(!modelo){
            return res.status(400).json({
              ok: false,
              msg: `No existe un usuario con este id, ${id}`
            });
          };
      break;
    case 'products':
      modelo = await Product.findById(id);
      if(!modelo){
        return res.status(400).json({
          ok: false,
          msg: `No existe un producto con este id, ${id}`
        });
      };
        break;
  
    default:
    return res.status(500).json({
      ok:false,
      msg: 'Se me olvido validar esto'
    })
  }
  
  //LImpiar imagenes de cloudinary
  if(modelo.img){
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [idIMage] = nombre.split('.');

     cloudinary.uploader.destroy(idIMage);

  }

  
  const {tempFilePath} = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

  //igualando la propiedad con el path
  modelo.img = secure_url;

  //guardando en db
  await modelo.save()

  res.json(modelo);
}



module.exports = {
    loadFiles,
    updateImage,
    mostrarImagen,
    updateImageCloudinary
}