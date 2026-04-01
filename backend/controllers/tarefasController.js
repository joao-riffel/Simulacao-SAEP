const tarefasService = require("../services/tarefasService");

async function buscarTarefa(req, res) {
    
    try {
        const id_tarefa = Number(req.params.id_tarefa);

        const tarefas = await usuariosService.buscarTarefaPorId(id_tarefa);

        if (tarefas.length === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json(tarefas[0]);

    } catch (erro) {
        console.error("ERRO REAL:", erro);
        res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

async function criarTarefa(req, res) {

    try {

        const { descricao_tarefa, setor_tarefa, usuario_id, prioridade_tarefa } = req.body;

        const tarefa = await tarefasService.criarTarefa(descricao_tarefa, setor_tarefa, usuario_id, prioridade_tarefa);

        res.status(201).json({
            mensagem: "Tarefa criada com sucesso",
            tarefa
        });

    } catch (erro) {

        res.status(400).json({
            erro: erro.message
        });

    }

}

async function atualizarTarefa(req, res) {

    const id_tarefa = Number(req.params.id_tarefa);
    const { descricao_tarefa, setor_tarefa, usuario_id, prioridade_tarefa } = req.body;

    const tarefas = await tarefasService.atualizarTarefa(id_tarefa, descricao_tarefa, setor_tarefa, usuario_id, prioridade_tarefa);

    if (!tarefas) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(tarefas);

}

async function deletarTarefa(req, res) {

    const id_tarefa = Number(req.params.id_tarefa);

    const removido = await tarefasService.deletarTarefa(id_tarefa);

    if (!removido) {
        return res.status(404).json({
            erro: "Tarefa não encontrada"
        });
    }

    res.status(204).send();

}


module.exports = {
    buscarTarefa,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa
};
