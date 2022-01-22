const express = require('express')
const router = express.Router();
const controller = require('../controllers/notificacoes.controller')
const { validationResult, body } = require('express-validator')

router.post('/create', [
    body('texto').notEmpty().escape(),
    body('operario').isInt().escape(),
    body('hora').notEmpty().escape()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.create(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.get('/',  function (req, res) {
    controller.findAll(req, res); 
})

router.get('/:id',  function (req, res) {
    controller.findOne(req, res); 
})

router.patch('/read/:id', function (req, res) {
    controller.read(req, res);
})

module.exports = router