const API = "https://petcare-manager.onrender.com";

function getToken() {
    return localStorage.getItem("token");
}

function protegerPagina() {
    if (!getToken()) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

async function apiFetch(endpoint, options = {}) {
    const resposta = await fetch(`${API}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken(),
            ...(options.headers || {})
        }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        alert(dados.mensagem || "Erro na requisição");
        throw new Error(dados.mensagem || "Erro");
    }

    return dados;
}

function moeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}