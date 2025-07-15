<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "creative_store";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Koneksi database gagal"]);
    exit();
}
?>
