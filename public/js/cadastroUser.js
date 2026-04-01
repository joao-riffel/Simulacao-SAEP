const form = document.getElementById("formCadastroUsuario");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome_usuario = document.getElementById("nome_usuario").value;
  const email_usuario = document.getElementById("email_usuario").value;

  const usuario = {
    nome_usuario,
    email_usuario
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