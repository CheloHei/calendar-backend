/**
 * Events Routes
 */

const express = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const validarCampos = require('../middlewares/validarCampos');
const validarJwt = require('../middlewares/validarJwt');
 
 
 const router = express.Router();

 router.use(validarJwt)
 
 //get all events
 router.get('/',getEvents)

 router.post('/',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
 ],createEvent)
 
 router.put('/:id',updateEvent)
 router.delete('/:id',deleteEvent)
 
 
 
 
 module.exports = router;