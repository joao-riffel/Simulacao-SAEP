const db = require('../db');

async function seed() {
    try {
        await db.query('DELETE FROM usuario');

        await db.query(`
            INSERT INTO usuario (nome_usuario, email_usuario) VALUES
            ('João', 'joao@gmail.com'),
            ('Maria', 'maria@gmail.com'),
            ('Carlos', 'carlinho@gmail.com');
        `);

        console.log('Banco populado com sucesso!');
    } catch (erro) {
        console.error('Erro ao rodar seed:', erro);
    } finally {
        process.exit();
    }
}

seed();