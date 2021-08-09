const express = require('express');
const session = require('express-session');
const app = new express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// estrategia de autenticacion.. usamos la local (usuario y contraseña)
passport.use(new LocalStrategy(
    function(username, password, done) {
        if(username === "admin" && password === "admin"){
            return done(null, username);
        } else {
            return done("unauthorized access", false);
        }
    }
));

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

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

// iniciamos al servidor.
app.listen(port, (error) => {
    if (error) {
        console.log("Error al iniciar el servidor.")
    }
    else {
        console.log(`Escuchando en puerto ${port}`)
    }
})