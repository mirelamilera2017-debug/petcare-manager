const API = "https://ominous-tribble-gx4jxqj96jxphpv4-3000.app.github.dev";

// Login do usuário - [Mirela Santos]
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
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem || "Erro ao fazer login.");
            return;
        }

        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuario", email);

        alert("Login realizado com sucesso!");
        window.location.href = "dashboard.html";

    } catch (erro) {
        console.error("Erro completo no login:", erro);
        alert("Erro ao conectar com a API. Veja o Console com F12.");
    }
}

// Cadastro de usuário - [Mirela Santos]
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
            body: JSON.stringify({ nome, email, senha })
        });

        const texto = await resposta.text();

        let dados;
        try {
            dados = JSON.parse(texto);
        } catch {
            console.error("Resposta não veio em JSON:", texto);
            alert("Erro: a API não retornou JSON. Veja o Console com F12.");
            return;
        }

        if (!resposta.ok) {
            alert(dados.mensagem || "Erro ao cadastrar usuário.");
            return;
        }

        alert(dados.mensagem || "Usuário cadastrado com sucesso!");

    } catch (erro) {
        console.error("Erro completo no cadastro:", erro);
        alert("Erro ao cadastrar usuário. Veja o Console com F12.");
    }
}