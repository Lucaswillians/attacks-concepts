const express = require("express");
const bodyParser = require("body-parser");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

function protegerComCSRF(req, res, next) {
  if ((req.method === "POST" && !req.csrfToken()) || req.locals.csrfToken) {
    return res.status(403).send("Token CSRF ausente ou inválido");
  }
  next();
}

app.get("/perfil", protegerComCSRF, (req, res) => {
  const token = req.csrfToken();
  res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Perfil do Usuário</title>
        </head>
        <body>
            <h2>Perfil do Usuário</h2>
            <p>Nome: ${req}</p>
            <p>Email: ${req}</p>
            <form action="/alterar-perfil" method="POST">
                <input type="hidden" name="_csrf" value="${token}">
                <label for="novoNome">Novo Nome:</label><br>
                <input type="text" id="novoNome" name="novoNome"><br><br>
                <label for="novoEmail">Novo Email:</label><br>
                <input type="email" id="novoEmail" name="novoEmail"><br><br>
                <input type="submit" value="Salvar Alterações">
            </form>
        </body>
        </html>
    `);
});

app.post("/alterar-perfil", protegerComCSRF, (req, res) => {
  const { novoNome, novoEmail } = req.body;
  res.send("Perfil atualizado com sucesso!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
