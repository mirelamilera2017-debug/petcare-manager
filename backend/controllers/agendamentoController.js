const database = require("../database");

// Listar agendamentos - [Mirela Santos]
function listar(req, res) {
    const agendamentos = database.agendamentos.map(agendamento => {
        const tutor = database.tutores.find(t => t.id == agendamento.tutorId);
        const pet = database.pets.find(p => p.id == agendamento.petId);
        const servico = database.servicos.find(s => s.id == agendamento.servicoId);

        return {
            ...agendamento,
            tutorNome: tutor ? tutor.nome : "Tutor não encontrado",
            petNome: pet ? pet.nome : "Pet não encontrado",
            servicoNome: servico ? servico.nome : "Serviço não encontrado"
        };
    });

    res.json(agendamentos);
}

// Buscar agendamento por ID - [Mirela Santos]
function buscar(req, res) {
    const agendamento = database.agendamentos.find(a => a.id == req.params.id);

    if (!agendamento) {
        return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    res.json(agendamento);
}

// Cadastrar agendamento - [Mirela Santos]
function criar(req, res) {
    const { tutorId, petId, servicoId, data, hora, status } = req.body;

    if (!tutorId || !petId || !servicoId || !data || !hora) {
        return res.status(400).json({
            mensagem: "Preencha tutor, pet, serviço, data e hora."
        });
    }

    const tutorExiste = database.tutores.find(t => t.id == tutorId);
    const petExiste = database.pets.find(p => p.id == petId);
    const servicoExiste = database.servicos.find(s => s.id == servicoId);

    if (!tutorExiste) {
        return res.status(400).json({ mensagem: "Tutor não encontrado." });
    }

    if (!petExiste) {
        return res.status(400).json({ mensagem: "Pet não encontrado." });
    }

    if (!servicoExiste) {
        return res.status(400).json({ mensagem: "Serviço não encontrado." });
    }

    const agendamento = {
        id: database.agendamentos.length + 1,
        tutorId,
        petId,
        servicoId,
        data,
        hora,
        status: status || "Agendado",
        valorTotal: servicoExiste.preco
    };

    database.agendamentos.push(agendamento);

    res.status(201).json({
        mensagem: "Agendamento cadastrado.",
        agendamento
    });
}

// Atualizar agendamento - [Mirela Santos]
function atualizar(req, res) {
    const agendamento = database.agendamentos.find(a => a.id == req.params.id);

    if (!agendamento) {
        return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    agendamento.tutorId = req.body.tutorId;
    agendamento.petId = req.body.petId;
    agendamento.servicoId = req.body.servicoId;
    agendamento.data = req.body.data;
    agendamento.hora = req.body.hora;
    agendamento.status = req.body.status;

    const servico = database.servicos.find(s => s.id == req.body.servicoId);
    agendamento.valorTotal = servico ? servico.preco : agendamento.valorTotal;

    res.json({
        mensagem: "Agendamento atualizado.",
        agendamento
    });
}

// Cancelar agendamento - [Mirela Santos]
function cancelar(req, res) {
    const agendamento = database.agendamentos.find(a => a.id == req.params.id);

    if (!agendamento) {
        return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    agendamento.status = "Cancelado";

    res.json({
        mensagem: "Agendamento cancelado.",
        agendamento
    });
}

// Finalizar agendamento - [Mirela Santos]
function finalizar(req, res) {
    const agendamento = database.agendamentos.find(a => a.id == req.params.id);

    if (!agendamento) {
        return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    agendamento.status = "Finalizado";

    res.json({
        mensagem: "Agendamento finalizado.",
        agendamento
    });
}

// Excluir agendamento - [Mirela Santos]
function excluir(req, res) {
    const indice = database.agendamentos.findIndex(a => a.id == req.params.id);

    if (indice == -1) {
        return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    database.agendamentos.splice(indice, 1);

    res.json({ mensagem: "Agendamento removido." });
}

module.exports = {
    listar,
    buscar,
    criar,
    atualizar,
    cancelar,
    finalizar,
    excluir
};