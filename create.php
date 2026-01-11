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
    $nama_barang = $_POST['nama_barang'];
    $kd_barang = $_POST['kd_barang'];
    $harga = $_POST['harga'];

    $sql = "INSERT INTO barang (nama_barang, kd_barang, harga) VALUES ('$nama_barang', '$kd_barang', '$harga')";

    if (mysqli_query($koneksi, $sql)) {
        $response['status'] = 'success';
        $response['message'] = 'Data berhasil ditambahkan.';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error: ' . $sql . ' <br> ' . mysqli_error($koneksi);
    }
}

mysqli_close($koneksi);
echo json_encode($response);
?>