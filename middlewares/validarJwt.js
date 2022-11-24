const {response} = require('express');
const jwt = require('jsonwebtoken');
const validarJwt = (req,res=response,next)=>{
    //leer el token
    const token = req.header('x-token');
    console.log(token)
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }
    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        );
        console.log(payload)
        req.uid = payload.uid;
        req.name = payload.name;
        
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'token invalido'
        })
    }
    next();
}

module.exports = validarJwt