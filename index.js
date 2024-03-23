const express = require('express')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vikasborse000:viiksh123@porject.mnalupa.mongodb.net/Cookies')
  .then(() => console.log('Connected!'));
const { userModel, postModel } = require('./schema')
const app = express()
const fs = require('fs');


const arr = [
    {
        img:'assets/img/surti.jpg',
        name:'surti',
        isVerified:true
    },
    {
        img:'assets/img/icity.jpg',
        name:'imsuratcity'
    },
    {
        img:'assets/img/sadguru.jpg',
        name:'sadhguru', 
        isVerified:true
    },
    {
        img:'assets/img/riya.jpg',
        name:'riyabhakta08'
    },
    {
        img:'assets/img/shilpa.jpg',
        name:'shilpash',
        isVerified:true
    },
    
    {
        img:'assets/img/virat.jpg',
        name:'virat.kohli',
        isVerified:true
    },
    {
        img:'assets/img/rahul.jpg',
        name:'rga',
        isVerified:true
    },
    {
        img:'assets/img/kevin.jpg',
        name:'kevin'
    },  
    {
        img:'assets/img/virat.jpg',
        name:'virat.kohli',
        isVerified:true
    },    
]


app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('upload'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
//-------------------multer
const multer  = require('multer');
const { error } = require('console');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')


//-------------------auth

const auth = (req, res, next) => {
  if (!req.cookies.user) {
    res.redirect('/')
  } else {
    next()
  }
}

app.get('/dashboard', function(req,res){
    res.render('./Pages/home',{users:arr})
})

app.get('/', function(req,res){
    res.render('./Pages/login',{users:arr})
})

app.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        let minute = 60 * 6000;
        res.cookie('user', user, { maxAge: minute });
        res.redirect('/dashboard');
      }else{
        res.redirect('/')
      }
    }else{
      res.redirect('/')
    }
  });

app.listen((3000), () => {
    console.log('server : 3000')
})