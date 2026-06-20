const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "API PetCare Manager",
        version: "1.0.0",
        description: "Sistema Fullstack para gerenciamento de PetShop"
    },
    servers: [{ url: "http://localhost:3000" }],
    paths: {
        "/auth/cadastro": { post: { tags: ["Autenticação"], summary: "Cadastrar usuário" } },
        "/auth/login": { post: { tags: ["Autenticação"], summary: "Login do usuário" } },

        "/tutores": {
            get: { tags: ["Tutores"], summary: "Listar tutores" },
            post: { tags: ["Tutores"], summary: "Cadastrar tutor" }
        },
        "/tutores/{id}": {
            get: { tags: ["Tutores"], summary: "Buscar tutor" },
            put: { tags: ["Tutores"], summary: "Atualizar tutor" },
            delete: { tags: ["Tutores"], summary: "Excluir tutor" }
        },

        "/pets": {
            get: { tags: ["Pets"], summary: "Listar pets" },
            post: { tags: ["Pets"], summary: "Cadastrar pet" }
        },
        "/pets/{id}": {
            get: { tags: ["Pets"], summary: "Buscar pet" },
            put: { tags: ["Pets"], summary: "Atualizar pet" },
            delete: { tags: ["Pets"], summary: "Excluir pet" }
        },

        "/produtos": {
            get: { tags: ["Produtos"], summary: "Listar produtos" },
            post: { tags: ["Produtos"], summary: "Cadastrar produto" }
        },
        "/produtos/{id}": {
            get: { tags: ["Produtos"], summary: "Buscar produto" },
            put: { tags: ["Produtos"], summary: "Atualizar produto" },
            delete: { tags: ["Produtos"], summary: "Excluir produto" }
        },

        "/servicos": {
            get: { tags: ["Serviços"], summary: "Listar serviços" },
            post: { tags: ["Serviços"], summary: "Cadastrar serviço" }
        },
        "/servicos/{id}": {
            get: { tags: ["Serviços"], summary: "Buscar serviço" },
            put: { tags: ["Serviços"], summary: "Atualizar serviço" },
            delete: { tags: ["Serviços"], summary: "Excluir serviço" }
        },

        "/agendamentos": {
            get: { tags: ["Agendamentos"], summary: "Listar agendamentos" },
            post: { tags: ["Agendamentos"], summary: "Cadastrar agendamento" }
        },
        "/agendamentos/{id}": {
            get: { tags: ["Agendamentos"], summary: "Buscar agendamento" },
            put: { tags: ["Agendamentos"], summary: "Atualizar agendamento" },
            delete: { tags: ["Agendamentos"], summary: "Excluir agendamento" }
        },
        "/agendamentos/{id}/cancelar": {
            patch: { tags: ["Agendamentos"], summary: "Cancelar agendamento" }
        },
        "/agendamentos/{id}/finalizar": {
            patch: { tags: ["Agendamentos"], summary: "Finalizar agendamento" }
        }
    }
};

module.exports = swaggerDocument;