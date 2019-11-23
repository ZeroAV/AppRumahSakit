<?php
include_once('koneksi.php');
$kode_penyakit=$_POST['kode'];
$nama_penyakit=$_POST['nama'];
$golongan=$_POST['select_gol'];
echo $kode_penyakit;
echo $nama_penyakit;
echo $golongan;
$query="UPDATE penyakit SET nama_penyakit = '$nama_penyakit', golongan = '$golongan' WHERE kode_penyakit = '$kode_penyakit'";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}
