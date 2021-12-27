const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Defining the application

const app = express();

//DEfining the post module

const Post = require("./src/models/post");


//Defining the db connection

const db = mongoose.connect('mongodb://localhost:27017/first-node-api').then(
    ()=>{console.log("connected")},
    err =>{console.log("err",err);}
  );


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Default
app.get('/', function (req, res) {
    //handle the request for root route

    res.send({
        ping: "pong"
    })

})


//Presentation page
app.get('/presentation2', function (req, res) {
    //handle the request for root route

    res.send("<h1>Presentation </h1> <p> This is presentation page created by Afiya Borkar</p>")
})

//CRUD Operation

//Create

app.post('/posts', function (req, res) {
    //get the values from the request payload
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    //assign the values for the post model
    var post = new Post();
    post.title = title;
    post.author = author;
    post.content = content;

    post.save((error,savePost)=>{
        //send the error
        if(error){
            res.status(500).send({error:"Unable to save the post"})
        }
        //send the response
        else{
            res.status(200).send(savePost)
        }
    })

    // res.send({title:title,author:author,content:content})
}

)

//Update

app.patch('/posts/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        post.hidden = req.body.hidden;
        const a1 = await post.save();
        res.json(a1);
    }
    catch(err){
        res.send("error"+err);
    }
})

//Delete 

app.delete('/posts/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        post.hidden = req.body.hidden;
        const a1 = await post.remove();
        res.json(a1);
    }
    catch(err){
        res.send("error"+err);
    }
})

//read

app.get('/posts',(req,res)=>{
    Post.find({},(error,posts)=>{
        if(error){
            res.status(422).send({error:"Unable to fetch the post"});
        }
        else{
            res.status(200).send(posts);
        }
    })
})

//read only one id
app.get('/:id',async(req,res)=>{
    try{
        const b = await Post.findById(req.params.id);
        res.json(b);
    
    } 
    catch(err){
        res.send("error"+err);
    }
})


//Server
app.listen(8000,function(){
    console.log("Server is running on the port number 8000")
})
