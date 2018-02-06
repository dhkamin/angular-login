const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var _ = require("lodash");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'authentification';


const connection = (closure) =>{
  return MongoClient.connect('mongodb://localhost:27017/userDB',(err,client)=>{
    if (err) return console.log(err);
    let db = client.db('userDB');
    closure(db);
  })
}

router.post('/register',(req,res,next)=>{
  connection((db)=>{
    db.collection('users').insertOne(req.body,(err,result)=>{
      if(err) res.status(500).send(err);
      const payload = {mail: result.email};
      const token = jwt.sign(payload, jwtOptions.secretOrKey) ;
      res.send({message: "ok",  "token" : token });
  });
  })
})

router.post('/login',(req,res,next)=>{
  connection((db)=>{
    db.collection('users').findOne({email:req.body.email},(err,result)=>{
      if(err||!result) {res.send({message:"user not found"})}
      else if(result.password == req.body.password){
        const payload = {id: result._id};
        const token = jwt.sign(payload, jwtOptions.secretOrKey) ;
        res.send({message: "ok",  "token" : token });

      }else{
        res.send({message:"wrong password"});
      }
    })
  })
})

module.exports = router;
