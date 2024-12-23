
class ConexaoBancoDados {
    nomeTable;
    nomeBaseDados;
    nomeBanco;
    constructor(nomeTable) {
        this.nomeTable = nomeTable;
        this.nomeBaseDados = "financeiro";
        this.nomeBanco = "mariadb";
    }

    static statusBanco(nomeBaseDados) {
        const status = `Conectado ao ${this.nomeBanco ?? "mariadb"}. Base de dados ${nomeBaseDados}`;//'Status banco de dados';
        return status;
    }

    // select senha e nome do usuario
    selectBancoUser() {
        const query = `SELECT * FROM ${this.nomeTable} WHERE nome = ? AND senha = ?`;//'SELECT * FROM login WHERE nome = ? AND senha = ?';
        return query;
    }
    // pegar todos dados do banco 
    selectBancoDados() {
        const query = `SELECT * FROM ${this.nomeTable}`;//'SELECT * FROM fluxocaixa'
        return query;
    }
    // delete dado do banco
    deleteBancoDados() {
        const query = `DELETE FROM ${this.nomeTable} WHERE id = ?`;// "DELETE FROM fluxocaixa WHERE id = ?"
        return query;
    }

    // inserir dado no banco
    insertBancoDados() {
        const query = `INSERT INTO ${this.nomeTable} (id,tipo, nome,preco,disc, data ) VALUES (?, ? ,?,?,?,?)`;
        //'INSERT INTO fluxocaixa (id,tipo, nome,preco,disc, data ) VALUES (?, ? ,?,?,?,?)'
        return query;
    }
}

module.exports = ConexaoBancoDados;