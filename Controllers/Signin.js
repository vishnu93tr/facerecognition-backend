const handleSignIn=(req,res,bcrypt,db)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(400).json('unable to register');
    }
    db.select('email','hash').from('login').
    where('email','=',email)
    .then(data=>{
        let isValid=bcrypt.compareSync(password,data[0].hash);
        if(isValid){
             db.select('*').from('users').
             where('email','=',req.body.email).
             then(user=>{
                     res.json(user[0]);
             }).catch(err=>res.status(400).json('unable to get user'));
        }
        else{
         res.status(400).json('wrong credentials');
        }
    }).catch(err=>res.status(400).json('wrong credentials'));
 }
 module.exports={
    handleSignIn:handleSignIn  
 }