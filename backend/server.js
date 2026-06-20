const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const petRoutes = require("./routes/petRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");

const swaggerDocument = require("./swagger");

const app = express();

// CORS liberado para o frontend local e Codespaces - [Mirela Santos]
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Rota inicial da API - [Mirela Santos]
app.get("/", (req, res) => {
    res.json({
        mensagem: "🐾 API PetCare Manager funcionando!",
        documentacao: "/api-docs"
    });
});

// Rotas do sistema - [Mirela Santos]
app.use("/auth", authRoutes);
app.use("/tutores", tutorRoutes);
app.use("/pets", petRoutes);
app.use("/produtos", produtoRoutes);
app.use("/servicos", servicoRoutes);
app.use("/agendamentos", agendamentoRoutes);

// Documentação Swagger - [Mirela Santos]
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});