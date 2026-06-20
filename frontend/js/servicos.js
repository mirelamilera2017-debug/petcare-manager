const endpoint = "/servicos";
let listaAtual = [];

async function listar() {
    protegerPagina();
    listaAtual = await apiFetch(endpoint);
    renderizar(listaAtual);
}

function renderizar(lista) {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    lista.forEach(item => {
        tabela.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.descricao}</td>
                <td>${moeda(item.preco)}</td>
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
        descricao: document.getElementById("descricao").value,
        preco: document.getElementById("preco").value
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
    document.getElementById("descricao").value = item.descricao;
    document.getElementById("preco").value = item.preco;
}

async function excluir(id) {
    if (confirm("Deseja realmente excluir este serviço?")) {
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