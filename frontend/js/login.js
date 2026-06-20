const API = "http://localhost:3000";

// ===============================
// Login do usuário - [Mirela Santos]
// ===============================
async function loginUsuario() {

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        alert("Preencha e-mail e senha.");
        return;
    }

    try {

        const resposta = await fetch(`${API}/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem);
            return;

        }

        // Salva o token
        localStorage.setItem("token", dados.token);

        // Salva usuário
        localStorage.setItem("usuario", email);

        alert("Login realizado com sucesso!");

        window.location.href = "dashboard.html";

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com a API.");

    }

}



// ===============================
// Cadastro de usuário
// ===============================
async function cadastrarUsuario() {

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email || !senha) {

        alert("Preencha todos os campos.");

        return;

    }

    try {

        const resposta = await fetch(`${API}/auth/cadastro`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                nome,
                email,
                senha

            })

        });

        const dados = await resposta.json();

        alert(dados.mensagem);

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar usuário.");

    }

}