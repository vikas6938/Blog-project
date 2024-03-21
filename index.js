const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function(req,res){
    res.render('./Pages/home')
})

app.listen((3000), () => {
    console.log('server : 3000')
})