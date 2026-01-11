<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require('connection.php');

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM barang";
    $result = mysqli_query($koneksi, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $item = array(
                "id" => $row['id'],
                "kd_barang" => $row['kd_barang'],
                "nama_barang" => $row['nama_barang'],
                "harga" => $row['harga']
            );
            $data[] = $item;
        }
        $response['status'] = 'success';
        $response['data'] = $data;
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Tidak ada data dalam tabel.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Metode HTTP tidak valid.';
}

mysqli_close($koneksi);
echo json_encode($response);
?>