const path = require('path');
//uuid
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, extensionesValidas =  ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        //Extrayendo el archivp
           const {archivo} = files;
           const nombreCortado = archivo.name.split('.')
           const extension  =nombreCortado[nombreCortado.length- 1];
           //console.log(archivo.name.includes('.pdf'));    
       
           //validar extensiones
           if(!extensionesValidas.includes(extension)){
                return reject(`Archivo no valido ${extension} no permitida, solo se permite ${extensionesValidas} `)  
           };
       
           
           const nombreTem = uuidv4() + '.' + extension;
           //Construccion del path
           const uploadPath = path.join(__dirname ,'../uploads/',carpeta , nombreTem);
           
           archivo.mv(uploadPath, (err) =>  {
             if (err) {
               reject(err);
             }
           
             resolve(uploadPath)
           });

    });


};


module.exports = {
    uploadFile
}