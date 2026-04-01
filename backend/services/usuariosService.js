const pool = require("../database/db");


async function buscarUsuarioPorId(id) {

    const resultado = await pool.query(
        "SELECT * FROM usuario WHERE id = $1",
        [id]
    );

    return resultado.rows;

}


async function ordenarUsuariosAlfabeto(){
    const resultado = await pool.query(
        "SELECT * FROM usuario ORDER BY nome ASC"
    );

    return resultado.rows;
}

async function contarUsuarios() {
    const total = await pool.query (
        "SELECT COUNT (*) FROM usuario"
    );

    return Number(total.rows[0].count);

}

async function criarUsuario(nome, email) {

    if (!nome || nome.trim() === "") {
        throw new Error("Nome é obrigatório");
    }

    if (!email || email.trim() === "") {
        throw new Error("Email é obrigatório");
    }

    const resultado = await pool.query(
        `
        INSERT INTO usuario (nome, email)
        VALUES ($1, $2)
        RETURNING *
        `,
        [nome, email]
    );

    return resultado.rows[0];

}

async function atualizarUsuario(id, nome, email) {

    const resultado = await pool.query(
        `
        UPDATE usuario
        SET nome = COALESCE($1, nome),
            email = COALESCE($2, email)
        WHERE id = $3
        RETURNING *
        `,
        [nome, email, id]
    );

    return resultado.rows[0];

}

async function deletarUsuario(id) {

    const resultado = await pool.query(
        "DELETE * FROM usuario WHERE id = $1",
        [id]
    );

    return resultado.rowCount > 0;

}

module.exports = {
    buscarUsuarioPorId,
    ordenarUsuariosAlfabeto,
    contarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};