
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const USERS = [
    {email : "test@test.fr", mdp: "test"}
]

//Middleware Parser
app.use(bodyParser.json());

// Corp
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// Connexion

app.get("/test", (req, res, next)=>{
    res.json('ok')
})
app.post("/signin", (req, res, next) => {
    
 
    if(  req.body.email === USERS[0].email && req.body.mdp === USERS[0].mdp  ){
        console.log("signin ok");
        res.status(200)
        res.json({ message: 'Utilisateur connecté!', hasUser: true})
    }
   else{
    console.log("signin faux");
       res.status(400)
       res.json({ message: 'Utilisateur non authentifié!', hasUser: false})
   }
});

module.exports = app;


module.exports = app;