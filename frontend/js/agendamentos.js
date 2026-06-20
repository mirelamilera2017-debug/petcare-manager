let listaAtual = [];

async function listar() {
    protegerPagina();

    await carregarSelects();

    listaAtual = await apiFetch("/agendamentos");

    renderizar(listaAtual);
}

async function carregarSelects() {
    const tutores = await apiFetch("/tutores");
    const pets = await apiFetch("/pets");
    const servicos = await apiFetch("/servicos");

    preencherSelect("tutorId", tutores, "nome");
    preencherSelect("petId", pets, "nome");
    preencherSelect("servicoId", servicos, "nome");
}

function preencherSelect(id, dados, campo) {
    const select = document.getElementById(id);

    select.innerHTML = '<option value="">Selecione</option>';

    dados.forEach(item => {
        select.innerHTML += `
            <option value="${item.id}">
                ${item[campo]}
            </option>
        `;
    });
}

function renderizar(lista) {
    const tabela = document.getElementById("tabela");

    tabela.innerHTML = "";

    lista.forEach(item => {
        tabela.innerHTML += `
            <tr>
                <td>${item.tutorNome}</td>
                <td>${item.petNome}</td>
                <td>${item.servicoNome}</td>
                <td>${item.data}</td>
                <td>${item.hora}</td>
                <td>${moeda(item.valorTotal)}</td>
                <td>
                    <span class="badge badge-${item.status}">
                        ${item.status}
                    </span>
                </td>
                <td>
                    <button class="btn-small btn-edit" onclick='editar(${JSON.stringify(item)})'>
                        Editar
                    </button>

                    <button class="btn-small btn-success" onclick="finalizar(${item.id})">
                        Finalizar
                    </button>

                    <button class="btn-small btn-warning" onclick="cancelar(${item.id})">
                        Cancelar
                    </button>

                    <button class="btn-small btn-delete" onclick="excluir(${item.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

async function salvar(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;

    const dados = {
        tutorId: document.getElementById("tutorId").value,
        petId: document.getElementById("petId").value,
        servicoId: document.getElementById("servicoId").value,
        data: document.getElementById("data").value,
        hora: document.getElementById("hora").value,
        status: document.getElementById("status").value
    };

    if (id) {
        await apiFetch(`/agendamentos/${id}`, {
            method: "PUT",
            body: JSON.stringify(dados)
        });
    } else {
        await apiFetch("/agendamentos", {
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
    document.getElementById("tutorId").value = item.tutorId;
    document.getElementById("petId").value = item.petId;
    document.getElementById("servicoId").value = item.servicoId;
    document.getElementById("data").value = item.data;
    document.getElementById("hora").value = item.hora;
    document.getElementById("status").value = item.status;
}

async function cancelar(id) {
    await apiFetch(`/agendamentos/${id}/cancelar`, {
        method: "PATCH"
    });

    listar();
}

async function finalizar(id) {
    await apiFetch(`/agendamentos/${id}/finalizar`, {
        method: "PATCH"
    });

    listar();
}

async function excluir(id) {
    if (confirm("Deseja realmente excluir este agendamento?")) {
        await apiFetch(`/agendamentos/${id}`, {
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