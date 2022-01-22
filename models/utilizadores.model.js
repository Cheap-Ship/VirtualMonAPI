/**
 * @typedef Utilizador
 * @property {string} nome.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} cargo.required
 * @property {string} turnoInicio.required
 * @property {string} turnoFim.required
 * @property {boolean} notificarFora
 * @property {json} badges
 */

const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize( 'joaoferr_ESMAPP_21_22_GRP5',
    'joaoferr_ESMAPP_21_22_GRP5', '7tke3shQqM6bwMUn', {
    host: 'www.joaoferreira.eu', dialect: 'mysql' })

sequelize.authenticate()
.then(() => { console.log('Connection has been established successfully.'); })
.catch(err => { console.error('Unable to connect to the database:', err); });

class Utilizador extends Model {}

Utilizador.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cargo: DataTypes.STRING,
    turnoInicio: DataTypes.STRING,
    turnoFim: DataTypes.STRING,
    notificarFora: DataTypes.BOOLEAN,
    badges: DataTypes.JSON
}, { sequelize, modelName: 'utilizadores'})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Utilizador = Utilizador;