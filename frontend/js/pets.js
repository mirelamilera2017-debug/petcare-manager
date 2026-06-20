let pets = [];
let tutores = [];

async function carregarPets() {
    protegerPagina();

    try {
        tutores = await apiFetch("/tutores");
        pets = await apiFetch("/pets");

        carregarSelectTutores();
        exibirPets(pets);

    } catch (erro) {
        console.error("Erro ao carregar pets:", erro);
    }
}

function carregarSelectTutores() {
    const select = document.getElementById("tutorId");
    select.innerHTML = `<option value="">Selecione</option>`;

    tutores.forEach(tutor => {
        select.innerHTML += `
            <option value="${tutor.id}">${tutor.nome}</option>
        `;
    });
}

function buscarNomeTutor(tutorId) {
    const tutor = tutores.find(t => t.id == tutorId);
    return tutor ? tutor.nome : "Não informado";
}

function exibirPets(lista) {
    const tabela = document.getElementById("listaPets");
    tabela.innerHTML = "";

    lista.forEach(pet => {
        tabela.innerHTML += `
            <tr>
                <td>${pet.nome}</td>
                <td>${pet.especie}</td>
                <td>${pet.raca}</td>
                <td>${pet.sexo}</td>
                <td>${buscarNomeTutor(pet.tutorId)}</td>
                <td>
                    <button class="btn-editar" onclick="editarPet(${pet.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirPet(${pet.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

async function salvarPet() {
    const id = document.getElementById("idPet").value;
    const nome = document.getElementById("nome").value.trim();
    const especie = document.getElementById("especie").value.trim();
    const raca = document.getElementById("raca").value.trim();
    const sexo = document.getElementById("sexo").value;
    const tutorId = document.getElementById("tutorId").value;

    if (!nome || !especie || !raca || !sexo || !tutorId) {
        alert("Preencha todos os campos.");
        return;
    }

    const pet = {
        nome,
        especie,
        raca,
        sexo,
        tutorId: Number(tutorId)
    };

    try {
        if (id) {
            await apiFetch(`/pets/${id}`, {
                method: "PUT",
                body: JSON.stringify(pet)
            });
            alert("Pet atualizado com sucesso!");
        } else {
            await apiFetch("/pets", {
                method: "POST",
                body: JSON.stringify(pet)
            });
            alert("Pet cadastrado com sucesso!");
        }

        limparFormulario();
        carregarPets();

    } catch (erro) {
        console.error("Erro ao salvar pet:", erro);
    }
}

function editarPet(id) {
    const pet = pets.find(p => p.id == id);

    if (!pet) return;

    document.getElementById("idPet").value = pet.id;
    document.getElementById("nome").value = pet.nome;
    document.getElementById("especie").value = pet.especie;
    document.getElementById("raca").value = pet.raca;
    document.getElementById("sexo").value = pet.sexo;
    document.getElementById("tutorId").value = pet.tutorId;
}

async function excluirPet(id) {
    if (!confirm("Deseja excluir este pet?")) return;

    try {
        await apiFetch(`/pets/${id}`, {
            method: "DELETE"
        });

        alert("Pet excluído com sucesso!");
        carregarPets();

    } catch (erro) {
        console.error("Erro ao excluir pet:", erro);
    }
}

function filtrarPets() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = pets.filter(pet =>
        pet.nome.toLowerCase().includes(termo) ||
        pet.especie.toLowerCase().includes(termo) ||
        pet.raca.toLowerCase().includes(termo) ||
        pet.sexo.toLowerCase().includes(termo) ||
        buscarNomeTutor(pet.tutorId).toLowerCase().includes(termo)
    );

    exibirPets(filtrados);
}

function limparFormulario() {
    document.getElementById("idPet").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("especie").value = "";
    document.getElementById("raca").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("tutorId").value = "";
}