const express=require('express');
const app=express();
const upload=require('express-fileupload');
const mongoose =require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const path = require('path');
const user =require('./routes/user');
const expressValidator=require('express-validator');
const jsons=require('./models/jsonform');
mongoose.connect("mongodb+srv://ishan:ishan@cluster0.vkady.mongodb.net/ishan?retryWrites=true&w=majority",{ useNewUrlParser: true,useCreateIndex:true})
.then(()=>{
    
        console.log("jdw");
    
})
app.use(upload());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());
app.use(bodyParser.json());
app.use('/user',user);
app.get('/',(req,res)=>{
    res.send(`
    user/users -> To get all users registered                                                    

    user/signup -> Signup user

    user/signin -> Login user

    user/userId -> User By id

    user/update -> To update user

    user/delete -> To delete user

    `);
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/file',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.get('/UserHomePage',(req,res)=>{
    res.sendFile(__dirname+'/index2.html');

})
app.post('/file',(req,res)=>{
    if(req.files){
        console.log(req.files);
        var file=req.files.file;
        var filename=file.name;
        console.log(filename);
        file.mv('./uploads/'+filename,function(err){
            if(err){
                res.send(err);
            }
            else{
                return res.redirect('/UserHomePage');                
            }
        })
    }
})

app.post('/das', function(req, res) {
    // Insert JSON straight into MongoDB
    console.log(req.body);
    var newData = new jsons({data : req.body});
    newData.save(function(err){
        if (err) {
                   throw err;
        }
        console.log('INSERTED!');
    });
 });
 
app.get('/displayData',(req,res)=>{
    jsons.find().exec(function(err,result){
            if(err){
                res.status(404).json({
    
                })
            }
            else{
                res.json({
                    results:result
                })
            }
    })
})

const port=process.env.PORT || 8080;

app.listen(port);
