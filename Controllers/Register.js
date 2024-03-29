const handleRegister=(req,res,bcrypt,db)=>{
    const {email,password,name}=req.body;
    if(!email || !password ||!name)
    {
        return res.status(400).json('unable to register');
    }
    const hash=bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        }).into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date()
            }).then(user=>{
                res.json(user[0])
            })
        }).then(trx.commit)
        .error(trx.rollback)
    }).catch(err=>res.status(400).json('unable to register'));
    
}
module.exports={
    handleRegister:handleRegister
}