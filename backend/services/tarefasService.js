const pool = require("../database/db");


async function buscarTarefaPorId(id_tarefa) {

    const resultado = await pool.query(
        "SELECT * FROM tarefa WHERE id_tarefa = $1",
        [id_tarefa]
    );

    return resultado.rows;

}

async function contarTarefas() {
    const total = await pool.query (
        "SELECT COUNT (*) FROM tarefa"
    );

    return Number(total.rows[0].count);

}

async function criarTarefa(descricao_tarefa, setor_tarefa, usuario_id, prioridade_tarefa) {

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
        [descricao_tarefa, setor_tarefa, usuario_id, prioridade_tarefa]
    );

    return resultado.rows[0];

}

async function atualizarTarefa(id_tarefa, descricao_tarefa, setor_tarefa, usuario_id, prioridade_tarefa) {

    const resultado = await pool.query(
        `
        UPDATE tarefa
        SET descricao_tarefa = COALESCE($1, descricao_tarefa),
            setor_tarefa = COALESCE($2, setor_tarefa), 
            usuario_id = COALESCE($3, usuario_id),
            prioridade_tarefa = COALESCE($4, prioridade_tarefa)
        WHERE id_tarefa = $5
        RETURNING *
        `,
        [descricao_tarefa, setor_tarefa, usuario_id, prioridade_tarefa, id_tarefa]
    );

    return resultado.rows[0];

}

async function deletarTarefa(id_tarefa) {

    const resultado = await pool.query(
        "DELETE FROM tarefa WHERE id_tarefa = $1",
        [id_tarefa]
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