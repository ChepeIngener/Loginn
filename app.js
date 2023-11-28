//Invocar o importar exxpress//
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json());

//invocar o importar dotenv//
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//directorio public//
app.use('/', express.static('public'));
app.use('/', express.static(__dirname + '/public'));

//establecer motor de plantillas ejs//
app.set('view engine', 'ejs');

//invocar bcryptjs//
const bcryptjs = require ('bcryptjs');

//variable de secion//
const session = require ('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}))

//invocar el modulo de conexion de nuestra db//
const connection = require ('./databases/db')

//permite capturar los datos de nuestro formulario media urlencoded//
app.get('/', (req,res)=>{
    res.send('hello world');
})

/*app.get('/', (req, res)=>{
    res.send('hello word');
})*/

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

//register//
app.post('/register', async(req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordhash = await bcryptjs.hash(pass, 8);
    connection.query ('INSERT INTO user5 SET ?', {
        user:user, name:name, rol:rol, pass:passwordhash
    }, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.send('Successful Registration')
        }
    })
})

app.listen(3000, (req, res)=>{
    console.log('Server running on https://localhost:3000/');
})


