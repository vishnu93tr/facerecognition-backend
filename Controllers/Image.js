const clarifai=require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
   apiKey: '06e96292f1204d408d45c3cd2a52735b'
  });
  const handleApiCall=(req,res)=>
  {
   app.models
   .predict(
     Clarifai.FACE_DETECT_MODEL,req.body.input).then(data=>{
        res.json(data);
     }).catch(err=>res.status(400).json('unable to respond with clarifai api'));
   }
const handlesImage=(req, res,db) => {
    const {id}=req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
       res.json(entries[0])
    }).catch(err=>res.status(400).json('unable to fetch Id or entries'))
  
  }

  module.exports={handlesImage,handleApiCall}