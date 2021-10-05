
module.exports =(req,res,next)=>{
    const Header = req.headers['authorization']
    const token = Header && Header.split(' ')[1]

    if(token==null) return res.json(401, {err: 'Chua xac minh'});
    jwToken.verify(token, function(err,token){
        if (err) return res.json(401, {err: 'Invalid Token!'});
        req.token = token
        if(token.username!="admin") return  res.json({err: 'khong phai admin'});
        console.log(req.token)
        return next()
    })
   
}