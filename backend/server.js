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

// CORS liberado para Codespaces e localhost - [Mirela Santos]
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "🐾 API PetCare Manager funcionando!",
        documentacao: "/api-docs"
    });
});

app.use("/auth", authRoutes);
app.use("/tutores", tutorRoutes);
app.use("/pets", petRoutes);
app.use("/produtos", produtoRoutes);
app.use("/servicos", servicoRoutes);
app.use("/agendamentos", agendamentoRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado em http://0.0.0.0:${PORT}`);
});