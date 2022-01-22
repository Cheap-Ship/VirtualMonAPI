const Model = require('../models/notificacoes.model'); 
const Notificacao = Model.Notificacoes;

exports.create = async (req, res) => {
    req.body.lido = false;
    Notificacao.create(req.body);
    res.status(200).send('Registered Notification');
};

exports.findAll = (req, res) => {
    Notificacao.findAll().then((list) => {
        res.status(200).json(list)
    }).catch((error)=> {
        console.log(error)
        res.status(400).send('Error'); 
    })
};

exports.findOne = (req, res) => {
    Notificacao.findByPk(req.params.id).then((list) => {
        res.status(200).json(list)
    }).catch((error)=> {
        console.log(error)
        res.status(400).send('Error'); 
    })
};

exports.read = (req, res) => {
    Notificacao.update({lido: true}, { where: { id: req.params.id } })
        .then(num => {
            if (num == 1) { res.status(200).send('Set to read'); }
            else { res.status(400).send('Error'); }
        }).catch((error)=> {
            console.log(error)
            res.status(400).send('Error'); 
        })
};