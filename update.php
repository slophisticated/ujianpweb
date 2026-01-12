<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require('connection.php');
$response = array();

// METHOD OVERRIDE
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' && isset($_POST['_method']) && $_POST['_method'] === 'PUT') {
    $method = 'PUT';
}

if ($method === 'PUT') {

    // Ambil ID dari URL
    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $parts = explode('/', trim($url, '/'));
    $id = end($parts);

    // --- BACA RAW JSON ---
    $input = file_get_contents("php://input");
    $json = json_decode($input, true);

    if (!empty($json)) {
        // PUT JSON
        $nama   = $json['nama'] ?? '';
        $npm  = $json['npm'] ?? '';
        $kelas = $json['kelas'] ?? '';
    } elseif (!empty($_POST)) {
        // form-data
        $nama   = $_POST['nama'] ?? '';
        $npm  = $_POST['npm'] ?? '';
        $kelas = $_POST['kelas'] ?? '';
    } else {
        // x-www-form-urlencoded
        parse_str($input, $_PUT);
        $nama   = $_PUT['nama'] ?? '';
        $npm  = $_PUT['npm'] ?? '';
        $kelas = $_PUT['kelas'] ?? '';
    }

    // Validasi
    if (empty($nama) && empty($npm) && empty($kelas)) {
        $response['status'] = 'error';
        $response['message'] = 'Tidak ada data yang diperbarui.';
    } elseif (empty($id) || !is_numeric($id)) {
        $response['status'] = 'error';
        $response['message'] = 'ID tidak valid.';
    } else {
        $sql = "UPDATE act1 SET nama=?, npm=?, kelas=? WHERE id=?";
        $stmt = mysqli_prepare($koneksi, $sql);
        mysqli_stmt_bind_param($stmt, "sssi", $nama, $npm, $kelas, $id);
        
        if (mysqli_stmt_execute($stmt)) {
            $response['status'] = 'success';
            $response['message'] = "Data ID $id berhasil diperbarui.";
        } else {
            $response['status'] = 'error';
            $response['message'] = mysqli_stmt_error($stmt);
        }
        mysqli_stmt_close($stmt);
    }
}
else {
    $response['status'] = 'error';
    $response['message'] = 'Metode HTTP tidak valid.';
}

mysqli_close($koneksi);
echo json_encode($response);
?>
