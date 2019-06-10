const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');
const bcrypt=require('bcrypt-nodejs');
const knex = require('knex');
const register=require('./Controllers/Register');
const signin=require('./Controllers/Signin');
const profile=require('./Controllers/Profile');
const image=require('./Controllers/Image');


const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      database : 'smartbrain'
    }
  }); 

app.use(cors());
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.json(database.users);
})
app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,bcrypt,db)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)});
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});
app.put('/image', (req,res)=>{image.handlesImage(req,res,db)});
app.post('/imageUrl', (req,res)=>{image.handleApiCall(req,res)});

app.listen(3000,()=>{
    console.log('app is running successfully on 3000!!!');
});