/**
 * @typedef Notificacoes
 * @property {string} texto.required
 * @property {integer} operario.required
 * @property {string} hora.required
 * @property {boolean} lido
 */

const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize( 'joaoferr_ESMAPP_21_22_GRP5',
    'joaoferr_ESMAPP_21_22_GRP5', '7tke3shQqM6bwMUn', {
    host: 'www.joaoferreira.eu', dialect: 'mysql' })

sequelize.authenticate()
.then(() => { console.log('Connection has been established successfully.'); })
.catch(err => { console.error('Unable to connect to the database:', err); });

class Notificacoes extends Model {}

Notificacoes.init({
    texto: DataTypes.STRING,
    operario: DataTypes.INTEGER,
    hora: DataTypes.STRING,
    lido: DataTypes.BOOLEAN
}, { sequelize, modelName: 'notificacoes'})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Notificacoes = Notificacoes;