<?php
// Conectar ao banco de dados SQLite
// $db = new SQLite3('users.db');

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Consulta sem verificação adequada dos dados de entrada (mais suscetível a injeção de SQL)
    $sql = "SELECT * FROM users WHERE username='" . $_POST['username'] . "' AND password='" . $_POST['password'] . "'";
    die($sql);
    // $result = $db->query($sql);

    if (true) //$row = $result->fetchArray(SQLITE3_ASSOC)) {
        // Usuário autenticado com sucesso
    echo "Login bem-sucedido!.";
    } else {
        // Nome de usuário ou senha incorretos
        echo "Nome de usuário ou senha incorretos!";
    }
}
?>