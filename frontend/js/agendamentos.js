let agendamentos = [];
let tutores = [];
let pets = [];
let servicos = [];

async function carregarAgendamentos() {
    protegerPagina();

    try {
        tutores = await apiFetch("/tutores");
        pets = await apiFetch("/pets");
        servicos = await apiFetch("/servicos");
        agendamentos = await apiFetch("/agendamentos");

        carregarSelects();
        exibirAgendamentos(agendamentos);

    } catch (erro) {
        console.error("Erro ao carregar agendamentos:", erro);
    }
}

function carregarSelects() {
    const selectTutor = document.getElementById("tutorId");
    const selectPet = document.getElementById("petId");
    const selectServico = document.getElementById("servicoId");

    selectTutor.innerHTML = `<option value="">Selecione</option>`;
    selectPet.innerHTML = `<option value="">Selecione</option>`;
    selectServico.innerHTML = `<option value="">Selecione</option>`;

    tutores.forEach(tutor => {
        selectTutor.innerHTML += `<option value="${tutor.id}">${tutor.nome}</option>`;
    });

    pets.forEach(pet => {
        selectPet.innerHTML += `<option value="${pet.id}">${pet.nome}</option>`;
    });

    servicos.forEach(servico => {
        selectServico.innerHTML += `<option value="${servico.id}">${servico.nome} - ${moeda(servico.preco)}</option>`;
    });
}

function nomeTutor(id) {
    const tutor = tutores.find(t => t.id == id);
    return tutor ? tutor.nome : "Não informado";
}

function nomePet(id) {
    const pet = pets.find(p => p.id == id);
    return pet ? pet.nome : "Não informado";
}

function nomeServico(id) {
    const servico = servicos.find(s => s.id == id);
    return servico ? servico.nome : "Não informado";
}

function valorServico(id) {
    const servico = servicos.find(s => s.id == id);
    return servico ? servico.preco : 0;
}

function exibirAgendamentos(lista) {
    const tabela = document.getElementById("listaAgendamentos");
    tabela.innerHTML = "";

    lista.forEach(agendamento => {
        tabela.innerHTML += `
            <tr>
                <td>${agendamento.tutorNome || nomeTutor(agendamento.tutorId)}</td>
                <td>${agendamento.petNome || nomePet(agendamento.petId)}</td>
                <td>${agendamento.servicoNome || nomeServico(agendamento.servicoId)}</td>
                <td>${agendamento.data}</td>
                <td>${agendamento.hora}</td>
                <td>${agendamento.status}</td>
                <td>${moeda(agendamento.valorTotal || valorServico(agendamento.servicoId))}</td>
                <td>
                    <button class="btn-editar" onclick="editarAgendamento(${agendamento.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirAgendamento(${agendamento.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

async function salvarAgendamento() {
    const id = document.getElementById("idAgendamento").value;
    const tutorId = document.getElementById("tutorId").value;
    const petId = document.getElementById("petId").value;
    const servicoId = document.getElementById("servicoId").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const status = document.getElementById("status").value;

    if (!tutorId || !petId || !servicoId || !data || !hora || !status) {
        alert("Preencha todos os campos.");
        return;
    }

    const agendamento = {
        tutorId: Number(tutorId),
        petId: Number(petId),
        servicoId: Number(servicoId),
        data,
        hora,
        status
    };

    try {
        if (id) {
            await apiFetch(`/agendamentos/${id}`, {
                method: "PUT",
                body: JSON.stringify(agendamento)
            });

            alert("Agendamento atualizado com sucesso!");
        } else {
            await apiFetch("/agendamentos", {
                method: "POST",
                body: JSON.stringify(agendamento)
            });

            alert("Agendamento cadastrado com sucesso!");
        }

        limparFormulario();
        carregarAgendamentos();

    } catch (erro) {
        console.error("Erro ao salvar agendamento:", erro);
    }
}

function editarAgendamento(id) {
    const agendamento = agendamentos.find(a => a.id == id);

    if (!agendamento) return;

    document.getElementById("idAgendamento").value = agendamento.id;
    document.getElementById("tutorId").value = agendamento.tutorId;
    document.getElementById("petId").value = agendamento.petId;
    document.getElementById("servicoId").value = agendamento.servicoId;
    document.getElementById("data").value = agendamento.data;
    document.getElementById("hora").value = agendamento.hora;
    document.getElementById("status").value = agendamento.status;
}

async function excluirAgendamento(id) {
    if (!confirm("Deseja excluir este agendamento?")) return;

    try {
        await apiFetch(`/agendamentos/${id}`, {
            method: "DELETE"
        });

        alert("Agendamento excluído com sucesso!");
        carregarAgendamentos();

    } catch (erro) {
        console.error("Erro ao excluir agendamento:", erro);
    }
}

function filtrarAgendamentos() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = agendamentos.filter(agendamento =>
        String(agendamento.data).toLowerCase().includes(termo) ||
        String(agendamento.hora).toLowerCase().includes(termo) ||
        String(agendamento.status).toLowerCase().includes(termo) ||
        nomeTutor(agendamento.tutorId).toLowerCase().includes(termo) ||
        nomePet(agendamento.petId).toLowerCase().includes(termo) ||
        nomeServico(agendamento.servicoId).toLowerCase().includes(termo)
    );

    exibirAgendamentos(filtrados);
}

function limparFormulario() {
    document.getElementById("idAgendamento").value = "";
    document.getElementById("tutorId").value = "";
    document.getElementById("petId").value = "";
    document.getElementById("servicoId").value = "";
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("status").value = "Agendado";
}