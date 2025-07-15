<?php
include 'connect.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);
$name = $data["name"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
if ($conn->query($sql)) {
  echo json_encode(["status" => "success", "message" => "User registered"]);
} else {
  echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>