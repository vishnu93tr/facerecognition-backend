const handleProfile=(req,res,db)=>{
    const {id}=req.params;
    db.select('*').table('users').where({
        id:id
    }).then(user=>{
        if(user.length){
            res.json(user[0]);
        }
        else{
            res.status(400).json('not found');
        }
        
    }).catch(err=>res.status(400).json('not found'));
}
module.exports={
    handleProfile:handleProfile 
}