const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("../database");
const { SECRET } = require("../middlewares/authMiddleware");

// Função responsável por cadastrar um novo usuário - [Mirela Santos]
function cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Preencha nome, e-mail e senha" });
    }

    const usuarioExiste = database.usuarios.find(usuario => usuario.email === email);

    if (usuarioExiste) {
        return res.status(400).json({ mensagem: "Este e-mail já está cadastrado" });
    }

    const novoUsuario = {
        id: database.usuarios.length + 1,
        nome,
        email,
        senha: bcrypt.hashSync(senha, 8),
        criadoEm: new Date().toISOString()
    };

    database.usuarios.push(novoUsuario);

    return res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso",
        usuario: {
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            email: novoUsuario.email
        }
    });
}

// Função responsável por autenticar o usuário e gerar token JWT - [Mirela Santos]
function login(req, res) {
    const { email, senha } = req.body;

    const usuario = database.usuarios.find(usuario => usuario.email === email);

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);

    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha inválida" });
    }

    const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, email: usuario.email },
        SECRET,
        { expiresIn: "2h" }
    );

    return res.json({
        mensagem: "Login realizado com sucesso",
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });
}

module.exports = { cadastrar, login };