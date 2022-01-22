const express = require('express')
const router = express.Router();
const controller = require('../controllers/utilizadores.controller')
const authorize = require('../config/token')
const { validationResult, body } = require('express-validator')

router.post('/register', [
    body('nome').notEmpty().escape(),
    body('email').isEmail().escape(),
    body('password').notEmpty().escape(),
    body('cargo').notEmpty().escape(),
    body('turnoInicio').notEmpty().escape(),
    body('turnoFim').notEmpty().escape()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.register(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.post('/login', [
    body('email').isEmail().escape(), 
    body('password').notEmpty().escape()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.login(req, res); 
    } else {
        res.status(404).json(errors.array())
    }
})

router.get('/',  function (req, res) {
    authorize.validateToken(req.headers.authorization, (result) => {
        if(result) {
            controller.findAll(req, res); 
        } else {
            res.status(401).json({error: "Invalid Token"}); 
        }
    })
})

router.get('/:id',  function (req, res) {
    authorize.validateToken(req.headers.authorization, (result) => {
        if(result) {
            controller.findOne(req, res); 
        } else {
            res.status(401).send("Invalid Token"); 
        }
    })
})

router.patch('/newPassword/:id', [
    body('oldpassword').notEmpty().escape(), 
    body('newpassword').notEmpty().escape()
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        authorize.validateToken(req.headers.authorization, (result) => {
            if(result) {
                controller.delete(req, res);
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.patch('/newShift/:id', [
    body('turnoInicio').notEmpty().escape(),
    body('turnoFim').notEmpty().escape()
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        authorize.validateToken(req.headers.authorization, (result) => {
            if(result) {
                controller.newShift(req, res);
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.patch('/notify/:id', [
    body('notificarFora').isBoolean().escape()
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        authorize.validateToken(req.headers.authorization, (result) => {
            if(result) {
                controller.notify(req, res);
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.patch('/newPost/:id', [
    body('cargo').notEmpty().escape()
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        authorize.validateToken(req.headers.authorization, (result) => {
            if(result) {
                controller.newPost(req, res);
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.patch('/newBadge/:id', [
    body('badge').notEmpty().escape()
], function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        authorize.validateToken(req.headers.authorization, (result) => {
            if(result) {
                controller.newBadge(req, res);
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.delete('/delete/:id',  function (req, res) {
    authorize.validateToken(req.headers.authorization, (result) => {
        if(result) {
            controller.delete(req, res);
        } else {
            res.status(401).send("Invalid Token"); 
        }
    })
})

module.exports = router