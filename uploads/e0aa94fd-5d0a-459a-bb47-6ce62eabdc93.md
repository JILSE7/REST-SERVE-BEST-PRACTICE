# PLCS (Places)

El proyecto consta de una plataforma donde los usuarios pueden encontrar nuevos lugares en distintas ubicaciones del mundo. Cada usuario puede publicar, compartir e interactuar con las publicaciones de la plataforma.

![plcs](./src/assets/Hero_oneslide.png)

## PLCS en **GitHub Pages**
Entra en el siguiente link para interactuar con la aplicación de PLCS

https://github.com/JILSE7/Project-Place

## Usuarios de PLCS 👱🏻‍♀️👱🏻‍♂️
En PLCS, los usuarios pueden hacer varias acciones:
1. Registrarse a la plataforma
2. Iniciar sesión
3. Suscribirse al newsletter
4. Publicar un "PLC" (un lugar que haya visitado)
5. Dar like, compartir y comentar las publicaciones
6. Ver su perfil de usuario

## Comenzando 🚀

Mira **Deployment** para conocer como desplegar el proyecto.

### Pre-requisitos 📋
```
1. Tener instalado un navegador como Google Chrome o Firefox
2. Tener una aplicación para hacer solicitudes HTTP como Insomnia o Postman
```

## Instalación 🔧

Sigue los siguiente pasos para obtener una copia del proyecto y ejecutarla en entorno de desarrollo

* Clona el repositorio desde la linea de comandos o descargando el ZIP
```
$ git clone https://github.com/JILSE7/Project-Place
```
* Instala los paquetes que necesita el proyecto
```
$ npm install
```
* Ejecuta el comando para correr la aplicación en modo desarrollo:
```
$ npm start
```
* Abre otra terminal y dirígete a la carpeta database:
```
$ cd database
```
* Ejecuta los paquetes que utiliza la fake-api:
```
$ npm install
```
* Ejecuta el comando para correr la fake-api y pueda consumirlo la aplicación:
```
$ npm start
```


## Despliegue 📦

Create-React-App tiene configurado un comando para realizar un deploy de la aplicación, creando una carpeta dentro del proyecto llamada **dist**.

Para hacer el deploy, sigue los siguientes pasos:

1. En la terminal de comando ejecuta la siguiente linea:
```
$ npm run build
```
2. Cargará todos los archivos del proyecto y generará una carpeta con los archivos comprimidos.
3. Puedes acceder a la carpeta desde la terminal ejecutando:
```
$ cd build

```
4. Agrega los archivos del proyecto a la carpeta raíz de tu servidor para correr la aplicación

## Despliegue en GitHub Pages 📦

GitHub nos da la herramienta de hacer deploy de nuestros proyectos Frontend en su opción **GitHub Pages**

Sigue los siguientes pasos para hacer deploy en GitHub Pages:

1. En la raíz del proyecto, instala la dependencia de github pages:
```
$ npm install gh-pages
```
2. Agrega 2 nuevos scripts dentro del campo **scripts** en package.json:
```js
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```
3. Ejecuta en la terminal **predeploy** para generar la carpeta build:
```
$ npm run predeploy
```
4. Ejecuta **deploy** para crear una nueva rama en tu repositorio donde tendrá los archivos de **build**:
```
$ npm run deploy
```

En tu repositorio verás una rama llamada gh-pages y en automático GitHub generará la configuración pertinente para usar GitHub Pages.

## Construido con 🛠️

* [React.js](https://es.reactjs.org/) - Librería de Javascript
* [Bootstrap](https://getbootstrap.com/) - Toolkit CSS
* [JSON-Server](https://github.com/typicode/json-server) - Fake API
* [Visual Studio Code 2019](https://visualstudio.microsoft.com/es/) - Editor de Texto

## Autores ✒️

* **David Cruz Portilla** - [davidportilla179](https://github.com/davidportilla179)
* **Said Mandujano** - [JILSE7](https://github.com/JILSE7)
* **Brandon Alberto Fuentes Ocampo** - [Brandon851](https://github.com/Brandon851)
* **José Antonio Millán Villegas** - [AntonioMillanV](https://github.com/AntonioMillanV)
## Versionado 📌

* [Git Bash](https://gitforwindows.org/) - Controlador de versiones
* [Repositorio](https://github.com/JILSE7/Project-Place) - Repositorio del Proyecto
## Expresiones de Gratitud 🎁

* Agradecemos al equipo de BEDU en general por su gran trabajo y apoyo en este proyecto. 📢🤓.
---
⌨️ con ❤️ por el EQUIPO 3