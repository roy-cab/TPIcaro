const express = require('express');
const session = require('express-session');
const app = new express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
const conexion = require('./bbdd/conexion');

// estrategia de autenticacion.. usamos la local (usuario y contraseña)
    passport.use(new LocalStrategy(
    async function(username, password, done) {

        passBBDD = await buscarUsuario(username);
        console.log("recibido = " + password + " , base = " + passBBDD)
        if(password === passBBDD){
            console.log('Log ok')
            return done(null, username);
        } else {
            console.log('Logueo no realizado')
            return done("unauthorized access", false);
        }
    }
));

function buscarUsuario(nombre_usuario) {

    const qry = "select PassUsuario from usuarios where NombreUsuario = '" +  nombre_usuario +"'";
    console.log(qry)
    return new Promise((resolve, reject) => {
    conexion.query(qry, function (error, datos, filas) {

        if (error || datos.length === 0){ //arreglar aca para que cuando no encuentre el usuario no se rompa
            // err = new Error('Usuario no encontrado');
            // reject(err)
            resolve(0)
        }
        else{
            pass = datos[0].PassUsuario.toString();
            console.log("clave en base = " + pass)
            // return pass;
            resolve(pass)
        }
    })

    })
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

// función middleware para validar si está logueado.
const isLoggedIn = (req, res, next) => {
    console.log('session ', req.session);
    if(req.isAuthenticated()){
        //console.log('user ', req.session.passport.user)
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

// configuramos las rutas
app.use('/api/authenticate', require('./routes/auth'));

//prueba get
app.get('', function(req, res) {
    
        console.log("Consulta exitosa");
        res.status(200).send("funcionó");
   

  });

// iniciamos al servidor.
app.listen(port, (error) => {
    if (error) {
        console.log("Error al iniciar el servidor.")
    }
    else {
        console.log(`Escuchando en puerto ${port}`)
    }
})