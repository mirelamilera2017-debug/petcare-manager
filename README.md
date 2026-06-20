# PetCare Manager

Sistema Full Stack desenvolvido para gerenciamento administrativo de um Pet Shop.

## Objetivo

Desenvolver uma aplicação web completa utilizando HTML, CSS, JavaScript e Node.js, com autenticação JWT, API REST e documentação Swagger.

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* Express
* JWT (JSON Web Token)
* Swagger
* Fetch API
* CORS

---

## Funcionalidades

* Login de usuários
* Cadastro de usuários
* Dashboard administrativo
* CRUD de Tutores
* CRUD de Pets
* CRUD de Produtos
* CRUD de Serviços
* CRUD de Agendamentos
* Finalizar Agendamento
* Cancelar Agendamento
* API REST documentada com Swagger

---

## Estrutura do Projeto

```
PETSHOP-FULLSTACK
│
├── backend
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── database.js
│   ├── server.js
│   └── swagger.js
│
├── frontend
│   ├── css
│   ├── js
│   ├── login.html
│   ├── dashboard.html
│   ├── tutores.html
│   ├── pets.html
│   ├── produtos.html
│   ├── servicos.html
│   └── agendamentos.html
│
└── README.md
```

---

## Como executar

### Backend

```bash
cd backend
npm install
npm run dev
```

Servidor:

```
http://localhost:3000
```

---

### Swagger

```
http://localhost:3000/api-docs
```

---

### Frontend

Abra o arquivo:

```
frontend/login.html
```

Preferencialmente utilizando a extensão **Live Server** do Visual Studio Code.

---

## Autenticação

O sistema utiliza JWT para autenticação dos usuários, protegendo as rotas privadas da aplicação.

---

## Comunicação

A comunicação entre o frontend e o backend foi implementada utilizando a **Fetch API**, realizando requisições HTTP para a API REST.

---

## Desenvolvedora

**Mirela Santos**

Projeto desenvolvido para a disciplina de Desenvolvimento Full Stack.
