const agendamentoRoutes = require("./routes/agendamentoRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const petRoutes = require("./routes/petRoutes");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const tutorRoutes = require("./routes/tutorRoutes");

const swaggerDocument = require("./swagger");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tutores", tutorRoutes);
app.use("/pets", petRoutes);
app.use("/produtos", produtoRoutes);
app.use("/servicos", servicoRoutes);
app.use("/agendamentos", agendamentoRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.json({
        mensagem: "🐾 API PetCare Manager funcionando!",
        documentacao: "http://localhost:3000/api-docs"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});