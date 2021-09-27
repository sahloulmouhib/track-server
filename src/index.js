require('./models/User')
require('./models/Track')
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const authRoutes=require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth')
const trackRoutes =require('./routes/trackRoutes')
const app=express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)
const mongoUri='mongodb+srv://rektdude:passwordpassword@cluster0.ykgzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true })


mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance')
})
mongoose.connection.on('error',(err)=>{
    console.error('Error connectiong to mongo',err)
})


app.get('/',requireAuth,(req,res)=>{
    res.send(`Hi there  your email :${req.user.email}`)
})

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})