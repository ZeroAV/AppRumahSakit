<?php
include_once('koneksi.php');
$nama=$_POST['nama'];
$jk=$_POST['select_jk'];
$alamat=$_POST['alamat'];
$no_telp=$_POST['no_telp'];
$umur=$_POST['umur'];
$bb=$_POST['bb'];
$tb=$_POST['tb'];
$gd=$_POST['gd'];

$query="INSERT INTO pasien (nama_pasien, jenis_kelamin, alamat, no_telp, umur, berat_badan, tinggi_badan, golongan_darah) VALUES ('$nama', '$jk','$alamat','$no_telp','$umur','$bb','$tb','$gd')";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}
