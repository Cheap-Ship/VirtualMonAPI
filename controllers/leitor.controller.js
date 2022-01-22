const Model = require('../models/leitor.model'); 
const Leitor = Model.Leitor;

exports.create = async (req, res) => {
    let codigo = await Leitor.findOne({ where: { maquina: req.body.maquina } })
    if(codigo) { res.status(406).send('Machine Already has a code'); }
    codigo = await Leitor.create(req.body);
    res.status(200).send('Registered Code');
};

exports.findAll = (req, res) => {
    Leitor.findAll().then((list) => {
        res.status(200).json(list)
    }).catch((error)=> {
        console.log(error)
        res.status(400).send('Error'); 
    })
};

exports.findOne = (req, res) => {
    Leitor.findByPk(req.params.codigo).then((list) => {
        res.status(200).json(list)
    }).catch((error)=> {
        console.log(error)
        res.status(400).send('Error'); 
    })
};