<?php
// Conectar ao banco de dados SQLite
$db = new SQLite3('users.db');

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Preparar e executar a consulta segura
    $stmt = $db->prepare("SELECT * FROM users WHERE username=:username AND password=:password");
    $stmt->bindValue(':username', $_POST['username']);
    $stmt->bindValue(':password', $_POST['password']);
    $result = $stmt->execute();

    if ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        // Usuário autenticado com sucesso
        echo "Login bem-sucedido! Bem-vindo, " . $row['username'] . ".";
    } else {
        // Nome de usuário ou senha incorretos
        echo "Nome de usuário ou senha incorretos!";
    }
}
?>