<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include "connect.php"; // koneksi db

// --- LOGOUT ---
if (isset($_GET['action']) && $_GET['action'] == 'logout') {
    session_destroy();
    header("Location: index.php");
    exit;
}

// --- LOGIN ---
if (!isset($_SESSION['user_id']) && isset($_POST['login'])) {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();
    $user = $res->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        header("Location: index.php");
        exit;
    } else {
        $error = "Email atau password salah";
    }
}

// --- Pastikan sudah login sebelum akses CRUD ---
if (!isset($_SESSION['user_id'])) {
    // Tampilkan form login
    ?>
    <!DOCTYPE html>
    <html><head><title>Login</title></head><body>
    <h2>Login</h2>
    <?php if(isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="POST" action="">
        <label>Email:</label><br>
        <input type="email" name="email" required><br>
        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>
        <button type="submit" name="login">Login</button>
    </form>
    </body></html>
    <?php
    exit;
}

// --- CRUD ACTIONS ---

// Create new user
if (isset($_POST['create'])) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Cek email sudah ada?
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $msg = "Email sudah digunakan";
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $hash);
        if ($stmt->execute()) {
            $msg = "User berhasil ditambah";
            header("Location: index.php?msg=".urlencode($msg));
            exit;
        } else {
            $msg = "Gagal menambah user";
        }
    }
}

// Update user
if (isset($_POST['update'])) {
    $id = intval($_POST['id']);
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if ($password) {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET name=?, email=?, password=? WHERE id=?");
        $stmt->bind_param("sssi", $name, $email, $hash, $id);
    } else {
        $stmt = $conn->prepare("UPDATE users SET name=?, email=? WHERE id=?");
        $stmt->bind_param("ssi", $name, $email, $id);
    }
    if ($stmt->execute()) {
        $msg = "User berhasil diupdate";
        header("Location: index.php?msg=".urlencode($msg));
        exit;
    } else {
        $msg = "Gagal update user";
    }
}

// Delete user
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    // Jangan hapus diri sendiri
    if ($id != $_SESSION['user_id']) {
        $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            $msg = "User berhasil dihapus";
            header("Location: index.php?msg=".urlencode($msg));
            exit;
        } else {
            $msg = "Gagal menghapus user";
        }
    } else {
        $msg = "Tidak bisa menghapus user sendiri";
        header("Location: index.php?msg=".urlencode($msg));
        exit;
    }
}

// Ambil data user untuk ditampilkan
$result = $conn->query("SELECT id, name, email FROM users ORDER BY id DESC");

// Untuk edit form
$edit_user = null;
if (isset($_GET['edit'])) {
    $id = intval($_GET['edit']);
    $stmt = $conn->prepare("SELECT * FROM users WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    $edit_user = $res->fetch_assoc();
}

// Ambil pesan dari query param kalau ada
$msg = $_GET['msg'] ?? $msg ?? '';

?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard - CRUD User</title>
</head>
<body>
<h2>Halo, <?=htmlspecialchars($_SESSION['user_name'])?></h2>
<p><a href="?action=logout" onclick="return confirm('Logout?')">Logout</a></p>

<?php if($msg) echo "<p style='color:green;'>".htmlspecialchars($msg)."</p>"; ?>

<h3>Daftar User</h3>
<table border="1" cellpadding="5" cellspacing="0">
    <tr><th>ID</th><th>Nama</th><th>Email</th><th>Aksi</th></tr>
    <?php while($row = $result->fetch_assoc()): ?>
    <tr>
        <td><?= $row['id'] ?></td>
        <td><?= htmlspecialchars($row['name']) ?></td>
        <td><?= htmlspecialchars($row['email']) ?></td>
        <td>
            <a href="?edit=<?= $row['id'] ?>">Edit</a> |
            <?php if($row['id'] != $_SESSION['user_id']): ?>
            <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Hapus user ini?')">Hapus</a>
            <?php else: ?>
            -
            <?php endif; ?>
        </td>
    </tr>
    <?php endwhile; ?>
</table>

<hr>

<?php if ($edit_user): ?>
<h3>Edit User ID <?= $edit_user['id'] ?></h3>
<form method="POST" action="">
    <input type="hidden" name="id" value="<?= $edit_user['id'] ?>">
    <label>Nama:</label><br>
    <input type="text" name="name" value="<?= htmlspecialchars($edit_user['name']) ?>" required><br>
    <label>Email:</label><br>
    <input type="email" name="email" value="<?= htmlspecialchars($edit_user['email']) ?>" required><br>
    <label>Password (kosongkan jika tidak ingin diubah):</label><br>
    <input type="password" name="password"><br><br>
    <button type="submit" name="update">Update</button>
    <a href="index.php">Batal</a>
</form>

<?php else: ?>
<h3>Tambah User Baru</h3>
<form method="POST" action="">
    <label>Nama:</label><br>
    <input type="text" name="name" required><br>
    <label>Email:</label><br>
    <input type="email" name="email" required><br>
    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>
    <button type="submit" name="create">Tambah</button>
</form>
<?php endif; ?>
<br><br>


</body>
</html>
