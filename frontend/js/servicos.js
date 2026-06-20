let servicos = [];

async function carregarServicos() {
    protegerPagina();

    try {
        servicos = await apiFetch("/servicos");
        exibirServicos(servicos);
    } catch (erro) {
        console.error("Erro ao carregar serviços:", erro);
    }
}

function exibirServicos(lista) {
    const tabela = document.getElementById("listaServicos");
    tabela.innerHTML = "";

    lista.forEach(servico => {
        tabela.innerHTML += `
            <tr>
                <td>${servico.nome}</td>
                <td>${servico.descricao}</td>
                <td>${moeda(servico.preco)}</td>
                <td>
                    <button class="btn-editar" onclick="editarServico(${servico.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirServico(${servico.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

async function salvarServico() {
    const id = document.getElementById("idServico").value;
    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const preco = document.getElementById("preco").value;

    if (!nome || !descricao || !preco) {
        alert("Preencha todos os campos.");
        return;
    }

    const servico = {
        nome,
        descricao,
        preco: Number(preco)
    };

    try {
        if (id) {
            await apiFetch(`/servicos/${id}`, {
                method: "PUT",
                body: JSON.stringify(servico)
            });
            alert("Serviço atualizado com sucesso!");
        } else {
            await apiFetch("/servicos", {
                method: "POST",
                body: JSON.stringify(servico)
            });
            alert("Serviço cadastrado com sucesso!");
        }

        limparFormulario();
        carregarServicos();

    } catch (erro) {
        console.error("Erro ao salvar serviço:", erro);
    }
}

function editarServico(id) {
    const servico = servicos.find(s => s.id == id);

    if (!servico) return;

    document.getElementById("idServico").value = servico.id;
    document.getElementById("nome").value = servico.nome;
    document.getElementById("descricao").value = servico.descricao;
    document.getElementById("preco").value = servico.preco;
}

async function excluirServico(id) {
    if (!confirm("Deseja excluir este serviço?")) return;

    try {
        await apiFetch(`/servicos/${id}`, {
            method: "DELETE"
        });

        alert("Serviço excluído com sucesso!");
        carregarServicos();

    } catch (erro) {
        console.error("Erro ao excluir serviço:", erro);
    }
}

function filtrarServicos() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = servicos.filter(servico =>
        servico.nome.toLowerCase().includes(termo) ||
        servico.descricao.toLowerCase().includes(termo) ||
        String(servico.preco).includes(termo)
    );

    exibirServicos(filtrados);
}

function limparFormulario() {
    document.getElementById("idServico").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
}