const database = require("../database");

// Listar todos os tutores - [Mirela Santos]
function listar(req, res) {
    res.json(database.tutores);
}

// Buscar tutor por ID - [Mirela Santos]
function buscar(req, res) {
    const tutor = database.tutores.find(
        t => t.id == req.params.id
    );

    if (!tutor) {
        return res.status(404).json({
            mensagem: "Tutor não encontrado"
        });
    }

    res.json(tutor);
}

// Cadastrar tutor - [Mirela Santos]
function criar(req, res) {

    const {
        nome,
        telefone,
        endereco
    } = req.body;

    if (!nome || !telefone || !endereco) {

        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });

    }

    const tutor = {

        id: database.tutores.length + 1,

        nome,

        telefone,

        endereco

    };

    database.tutores.push(tutor);

    res.status(201).json({
        mensagem: "Tutor cadastrado com sucesso.",
        tutor
    });

}

// Atualizar tutor - [Mirela Santos]
function atualizar(req, res) {

    const tutor = database.tutores.find(
        t => t.id == req.params.id
    );

    if (!tutor) {

        return res.status(404).json({
            mensagem: "Tutor não encontrado."
        });

    }

    tutor.nome = req.body.nome;
    tutor.telefone = req.body.telefone;
    tutor.endereco = req.body.endereco;

    res.json({
        mensagem: "Tutor atualizado.",
        tutor
    });

}

// Excluir tutor - [Mirela Santos]
function excluir(req, res) {

    const indice = database.tutores.findIndex(
        t => t.id == req.params.id
    );

    if (indice == -1) {

        return res.status(404).json({
            mensagem: "Tutor não encontrado."
        });

    }

    database.tutores.splice(indice, 1);

    res.json({
        mensagem: "Tutor removido."
    });

}

module.exports = {

    listar,

    buscar,

    criar,

    atualizar,

    excluir

};