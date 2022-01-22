const express = require('express')
const router = express.Router();
const controller = require('../controllers/leitor.controller')
const { validationResult, body } = require('express-validator')

router.post('/create', [
    body('codigo').notEmpty().escape(),
    body('maquina').notEmpty().escape()
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

router.get('/:codigo',  function (req, res) {
    controller.findOne(req, res); 
})

module.exports = router