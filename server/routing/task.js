const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure) =>{
    return MongoClient.connect('mongodb://localhost:27017/userDB',(err,client)=>{
      if (err) return console.log(err);
      let db = client.db('userDB');
      closure(db);
    })
  }
  
router.post('/addTask',(req,res)=>{
    connection((db)=>{
      db.collection('users').findOne({email:req.body.email},(err,result)=>{
        if(err||!result) {res.send({message:"Error"})}
        else{
            db.collection('users').update(
               { email : req.body.email},
                {$push : { tasks: { $each: [{titre : "nom_task", description : "description", date : "date "}] } }
               }
            );
          res.send({message:"Done"});
        }
      })
    })
  })
  
 module.exports = router;
