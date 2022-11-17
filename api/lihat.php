<?php 
require 'koneksi.php';
$data = [];
$email = $_GET['email'];
$query = mysqli_query($koneksi,"SELECT * FROM user WHERE email ='$email'");
$jumlah = mysqli_num_rows($query);
if ($jumlah == 1) {
	$row = mysqli_fetch_object($query);
	$data = $row;
}

echo json_encode($data);
echo mysqli_error($koneksi);

 ?>