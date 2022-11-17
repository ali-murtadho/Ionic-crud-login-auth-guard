<?php 
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$pesan = [];
$email 		= trim($data['email']);
$password 	= trim($data['password']);
$nama 		= trim($data['nama']);

if ($email != '' and $nama != '' and $password != '') {
	$query = mysqli_query($koneksi,"INSERT INTO user('email','password','nama') 
			 						VALUES('$email','$password','$nama')");

}else{
	$query = mysqli_query($koneksi,"DELETE FROM user WHERE email='$email'");
}


// if ($query) {
// 	http_response_code(201);
// 	$pesan['status'] = 'sukses';
// }else{
// 	http_response_code(422);
// 	$pesan['status'] = 'gagal';
// }

echo json_encode($pesan);
echo mysqli_error($koneksi);

?>