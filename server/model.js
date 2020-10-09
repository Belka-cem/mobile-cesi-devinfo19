const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tp'
  });


  class User {

    static login(email, mdp){
        return new Promise((resolve, reject)=> {
            if (email === "" || mdp === ""){
                reject("L'email ou le mdp est incorrect")
            }else{
                const req = `SELECT * FROM user WHERE email = '${email}' AND mdp = '${mdp}'`
                console.log(req);
                
                con.query(req,(err, user)=>{
                    if( err){
                        reject(err)
                    }else{
                        resolve(user)
                    }
                })
            }
        })
        
    }

    static getPictures(id){
        return new Promise((resolve, reject)=>{
            if (!id){
                reject("L'id est obligatoire")
            }else{
                const req = `SELECT * FROM picures WHERE id_user = ${id} `
                console.log(req);
                
                con.query(req,(err, pics)=>{
                    if( err){
                        reject(err)
                    }else{
                        resolve(pics)
                    }
                })
            }
        })
    }


    static setNote(id, note){
        return new Promise((resolve, reject)=>{
            if (!id){
                reject("L'id est obligatoire")
            }else {
                let req = `SELECT note, nb_vote FROM picures WHERE id = ${id} `
                console.log(req);

                con.query(req,(err, pics)=>{
                    if( err){
                        reject(err)
                    }else{
                        console.log( "pics",pics);
                        console.log(`(${pics[0].note} + ${note}) / (${pics[0].nb_vote} + 1`);
                        let newNote = (pics[0].note + note) / (pics[0].nb_vote + 1)
                        console.log("newNote", newNote);

                        req = `UPDATE picures SET nb_vote= '${pics[0].nb_vote + 1}', note='${newNote}' where id = ${id}`
                        con.query(req,(err, pics)=>{
                            if( err){
                                reject(err)
                            }else{
                                resolve("ok")
                            }
                        })
                        
                    }
                })
            }
        })
    }




  }

   module.exports = User;