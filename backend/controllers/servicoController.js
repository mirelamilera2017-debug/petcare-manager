const database = require("../database");

// Listar serviços - [Mirela Santos]
function listar(req, res) {
    res.json(database.servicos);
}

// Buscar serviço por ID - [Mirela Santos]
function buscar(req, res) {
    const servico = database.servicos.find(s => s.id == req.params.id);

    if (!servico) {
        return res.status(404).json({ mensagem: "Serviço não encontrado." });
    }

    res.json(servico);
}

// Cadastrar serviço - [Mirela Santos]
function criar(req, res) {
    const { nome, descricao, preco } = req.body;

    if (!nome || !descricao || !preco) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    const servico = {
        id: database.servicos.length + 1,
        nome,
        descricao,
        preco
    };

    database.servicos.push(servico);

    res.status(201).json({
        mensagem: "Serviço cadastrado.",
        servico
    });
}

// Atualizar serviço - [Mirela Santos]
function atualizar(req, res) {
    const servico = database.servicos.find(s => s.id == req.params.id);

    if (!servico) {
        return res.status(404).json({ mensagem: "Serviço não encontrado." });
    }

    servico.nome = req.body.nome;
    servico.descricao = req.body.descricao;
    servico.preco = req.body.preco;

    res.json({
        mensagem: "Serviço atualizado.",
        servico
    });
}

// Excluir serviço - [Mirela Santos]
function excluir(req, res) {
    const indice = database.servicos.findIndex(s => s.id == req.params.id);

    if (indice == -1) {
        return res.status(404).json({ mensagem: "Serviço não encontrado." });
    }

    database.servicos.splice(indice, 1);

    res.json({ mensagem: "Serviço removido." });
}

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    excluir
};