let tutores = [];

async function carregarTutores() {
    protegerPagina();

    try {
        tutores = await apiFetch("/tutores");
        exibirTutores(tutores);
    } catch (erro) {
        console.error("Erro ao carregar tutores:", erro);
    }
}

function exibirTutores(lista) {
    const tabela = document.getElementById("listaTutores");
    tabela.innerHTML = "";

    lista.forEach(tutor => {
        tabela.innerHTML += `
            <tr>
                <td>${tutor.nome}</td>
                <td>${tutor.telefone || tutor.contato || ""}</td>
                <td>${tutor.endereco || ""}</td>
                <td>
                    <button class="btn-editar" onclick="editarTutor(${tutor.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirTutor(${tutor.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

async function salvarTutor() {
    const id = document.getElementById("idTutor").value;
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();

    if (!nome || !telefone || !endereco) {
        alert("Preencha todos os campos.");
        return;
    }

    const tutor = { nome, telefone, endereco };

    try {
        if (id) {
            await apiFetch(`/tutores/${id}`, {
                method: "PUT",
                body: JSON.stringify(tutor)
            });
            alert("Tutor atualizado com sucesso!");
        } else {
            await apiFetch("/tutores", {
                method: "POST",
                body: JSON.stringify(tutor)
            });
            alert("Tutor cadastrado com sucesso!");
        }

        limparFormulario();
        carregarTutores();

    } catch (erro) {
        console.error("Erro ao salvar tutor:", erro);
    }
}

function editarTutor(id) {
    const tutor = tutores.find(t => t.id == id);

    if (!tutor) return;

    document.getElementById("idTutor").value = tutor.id;
    document.getElementById("nome").value = tutor.nome;
    document.getElementById("telefone").value = tutor.telefone || tutor.contato || "";
    document.getElementById("endereco").value = tutor.endereco || "";
}

async function excluirTutor(id) {
    if (!confirm("Deseja excluir este tutor?")) return;

    try {
        await apiFetch(`/tutores/${id}`, {
            method: "DELETE"
        });

        alert("Tutor excluído com sucesso!");
        carregarTutores();

    } catch (erro) {
        console.error("Erro ao excluir tutor:", erro);
    }
}

function filtrarTutores() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = tutores.filter(tutor =>
        tutor.nome.toLowerCase().includes(termo) ||
        String(tutor.telefone || "").toLowerCase().includes(termo) ||
        String(tutor.endereco || "").toLowerCase().includes(termo)
    );

    exibirTutores(filtrados);
}

function limparFormulario() {
    document.getElementById("idTutor").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
}