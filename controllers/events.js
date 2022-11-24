const { response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {

        try {

            const events = await Event.find().populate('user', 'name');
            res.status(201).json({
                ok: true,
                events
            })
            
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        } 
}
const createEvent = async (req, res = response) => {

        const event = new Event(req.body);
        console.log(event)
        try {
            event.user = req.uid;
            console.log(event.user)
            const eventSaved = await event.save()
            res.status(201).json({
                ok: true,
                eventSaved
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
}
const updateEvent = async (req, res = response) => {

    const eventId = req.params.id

    try {
        
        const event = await Event.findById(eventId);
        console.log(event)
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.status(201).json({
            ok: true,
            eventUpdated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    

}
const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id

    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            })
        }

        await Event.findByIdAndDelete(eventId, {new: true});

        res.status(201).json({
            ok: true,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    

}




module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}