const bcrypt = require("bcryptjs");
const utilities = require('../config/token')
const Model = require('../models/utilizadores.model'); 
const Utilizador = Model.Utilizador;

exports.register = async (req, res) => {
    req.body.badges = '{"badges":[]}';
    req.body.notificarFora = req.body.notificarFora ? req.body.notificarFora : false;
    let utilizador = await Utilizador.findOne({ where: { email: req.body.email } })
    if(utilizador) { res.status(406).send('Email already registered'); }
    else {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        utilizador = await Utilizador.create(req.body);
        res.status(200).json({"response": "User Registered"});
    }
};

exports.login = async (req, res) => {
    let utilizador = await Utilizador.findOne({ where: { email: req.body.email } });
    if (!utilizador) res.status(401).send('Unauthorized');
    const passwordIsValid = bcrypt.compareSync(req.body.password, utilizador.password);
    if (!passwordIsValid) res.status(401).send('Unauthorized'); 
    utilities.generateToken({cargo: utilizador.cargo}, (token) => {
        res.status(200).json({"token": token, "id": utilizador.id}); 
    })
}

exports.findAll = (req, res) => {
    Utilizador.findAll().then((list) => {
        res.status(200).json(list)
    }).catch((error)=> {
        console.log(error)
        res.status(400).send('Error'); 
    })
};

exports.findOne = (req, res) => {
    Utilizador.findByPk(req.params.id).then((list) => {
        res.status(200).json(list)
    }).catch((error)=> {
        console.log(error)
        res.status(400).send('Error'); 
    })
};

const getUpdateError = (data, id, body) => {
    if (data === null)
        return { status: 404, message: 'User not Found' }
    else if (JSON.stringify(data) == JSON.stringify(body))
        return { status: 200, message: 'Same Data' }
    else
        return { status: 400, message: 'Error' }
}

exports.newPassword = async (req, res) => {
    let utilizador = await Utilizador.findOne({ where: { id: req.params.id } });
    if (!utilizador) res.status(401).send('User not Found');
    const passwordIsValid = bcrypt.compareSync(req.body.oldpassword, utilizador.password);
    if (!passwordIsValid) res.status(401).send('Unauthorized'); 
    Utilizador.update({password: bcrypt.hashSync(req.body.newpassword, 8)}, { where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                res.status(200).send('Password Updated');
            } else {
                Utilizador.findByPk(req.params.id)
                    .then(data => {
                        const { status, message } = getUpdateError(data, req.params.id, req.body)
                        res.status(status).send(message)
                    })
            }
        }).catch((error)=> {
            console.log(error)
            res.status(400).send('Error'); 
        })
};

exports.newShift = (req, res) => {
    Utilizador.update({turnoInicio: req.body.turnoInicio, turnoFim: req.body.turnoFim}, { where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                res.status(200).send('Shift Updated');
            } else {
                Utilizador.findByPk(req.params.id)
                    .then(data => {
                        const { status, message } = getUpdateError(data, req.params.id, req.body)
                        res.status(status).send(message)
                    })
            }
        }).catch((error)=> {
            console.log(error)
            res.status(400).send('Error'); 
        })
};

exports.notify = (req, res) => {
    Utilizador.update({notificarFora: req.body.notificarFora}, { where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                res.status(200).send('Notification Preference Updated');
            } else {
                Utilizador.findByPk(req.params.id)
                    .then(data => {
                        const { status, message } = getUpdateError(data, req.params.id, req.body)
                        res.status(status).send(message)
                    })
            }
        }).catch((error)=> {
            console.log(error)
            res.status(400).send('Error'); 
        })
};

exports.newBadge = async (req, res) => {
    let utilizador = await Utilizador.findOne({ where: { id: req.params.id } });
    if (!utilizador) res.status(401).send('User not Found');
    var jsonObj = JSON.parse(utilizador.badges);
    jsonObj['badges'].push(req.body.badge);
    jsonStr = JSON.stringify(jsonObj);
    Utilizador.update({badges: jsonStr}, { where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                res.status(200).send('User Updated');
            } else {
                Utilizador.findByPk(req.params.id)
                    .then(data => {
                        const { status, message } = getUpdateError(data, req.params.id, req.body)
                        res.status(status).send(message)
                    })
            }
        }).catch((error)=> {
            console.log(error)
            res.status(400).send('Error'); 
        })
};

exports.newPost = (req, res) => {
    Utilizador.update({cargo: req.body.cargo}, { where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                res.status(200).send('Post Updated');
            } else {
                Utilizador.findByPk(req.params.id)
                    .then(data => {
                        const { status, message } = getUpdateError(data, req.params.id, req.body)
                        res.status(status).send(message)
                    })
            }
        }).catch((error)=> {
            console.log(error)
            res.status(400).send('Error'); 
        })
};

exports.delete = (req, res) => {
    Utilizador.destroy({ where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({"response": "User Deleted"});
            } else {
                res.status(404).send("User not Found.");
            }
        }).catch((error)=> {
            console.log(error)
            res.status(400).send('Error'); 
        })
};