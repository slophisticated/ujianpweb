<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: http://pweb.test');
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
        $nama_barang   = $json['nama_barang'] ?? '';
        $kd_barang  = $json['kd_barang'] ?? '';
        $harga = $json['harga'] ?? '';
    } elseif (!empty($_POST)) {
        // form-data
        $nama_barang   = $_POST['nama_barang'] ?? '';
        $kd_barang  = $_POST['kd_barang'] ?? '';
        $harga = $_POST['harga'] ?? '';
    } else {
        // x-www-form-urlencoded
        parse_str($input, $_PUT);
        $nama_barang   = $_PUT['nama_barang'] ?? '';
        $kd_barang  = $_PUT['kd_barang'] ?? '';
        $harga = $_PUT['harga'] ?? '';
    }

    // Validasi
    if (empty($nama_barang) && empty($kd_barang) && empty($harga)) {
        $response['status'] = 'error';
        $response['message'] = 'Tidak ada data yang diperbarui.';
    } else {
        $sql = "UPDATE barang SET nama_barang='$nama_barang', kd_barang='$kd_barang', harga='$harga' WHERE id='$id'";
        if (mysqli_query($koneksi, $sql)) {
            $response['status'] = 'success';
            $response['message'] = "Data ID $id berhasil diperbarui.";
        } else {
            $response['status'] = 'error';
            $response['message'] = mysqli_error($koneksi);
        }
    }
}
else {
    $response['status'] = 'error';
    $response['message'] = 'Metode HTTP tidak valid.';
}

mysqli_close($koneksi);
echo json_encode($response);
?>
