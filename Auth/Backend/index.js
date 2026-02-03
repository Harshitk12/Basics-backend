const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser')
const connectMongoDB=require('./connection')
const userRoute=require('./routes/user')

const app=express()
app.use(cors({
    origin : 'http://localhost:5500',
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/user',userRoute)

connectMongoDB('mongodb://localhost:27017/Auth')
.then(()=>console.log("MongoDB connected !!"));

app.listen(8000,()=>console.log('server started'));