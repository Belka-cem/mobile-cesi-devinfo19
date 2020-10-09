
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model')

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


// test

app.get("/test", (req, res, next)=>{
    res.json('ok')
    
})

// Image par user

app.get("/user/:id/pictures", (req, res, next)=>{
    console.log("params", req.params);
    
    const pics = User.getPictures(req.params.id)
        .then((datas)=>{
            console.log( datas)

            if (datas.length === 0){
                console.log("getPictures faux");
               res.status(400)
               res.json({ message: 'Aucune image trouvé'})
            }
            else{
                console.log("getPictures ok");
                res.status(200)
                res.json(datas)
            }
           
        })
        .catch((err)=> {
            console.log(err)
            res.status(400)
            res.json({ message: err, hasUser: false})
        })
    
})

//image update note
app.post("/user/:id/pictures/:idPic", (req, res, next)=>{
    console.log(req.body);
    const pic = User.setNote(req.params.idPic, req.body.newNote)
        .then(()=>{
            console.log("signin ok");
            res.status(200)
            res.json({ message: 'Note mise à jour'})
        })
        .catch((err)=>{
            console.log(err)
            res.status(400)
            res.json({ message: err, hasUser: false})
        })
})

//Connexion
app.post("/signin", (req, res, next) => {
     
    const user = User.login(req.body.email, req.body.mdp  )
    .then((datas) => {
        console.log( datas)

        if (datas.length === 0){
            console.log("signin faux");
           res.status(400)
           res.json({ message: 'Utilisateur non authentifié!', hasUser: false})
        }
        else if(  req.body.email === datas[0].email && req.body.mdp === datas[0].mdp  ){
            console.log("signin ok");
            res.status(200)
            res.json({ message: 'Utilisateur connecté!', hasUser: true, id: datas[0].id })
        }
       else{
        console.log("signin erreur");
           res.status(400)
           res.json({ message: 'Utilisateur non authentifié!', hasUser: false})
       }
        
        

    })
    .catch((err)=> {
        console.log(err)
        res.status(400)
        res.json({ message: err, hasUser: false})
    })

 

});

module.exports = app;


