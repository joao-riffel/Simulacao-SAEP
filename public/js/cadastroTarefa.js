const form = document.getElementById("formCadastroTarefa");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const descricao_tarefa = document.getElementById("descricao_tarefa").value;
  const setor_tarefa = document.getElementById("setor_tarefa").value;
  const usuario_id = document.getElementById("usuario").value;
  const prioridade_tarefa =  document.getElementById("prioridade_tarefa").value; 

  const tarefa = {
    descricao_tarefa,
    setor_tarefa,
    usuario_id,
    prioridade_tarefa
  };

  try {
    const resposta = await fetch("/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tarefa)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mensagem.textContent = dados.erro;
      mensagem.style.color = "red";
      return;
    }

    mensagem.textContent = dados.mensagem;
    mensagem.style.color = "green";

    form.reset();

  } catch (erro) {
    mensagem.textContent = "Erro ao cadastrar tarefa.";
    mensagem.style.color = "red";
    console.error(erro);
  }
});