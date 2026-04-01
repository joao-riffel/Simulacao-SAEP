const usuariosService = require("../services/tarefasService");

async function buscarTarefa(req, res) {
    
    try {
        const id = Number(req.params.id);

        const tarefas = await usuariosService.buscarTarefaPorId(id);

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

        const { descricao, setor, user, prioridade } = req.body;

        const tarefas = await tarefasService.criarTarefa(descricao, setor, user, prioridade);

        res.status(201).json({
            mensagem: "Tarefa criada com sucesso",
            usuario
        });

    } catch (erro) {

        res.status(400).json({
            erro: erro.message
        });

    }

}

async function atualizarTarefa(req, res) {

    const id = Number(req.params.id);
    const { descricao, setor, user, prioridade } = req.body;

    const tarefas = await tarefasService.atualizarTarefa(id, descricao, setor, user, prioridade);

    if (!tarefas) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(tarefas);

}

async function deletarTarefa(req, res) {

    const id = Number(req.params.id);

    const removido = await tarefasService.deletarTarefa(id);

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
