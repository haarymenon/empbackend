// Task1: initiate app and run server at 3000
const express=require('express');
const mongoose = require('mongoose');

const app=express();


app.use(express.json());

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
mongoose.connect("mongodb+srv://nevinjoe09:nevin@cluster0.r4ucjn8.mongodb.net/SampleEmp?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below




const schema= mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
});
const empModel=mongoose.model('emp',schema);

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    try {
        const data = await empModel.find()
        res.send(data);
    } catch (error) {
    console.log(error);    
    }
})




//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const data = await empModel.findById(id)
        if(data)
        {
            res.send(data);
        }
        else
        {
            res.send({message:"Item not found"});
        }
    } catch (error) {
    console.log(error);    
    }
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async(req,res)=>{
    console.log(req.body)
    try {
        const data=req.body;
        await empModel(data).save();
        res.send({message:"Data Added"});
    } catch (error) {
        console.log(error);
    }
})






//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        await empModel.findByIdAndDelete(id);
        res.send({message:"Item Deleted"});
    } catch (error) {
        console.log(error);
    }
})





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async(req,res)=>{
    const id=req.body._id
    console.log(req.body);
    try {
        await empModel.findByIdAndUpdate(id,req.body);
        empModel.save();
        res.send({message:"Updated"});
    } catch (error) {
        console.log(error);
    }
})








app.listen(3000,()=>{
    console.log("Running in 3000");
})
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});







