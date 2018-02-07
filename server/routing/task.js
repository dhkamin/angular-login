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
      db.collection('users').findOne({"_id":ObjectID(req.body.id) },(err,result)=>{
        console.log(result);
        if(err||!result) {res.send({message:"Error"})}
        else{
            db.collection('users').update(
               { "_id":ObjectID(req.body.id)},
                {$push : { tasks: { $each: [{title: req.body.title, description: req.body.description, date: req.body.date, done: req.body.done}] } }
               }
            );
            res.send({message:"Done"});
        }
      })
    })
  })
  
 module.exports = router;
