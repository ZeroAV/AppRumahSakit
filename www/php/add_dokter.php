<?php
include_once('koneksi.php');
$nip=$_POST['nip'];
$nama=$_POST['nama'];
$jk=$_POST['select-jk'];
$alamat=$_POST['alamat'];
$no_telp=$_POST['no_telp'];
$gaji_pokok=$_POST['gaji_pokok'];

$query="INSERT INTO dokter (NIP, nama, jenis_kelamin, alamat, no_telp, gaji_pokok) VALUES ('$nip', '$nama', '$jk','$alamat','$no_telp','$gaji_pokok')";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    header("location: /index.html");
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}
