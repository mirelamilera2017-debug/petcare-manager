const endpoint = "/pets";
let listaAtual = [];

async function listar() {
    protegerPagina();

    await carregarTutores();

    listaAtual = await apiFetch(endpoint);
    renderizar(listaAtual);
}

async function carregarTutores() {
    const tutores = await apiFetch("/tutores");

    const select = document.getElementById("tutorId");
    select.innerHTML = '<option value="">Selecione</option>';

    tutores.forEach(tutor => {
        select.innerHTML += `<option value="${tutor.id}">${tutor.nome}</option>`;
    });
}

function renderizar(lista) {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    lista.forEach(item => {
        tabela.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.especie}</td>
                <td>${item.raca}</td>
                <td>${item.sexo}</td>
                <td>${item.tutorNome}</td>
                <td>
                    <button class="btn-small btn-edit" onclick='editar(${JSON.stringify(item)})'>Editar</button>
                    <button class="btn-small btn-delete" onclick="excluir(${item.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

async function salvar(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;

    const dados = {
        nome: document.getElementById("nome").value,
        especie: document.getElementById("especie").value,
        raca: document.getElementById("raca").value,
        sexo: document.getElementById("sexo").value,
        tutorId: document.getElementById("tutorId").value
    };

    if (id) {
        await apiFetch(`${endpoint}/${id}`, {
            method: "PUT",
            body: JSON.stringify(dados)
        });
    } else {
        await apiFetch(endpoint, {
            method: "POST",
            body: JSON.stringify(dados)
        });
    }

    document.getElementById("formulario").reset();
    document.getElementById("id").value = "";

    listar();
}

function editar(item) {
    document.getElementById("id").value = item.id;
    document.getElementById("nome").value = item.nome;
    document.getElementById("especie").value = item.especie;
    document.getElementById("raca").value = item.raca;
    document.getElementById("sexo").value = item.sexo;
    document.getElementById("tutorId").value = item.tutorId;
}

async function excluir(id) {
    if (confirm("Deseja realmente excluir este pet?")) {
        await apiFetch(`${endpoint}/${id}`, {
            method: "DELETE"
        });

        listar();
    }
}

function pesquisar() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = listaAtual.filter(item =>
        JSON.stringify(item).toLowerCase().includes(termo)
    );

    renderizar(filtrados);
}