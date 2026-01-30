const express=require('express')
const cors=require('cors');
const User=require('./models/user')
const router=require('./routes/user')
const connectMongoDB=require('./connection.js')

const app=express()
app.use(cors())
app.use(express.json())

connectMongoDB('mongodb://localhost:27017/test');

app.use('/user',router)

app.listen(8000,()=>console.log('sever started'))