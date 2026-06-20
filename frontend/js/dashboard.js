async function carregarDashboard() {
    protegerPagina();

    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        const nomeFormatado = usuario.nome
            .split(" ")
            .map(nome => nome.charAt(0).toUpperCase() + nome.slice(1))
            .join(" ");

        document.getElementById("usuario").innerHTML =
            `Bem-vindo(a), <strong>${nomeFormatado}</strong>`;
    }

    try {
        const tutores = await apiFetch("/tutores");
        const pets = await apiFetch("/pets");
        const produtos = await apiFetch("/produtos");
        const servicos = await apiFetch("/servicos");
        const agendamentos = await apiFetch("/agendamentos");

        document.getElementById("qtTutores").textContent = tutores.length;
        document.getElementById("qtPets").textContent = pets.length;
        document.getElementById("qtProdutos").textContent = produtos.length;
        document.getElementById("qtServicos").textContent = servicos.length;
        document.getElementById("qtAgendamentos").textContent = agendamentos.length;

    } catch (erro) {
        console.error("Erro ao carregar dashboard:", erro);
    }
}