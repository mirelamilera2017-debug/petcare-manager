const database = require("../database");

// Listar produtos - [Mirela Santos]
function listar(req, res) {
    res.json(database.produtos);
}

// Buscar produto
function buscar(req, res) {
    const produto = database.produtos.find(p => p.id == req.params.id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado."
        });
    }

    res.json(produto);
}

// Criar produto
function criar(req, res) {

    const {
        nome,
        descricao,
        preco,
        estoque
    } = req.body;

    if (!nome || !descricao || !preco || estoque == null) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    const produto = {

        id: database.produtos.length + 1,

        nome,

        descricao,

        preco,

        estoque

    };

    database.produtos.push(produto);

    res.status(201).json({
        mensagem: "Produto cadastrado.",
        produto
    });

}

// Atualizar produto
function atualizar(req, res) {

    const produto = database.produtos.find(
        p => p.id == req.params.id
    );

    if (!produto) {

        return res.status(404).json({
            mensagem: "Produto não encontrado."
        });

    }

    produto.nome = req.body.nome;
    produto.descricao = req.body.descricao;
    produto.preco = req.body.preco;
    produto.estoque = req.body.estoque;

    res.json({
        mensagem: "Produto atualizado.",
        produto
    });

}

// Excluir produto
function excluir(req, res) {

    const indice = database.produtos.findIndex(
        p => p.id == req.params.id
    );

    if (indice == -1) {

        return res.status(404).json({
            mensagem: "Produto não encontrado."
        });

    }

    database.produtos.splice(indice, 1);

    res.json({
        mensagem: "Produto removido."
    });

}

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    excluir
};