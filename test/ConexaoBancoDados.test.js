// Link ->  https://kinsta.com/pt/blog/jest/

//  Importando a classe
const ConexaoBancoDados = require('../models/models.js');

describe('ConexaoBancoDados Class Tests', () => {
    const nomeTabela = 'usuarios';

    // Testar o construtor
    it('Deve inicializar corretamente as propriedades da classe', () => {
        const conexao = new ConexaoBancoDados(nomeTabela);
        expect(conexao.nomeTable).toBe(nomeTabela);
        expect(conexao.nomeBaseDados).toBe('financeiro');
        expect(conexao.nomeBanco).toBe('mariadb');
    });

    // Testar o método estático statusBanco
    it('Deve retornar o status correto do banco de dados', () => {
        const status = ConexaoBancoDados.statusBanco('financeiro');
        expect(status).toBe('Conectado ao mariadb. Base de dados financeiro');
    });

    // Testar o método selectBancoUser
    it('Deve retornar a query para selecionar usuário com nome e senha', () => {
        const conexao = new ConexaoBancoDados(nomeTabela);
        const query = conexao.selectBancoUser();
        expect(query).toBe('SELECT * FROM usuarios WHERE nome = ? AND senha = ?');
    });

    // Testar o método selectBancoDados
    it('Deve retornar a query para selecionar todos os dados', () => {
        const conexao = new ConexaoBancoDados(nomeTabela);
        const query = conexao.selectBancoDados();
        expect(query).toBe('SELECT * FROM usuarios');
    });

    // Testar o método deleteBancoDados
    it('Deve retornar a query para deletar dados por id', () => {
        const conexao = new ConexaoBancoDados(nomeTabela);
        const query = conexao.deleteBancoDados();
        expect(query).toBe('DELETE FROM usuarios WHERE id = ?');
    });

    // Testar o método insertBancoDados
    it('Deve retornar a query para inserir dados no banco', () => {
        const conexao = new ConexaoBancoDados(nomeTabela);
        const query = conexao.insertBancoDados();
        expect(query).toBe(
            'INSERT INTO usuarios (id,tipo, nome,preco,disc, data ) VALUES (?, ? ,?,?,?,?)'
        );
    });
});
