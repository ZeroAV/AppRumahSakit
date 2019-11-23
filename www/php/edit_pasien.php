<?php
include_once('koneksi.php');
$id=$_POST['id'];
$nama=$_POST['nama'];
$jk=$_POST['select_jk'];
$alamat=$_POST['alamat'];
$no_telp=$_POST['no_telp'];
$umur=$_POST['umur'];
$bb=$_POST['bb'];
$tb=$_POST['tb'];
$gd=$_POST['gd'];

$query="UPDATE pasien SET nama_pasien = '$nama', jenis_kelamin = '$jk', alamat = '$alamat', no_telp = '$no_telp', umur = '$umur', berat_badan = '$bb', tinggi_badan = '$tb', golongan_darah = '$gd'  WHERE ID = '$id'";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}
