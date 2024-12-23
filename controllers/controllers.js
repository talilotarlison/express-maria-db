const md5 = require('md5');
const pool = require('../config/database');// banco de dados
const ConexaoBancoDados = require('../models/models.js');

// todos os dados do banco de dados listado na API
async function getDadosBanco(req, res) {
    let conn;
    try {
        conn = await pool.getConnection();
        let query = new ConexaoBancoDados("fluxocaixa").selectBancoDados();
        const statusBanco = ConexaoBancoDados.statusBanco(conn.info.database);
        console.log(statusBanco);
        const rows = await conn.query(query); // Substitua "sua_tabela" pelo nome da tabela
        res.json(rows); // Retorna os dados no formato JSON
    } catch (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.status(500).json({ error: 'Erro ao acessar os dados do banco.' });
    } finally {
        if (conn) conn.end(); // Fecha a conexão
    }
};

// login do usuario
async function loginUser(req, res) {
    // console.log(req.body);
    const { username, password } = req.body;

    const user = {
        username: username,
        password: md5(password)
    }
    console.log(user.username, user.password)

    if (!user.username || !user.password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios.' });
    }

    let conn;
    try {
        // Obter conexão do pool
        conn = await pool.getConnection();

        // Consulta ao banco de dados
        const query = new ConexaoBancoDados("login").selectBancoUser();
        const results = await conn.query(query, [user.username, user.password]);
        // console.log(results.length)
        if (results.length > 0) {
            // Usuário encontrado, cria a sessão
            req.session.user = results[0].nome; // Armazena o nome do usuário na sessão
            // res.json({ message: 'Login realizado com sucesso!' });
            // Serve o HTML da página de login
            res.redirect('/');
        } else {
            // Usuário ou senha inválidos
            res.status(401).json({ error: 'Credenciais inválidas. Tente novamente.' });
        }
    } catch (err) {
        console.error('Erro na consulta ao banco de dados:', err);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    } finally {
        if (conn) conn.release(); // Libera a conexão de volta ao pool
    }
};

// delete banco de dados
async function deleteItem(req, res) {
    const id = parseInt(req.query.id); // Obtém o ID da URL e converte para número
    console.log(id)
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        // Consulta ao banco de dados
        const query = new ConexaoBancoDados("fluxocaixa").deleteBancoDados();
        const result = await conn.query(query,
            [id] // Passa o ID como parâmetro para evitar SQL Injection
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado.' });
        }

        res.json({ message: 'Registro deletado com sucesso!', affectedRows: result.affectedRows });
    } catch (err) {
        console.error('Erro ao deletar o registro:', err);
        res.status(500).json({ error: 'Erro ao deletar o registro.' });
    } finally {
        if (conn) conn.end();
    }
};

// adicionar dados banco
async function adicionarDados(req, res) {
    // dados padrao 
    const defaultDados = {
        preco: 0.00,
        descricao: "Sem informações"
    }

    // Recebendo as notas como parâmetros da query
    const dado = {
        tipo: req.query.tipo,
        nome: req.query.nome,
        preco: req.query.preco ?? defaultDados.preco,
        descricao: req.query.disc ? " " : defaultDados.descricao,
        datas: new Date()
    }
    if (!dado.tipo || !dado.nome || !dado.preco) {
        return res.status(400).json({ error: 'Dados insuficientes fornecidos.' });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = new ConexaoBancoDados("fluxocaixa").insertBancoDados();
        const result = await conn.query(
            query, // (0,"Saida", "preco produto", 24,"null", null)
            [0, dado.tipo, dado.nome, parseFloat(dado.preco), dado.descricao, dado.datas] // Parâmetros para evitar SQL Injection
        );
        // res.json({ message: 'Dados inseridos com sucesso!', insertId: result.insertId.toString() });
        res.redirect('/');
    } catch (err) {
        console.error('Erro ao inserir dados no banco de dados:', err);
        res.status(500).json({ error: 'Erro ao inserir os dados.' });
    } finally {
        if (conn) conn.end(); // Fecha a conexão
    }
};

// exportes controles
module.exports = {
    loginUser,
    getDadosBanco,
    deleteItem,
    adicionarDados
};