<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require('connection.php');

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $parts = explode('/', $url);
    $id = end($parts);

    if (is_numeric($id)) {
        $sql = "SELECT * FROM barang WHERE id='$id'";
        $result = mysqli_query($koneksi, $sql);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $response['status'] = 'success';
            $response['data'] = $row;
        } else {
            $response['status'] = 'error';
            $response['message'] = "Data dengan ID $id tidak ditemukan.";
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = "ID tidak valid.";
    }
} else {
    $response['status'] = 'error';
    $response['message'] = "Metode HTTP tidak valid.";
}

mysqli_close($koneksi);
echo json_encode($response);
?>