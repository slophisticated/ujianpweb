<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require('connection.php');

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $nama = isset($data['nama']) ? trim($data['nama']) : '';
    $npm = isset($data['npm']) ? trim($data['npm']) : '';
    $kelas = isset($data['kelas']) ? trim($data['kelas']) : '';

    if (empty($nama) || empty($npm) || empty($kelas)) {
        $response['status'] = 'error';
        $response['message'] = 'Semua field (nama, npm, kelas) harus diisi.';
    } else {
        $sql = "INSERT INTO act1 (nama, npm, kelas) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($koneksi, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $nama, $npm, $kelas);

        if (mysqli_stmt_execute($stmt)) {
            $response['status'] = 'success';
            $response['message'] = 'Data berhasil ditambahkan.';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Error: ' . mysqli_stmt_error($stmt);
        }
        mysqli_stmt_close($stmt);
    }
}

mysqli_close($koneksi);
echo json_encode($response);
?>