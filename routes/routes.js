
const { loginUser, getDadosBanco, deleteItem, adicionarDados } = require('../controllers/controllers.js');
const path = require('path');

function rotas(app, isAuthenticated) {

    // Rota para obter os dados da tabela banco
    app.get('/dados', isAuthenticated, getDadosBanco)

    // adicionar dados banco
    app.get('/post', isAuthenticated, adicionarDados)

    // delete dados banco
    app.delete('/delete', deleteItem)

    // Rota para processar o login
    app.post('/login', loginUser)

    // Rota para logout
    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.send('Erro ao fazer logout.');
            }
            res.redirect('/');
        });
    });

    // Rota principal
    app.get('/', (req, res) => {
        if (req.session.user) {
            // res.send(`Bem-vindo, ${req.session.user}! <a href="/logout">Logout</a>`);
            res.sendFile(path.join(__dirname, '../views/pages/home.html'));
        } else {
            // res.send('Você não está logado. <a href="/login">Login</a>');
            res.sendFile(path.join(__dirname, '../index.html'));
        }
    });

    // Rota protegida
    app.get('/pagina-protegida', isAuthenticated, (req, res) => {
        res.send('Você está logado e pode acessar esta página.');
    });

    // Rota protegida
    app.get('/cadastro', isAuthenticated, (req, res) => {
        // res.send('Você está logado e pode acessar esta página.');
        res.sendFile(path.join(__dirname, '../views/pages/cadastro.html'));
    });
}

module.exports = rotas;