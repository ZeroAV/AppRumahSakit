<?php
include_once('koneksi.php');
$kode=$_POST['kode'];
$query="DELETE FROM penyakit WHERE kode_penyakit='$kode'";
$result=$conn->query($query);
if($result){
    mysqli_close($conn);
    header('access-control-allow-origin:*');
    echo 'success';
}else{
    echo 'fail';
}