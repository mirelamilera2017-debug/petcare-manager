async function carregarDashboard() {
    protegerPagina();

    const usuario = localStorage.getItem("usuario");

    if (usuario) {
        document.getElementById("usuario").innerHTML =
            `Bem-vindo(a), <strong>${usuario}</strong>`;
    }

    const tutores = await apiFetch("/tutores");
    const pets = await apiFetch("/pets");
    const produtos = await apiFetch("/produtos");
    const servicos = await apiFetch("/servicos");
    const agendamentos = await apiFetch("/agendamentos");

    document.getElementById("qtTutores").innerHTML = tutores.length;
    document.getElementById("qtPets").innerHTML = pets.length;
    document.getElementById("qtProdutos").innerHTML = produtos.length;
    document.getElementById("qtServicos").innerHTML = servicos.length;
    document.getElementById("qtAgendamentos").innerHTML = agendamentos.length;
}