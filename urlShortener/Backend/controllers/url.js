const URL=require('../models/url');
const shortid=require('shortid')

async function createShortURL(req,res){
    const body=req.body;
    if(!body) return res.status(400).json({error:'url required'});
    const shortUrl=shortid();
    await URL.create({
        shortId : shortUrl,
        redirectUrl : body.url,
        visitHistory : []
    })
    return res.status(200).json({shortId : shortUrl})
}

module.exports = {
    createShortURL,
};