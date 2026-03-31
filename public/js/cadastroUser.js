const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const email = document.getElementById("email").value;

  const usuario = {
    nome,
    idade: Number(idade), 
    email
  };

  try {
    const resposta = await fetch("/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
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
    mensagem.textContent = "Erro ao cadastrar usuário.";
    mensagem.style.color = "red";
    console.error(erro);
  }
});