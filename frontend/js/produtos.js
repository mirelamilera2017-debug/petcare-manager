let produtos = [];

async function carregarProdutos() {
    protegerPagina();

    try {
        produtos = await apiFetch("/produtos");
        exibirProdutos(produtos);
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

function exibirProdutos(lista) {
    const tabela = document.getElementById("listaProdutos");
    tabela.innerHTML = "";

    lista.forEach(produto => {
        tabela.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${moeda(produto.preco)}</td>
                <td>${produto.estoque}</td>
                <td>
                    <button class="btn-editar" onclick="editarProduto(${produto.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

async function salvarProduto() {
    const id = document.getElementById("idProduto").value;
    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const preco = document.getElementById("preco").value;
    const estoque = document.getElementById("estoque").value;

    if (!nome || !descricao || !preco || !estoque) {
        alert("Preencha todos os campos.");
        return;
    }

    const produto = {
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque)
    };

    try {
        if (id) {
            await apiFetch(`/produtos/${id}`, {
                method: "PUT",
                body: JSON.stringify(produto)
            });
            alert("Produto atualizado com sucesso!");
        } else {
            await apiFetch("/produtos", {
                method: "POST",
                body: JSON.stringify(produto)
            });
            alert("Produto cadastrado com sucesso!");
        }

        limparFormulario();
        carregarProdutos();

    } catch (erro) {
        console.error("Erro ao salvar produto:", erro);
    }
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id == id);

    if (!produto) return;

    document.getElementById("idProduto").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("descricao").value = produto.descricao;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("estoque").value = produto.estoque;
}

async function excluirProduto(id) {
    if (!confirm("Deseja excluir este produto?")) return;

    try {
        await apiFetch(`/produtos/${id}`, {
            method: "DELETE"
        });

        alert("Produto excluído com sucesso!");
        carregarProdutos();

    } catch (erro) {
        console.error("Erro ao excluir produto:", erro);
    }
}

function filtrarProdutos() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo) ||
        String(produto.preco).includes(termo) ||
        String(produto.estoque).includes(termo)
    );

    exibirProdutos(filtrados);
}

function limparFormulario() {
    document.getElementById("idProduto").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("estoque").value = "";
}