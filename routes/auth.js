/**
 * Routes Users
 */

const express = require('express');
const {check} = require('express-validator');
const { createUser, loginUser, renew } = require('../controllers/auth');
const validarCampos = require('../middlewares/validarCampos');
const validarJwt = require('../middlewares/validarJwt');

const router = express.Router();


router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres ').isLength({min:6}),
        validarCampos
    ],
    createUser)

router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres ').isLength({min:6}),
    validarCampos
],
loginUser)

router.get('/',validarJwt, renew)



module.exports = router;