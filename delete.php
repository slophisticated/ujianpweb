<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require("connection.php");

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $parts = explode('/', $url);
    $id = end($parts);

    if (is_numeric($id)) {
        $sql = "DELETE FROM act1 WHERE id=?";
        $stmt = mysqli_prepare($koneksi, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        
        if (mysqli_stmt_execute($stmt)) {
            $response['status'] = 'success';
            $response['message'] = "Data dengan ID $id berhasil dihapus.";
        } else {
            $response['status'] = 'error';
            $response['message'] = "Error: " . mysqli_stmt_error($stmt);
        }
        mysqli_stmt_close($stmt);
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