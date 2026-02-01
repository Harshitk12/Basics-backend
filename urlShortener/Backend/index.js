const express=require('express');
const urlRoute=require('./routes/url')
const connectMongoDB=require('./connection')
const cors=require('cors');
const URL=require('./models/url')

const app=express();
app.use(cors())
app.use(express.json())

connectMongoDB('mongodb://localhost:27017/urlShortener')
.then(()=>console.log('mongodb connected !!'))

app.use('/url',urlRoute)
app.get('/url/:id', async(req, res)=>{
    const enteredId=req.params.id;
    const entry= await URL.findOneAndUpdate(
        {
            shortId: enteredId
        },
        {
            $push : {
                visitHistory : {
                    timestamp : Date.now(),
                }
            }
        },{
            new:true
        })
    const redirectUrl=entry.redirectUrl.startsWith('https') ? entry.redirectUrl : `https://${entry.redirectUrl}`
    res.redirect(redirectUrl);
})

app.listen(8000,()=>console.log('server started'))