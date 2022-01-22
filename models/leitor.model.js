/**
 * @typedef Leitor
 * @property {string} codigo.required
 * @property {string} maquina.required
 */

const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize( 'joaoferr_ESMAPP_21_22_GRP5',
    'joaoferr_ESMAPP_21_22_GRP5', '7tke3shQqM6bwMUn', {
    host: 'www.joaoferreira.eu', dialect: 'mysql' })

sequelize.authenticate()
.then(() => { console.log('Connection has been established successfully.'); })
.catch(err => { console.error('Unable to connect to the database:', err); });

class Leitor extends Model {}

Leitor.init({
    codigo: {type: DataTypes.STRING, primaryKey: true},
    maquina: DataTypes.STRING
}, { sequelize, modelName: 'leitor'})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Leitor = Leitor;