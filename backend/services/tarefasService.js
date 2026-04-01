const pool = require("../database/db");


async function buscarTarefaPorId(id) {

    const resultado = await pool.query(
        "SELECT * FROM tarefa WHERE id = $1",
        [id]
    );

    return resultado.rows;

}

async function contarTarefas() {
    const total = await pool.query (
        "SELECT COUNT (*) FROM tarefa"
    );

    return Number(total.rows[0].count);

}

async function criarTarefa(descricao, setor, user, prioridade) {

    if (!descricao || descricao.trim() === "") {
        throw new Error("Descrição é obrigatório");
    }

    if (!setor || setor.trim() === "") {
        throw new Error("Setor é obrigatório");
    }

    const resultado = await pool.query(
        `
        INSERT INTO tarefa (descricao_tarefa, setor_tarefa, usuario_id, prioridade_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [descricao, setor, user, prioridade]
    );

    return resultado.rows[0];

}

async function atualizarTarefa(id, descricao, setor, user, prioridade) {

    const resultado = await pool.query(
        `
        UPDATE tarefa
        SET descricao_tarefa = COALESCE($1, descricao),
            setor_tarefa = COALESCE($2, tarefa), 
            usuario_id = COALESCE($3, user),
            prioridade_tarefa = COALESCE($4, prioridade)
        WHERE id = $5
        RETURNING *
        `,
        [descricao, setor, user, prioridade, id]
    );

    return resultado.rows[0];

}

async function deletarTarefa(id) {

    const resultado = await pool.query(
        "DELETE * FROM tarefa WHERE id = $1",
        [id]
    );

    return resultado.rowCount > 0;

}

module.exports = {
    buscarTarefaPorId,
    contarTarefas,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa
};