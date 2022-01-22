require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const expressSwagger = require('express-swagger-generator')(app); 
const options = require('./config/swagger'); 
expressSwagger(options);

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) { res.status(200).json({ message: 'virtualmon api' }); });
app.use('/leitor', require('./routes/leitor.routes.js'))
app.use('/notificacoes', require('./routes/notificacoes.routes.js'))
app.use('/utilizadores', require('./routes/utilizadores.routes.js'))
app.get('*', function (req, res) { res.status(404).json({ message: 'WHAT???' }); })
app.listen(port, () => console.log(`App listening on PORT ${port}/`));