<?php
include_once('koneksi.php');
$kode_penyakit=$_POST['kode'];
$nama_penyakit=$_POST['nama'];
$golongan=$_POST['select_gol'];
echo $kode_penyakit;
echo $nama_penyakit;
echo $golongan;
$query="INSERT INTO penyakit (kode_penyakit, nama_penyakit, golongan) VALUES ('$kode_penyakit', '$nama_penyakit', '$golongan')";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}
