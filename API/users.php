<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "creative_store");
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if ($method == "GET") {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $result = $conn->query("SELECT * FROM users WHERE id = $id");
        echo json_encode($result->fetch_assoc());
    } else {
        $result = $conn->query("SELECT * FROM users");
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
    }
}
elseif ($method == "POST") {
    $email = $input['email'];
    $password = password_hash($input['password'], PASSWORD_DEFAULT);
    $name = $input['name'];
    $query = "INSERT INTO users (email, password, name) VALUES ('$email', '$password', '$name')";
    if ($conn->query($query)) {
        echo json_encode(["message" => "User ditambahkan"]);
    } else {
        echo json_encode(["message" => "Gagal menambahkan user"]);
    }
}
elseif ($method == "PUT" && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $email = $input['email'];
    $name = $input['name'];
    $query = "UPDATE users SET email='$email', name='$name' WHERE id=$id";
    if ($conn->query($query)) {
        echo json_encode(["message" => "User diupdate"]);
    } else {
        echo json_encode(["message" => "Gagal update"]);
    }
}
elseif ($method == "DELETE" && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    if ($conn->query("DELETE FROM users WHERE id=$id")) {
        echo json_encode(["message" => "User dihapus"]);
    } else {
        echo json_encode(["message" => "Gagal hapus"]);
    }
}
?>
