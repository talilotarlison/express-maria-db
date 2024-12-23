// importes bibliotecas
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');

// meus importes aplicação
const hashByLength = require('./services/hash.js');// cria hash 
const isAuthenticated = require('./middlewares/middleware.js');
const rotas = require('./routes/routes.js');

// config database
// const pool = require('./config/database.js');// banco de dados

// express 
const app = express();
const port = 3000;

// Middleware para processar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// permisão de pasta liberada
app.use(express.static(__dirname + '/public'));

// randomHash para sessao
const randomHash = hashByLength(20);

// Configuração da sessão
app.use(session({
    secret: randomHash,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// rotas da aplicação
rotas(app, isAuthenticated)

// listen servido na porta
app.listen(port, () =>
    console.log(`Servidor iniciado na porta ${port}`)
);
