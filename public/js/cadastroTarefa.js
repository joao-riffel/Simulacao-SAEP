const form = document.getElementById("formCadastroTarefa");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const setor = document.getElementById("setor").value;
  const user = document.getElementById("usuario").value;
  const prioridade =  document.getElementById("prioridade").value; 

  const tarefa = {
    descricao,
    setor,
    user,
    prioridade
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