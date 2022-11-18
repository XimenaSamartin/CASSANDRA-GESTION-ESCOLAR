//Creando instancias 
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express(); //crea el servidor
const routs = require("./routes/routes")

// middlewares funciones intermedias que entre que se recibe y responde la soli serán ejecutadas
app.use(morgan('dev')); //Control de mensajes de servidor 
app.use(bodyParser.json()); //Convertir el cuerpo de la soli en un Objeto Json 
app.use(bodyParser.urlencoded({extended:true}));//Permitir carateres especiales y simbolos en la url
app.use("/",routs)//Define la raíz de las rutas

app.listen(3000,()=>console.log('Servidor en puerto 3000')); //Puerto, CallBack
