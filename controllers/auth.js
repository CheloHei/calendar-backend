const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generarJWT = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {

        let user_email = await User.findOne({ email });
        if(user_email){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        const user = new User(req.body);
        //encrypt pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save()

        //generar jsonwebtoken
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: 'register',
            name: user.name,
            uid: user.id,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error',
        })
    }

}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email' 
            })
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }
        //generar jsonwebtoken
        const token = await generarJWT(user.id, user.name);


        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error',
        })
    }

    res.json({
        ok: true,
        msg: 'login',
        email, password
    })
}
const renew = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}



module.exports = {
    createUser,
    loginUser,
    renew
}