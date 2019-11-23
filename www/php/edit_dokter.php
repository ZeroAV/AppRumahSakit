<?php
include_once('koneksi.php');
$nip=$_POST['nip'];
$nama=$_POST['nama'];
$jk=$_POST['select_jk'];
$alamat=$_POST['alamat'];
$no_telp=$_POST['no_telp'];
$gaji_pokok=$_POST['gaji_pokok'];

$query="UPDATE dokter SET nama = '$nama', jenis_kelamin = '$jk', alamat = '$alamat', no_telp = '$no_telp', gaji_pokok = '$gaji_pokok' WHERE NIP = '$nip'";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}
