const pool = require("../database/db");


async function buscarUsuarioPorId(id_usuario) {

    const resultado = await pool.query(
        "SELECT * FROM usuario WHERE id_usuario = $1",
        [id_usuario]
    );

    return resultado.rows;

}


async function ordenarUsuariosAlfabeto(){
    const resultado = await pool.query(
        "SELECT * FROM usuario ORDER BY nome_usuario ASC"
    );

    return resultado.rows;
}

async function contarUsuarios() {
    const total = await pool.query (
        "SELECT COUNT (*) FROM usuario"
    );

    return Number(total.rows[0].count);

}

async function criarUsuario(nome_usuario, email_usuario) {

    if (!nome_usuario || nome_usuario.trim() === "") {
        throw new Error("Nome é obrigatório");
    }

    if (!email_usuario || email_usuario.trim() === "") {
        throw new Error("Email é obrigatório");
    }

    const resultado = await pool.query(
        `
        INSERT INTO usuario (nome_usuario, email_usuario)
        VALUES ($1, $2)
        RETURNING *
        `,
        [nome_usuario, email_usuario]
    );

    return resultado.rows[0];

}

async function atualizarUsuario(id_usuario, nome_usuario, email_usuario) {

    const resultado = await pool.query(
        `
        UPDATE usuario
        SET nome_usuario = COALESCE($1, nome_usuario),
            email_usuario = COALESCE($2, email_usuario)
        WHERE id_usuario = $3
        RETURNING *
        `,
        [nome_usuario, email_usuario, id_usuario]
    );

    return resultado.rows[0];

}

async function deletarUsuario(id_usuario) {

    const resultado = await pool.query(
        "DELETE * FROM usuario WHERE id_usuario = $1",
        [id_usuario]
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