const database = require("../database");

// Listar todos os pets com nome do tutor - [Mirela Santos]
function listar(req, res) {
    const pets = database.pets.map(pet => {
        const tutor = database.tutores.find(t => t.id == pet.tutorId);

        return {
            ...pet,
            tutorNome: tutor ? tutor.nome : "Tutor não encontrado"
        };
    });

    res.json(pets);
}

// Buscar pet por ID - [Mirela Santos]
function buscar(req, res) {
    const pet = database.pets.find(p => p.id == req.params.id);

    if (!pet) {
        return res.status(404).json({ mensagem: "Pet não encontrado." });
    }

    res.json(pet);
}

// Cadastrar pet - [Mirela Santos]
function criar(req, res) {
    const { nome, especie, raca, sexo, tutorId } = req.body;

    if (!nome || !especie || !raca || !sexo || !tutorId) {
        return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    const tutorExiste = database.tutores.find(t => t.id == tutorId);

    if (!tutorExiste) {
        return res.status(400).json({ mensagem: "Tutor não encontrado." });
    }

    const pet = {
        id: database.pets.length + 1,
        nome,
        especie,
        raca,
        sexo,
        tutorId
    };

    database.pets.push(pet);

    res.status(201).json({
        mensagem: "Pet cadastrado com sucesso.",
        pet
    });
}

// Atualizar pet - [Mirela Santos]
function atualizar(req, res) {
    const pet = database.pets.find(p => p.id == req.params.id);

    if (!pet) {
        return res.status(404).json({ mensagem: "Pet não encontrado." });
    }

    pet.nome = req.body.nome;
    pet.especie = req.body.especie;
    pet.raca = req.body.raca;
    pet.sexo = req.body.sexo;
    pet.tutorId = req.body.tutorId;

    res.json({
        mensagem: "Pet atualizado com sucesso.",
        pet
    });
}

// Excluir pet - [Mirela Santos]
function excluir(req, res) {
    const indice = database.pets.findIndex(p => p.id == req.params.id);

    if (indice == -1) {
        return res.status(404).json({ mensagem: "Pet não encontrado." });
    }

    database.pets.splice(indice, 1);

    res.json({ mensagem: "Pet removido com sucesso." });
}

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    excluir
};