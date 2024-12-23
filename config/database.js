const mariadb = require('mariadb');
// arquivo .env
require("dotenv").config();

// Configuração de conexão banco de dados
const pool = mariadb.createPool({
    host: process.env.HOST ,  // Endereço do servidor MariaDB
    user:process.env.USER , // Nome de usuário do MariaDB
    password: process.env.PASSWORD , // Senha do usuário
    database: process.env.DATABASE, // Nome do banco de dados
    connectionLimit: 5 // Número máximo de conexões simultâneas
});

module.exports = pool; 