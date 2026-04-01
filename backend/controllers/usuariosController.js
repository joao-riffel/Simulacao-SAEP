const usuariosService = require("../services/usuariosService");


async function buscarUsuario(req, res) {
    
    try {
        const id_usuario = Number(req.params.id_usuario);

        const usuarios = await usuariosService.buscarUsuarioPorId(id_usuario);

        if (usuarios.length === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json(usuarios[0]);

    } catch (erro) {
        console.error("ERRO REAL:", erro);
        res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

  async function ordenarUsuariosAlfabeto(req,res) {
    try {

        const usuarios = await usuariosService.ordenarUsuariosAlfabeto();

        res.status(200).json([
            usuarios
        ]);

    }catch (erro){
        res.status(500).json({
            erro:"Não foi possível ordenar os usuários alfabeticamente"
        });
    }
  }


async function contarUsuarios(req, res) {

    try {

        const total = await usuariosService.contarUsuarios();

        res.status(200).json({
            total
        });

    }catch (erro) {
        res.status(500).json ({
            erro: "Não foi possívl contar os usuários"
        });
    }
}

async function criarUsuario(req, res) {

    try {

        const { nome_usuario, email_usuario } = req.body;

        const usuario = await usuariosService.criarUsuario(nome_usuario, email_usuario);

        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario
        });

    } catch (erro) {

        res.status(400).json({
            erro: erro.message
        });

    }

}

async function atualizarUsuario(req, res) {

    const id_usuario = Number(req.params.id_usuario);
    const { nome_usuario, email_usuario } = req.body;

    const usuario = await usuariosService.atualizarUsuario(id_usuario, nome_usuario, email_usuario);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);

}

async function deletarUsuario(req, res) {

    const id_usuario = Number(req.params.id_usuario);

    const removido = await usuariosService.deletarUsuario(id_usuario);

    if (!removido) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.status(204).send();

}


module.exports = {
    buscarUsuario,
    ordenarUsuariosAlfabeto,
    contarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
