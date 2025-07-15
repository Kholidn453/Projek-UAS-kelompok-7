<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../koneksi.php"; // Pastikan file koneksi.php sudah benar

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["name"]) || !isset($data["email"]) || !isset($data["password"])) {
    echo json_encode(["status" => "error", "message" => "Semua data harus diisi"]);
    exit;
}

$name = $data["name"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User berhasil ditambahkan"]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal mendaftar. Email mungkin sudah digunakan."]);
}
?>
