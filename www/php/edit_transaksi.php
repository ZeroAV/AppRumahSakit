<?php
include_once('koneksi.php');
$no=$_POST['no'];
$psn=$_POST['psn'];
$dok=$_POST['dok'];
$pyk=$_POST['pyk'];
$biaya=$_POST['biaya'];

$query="UPDATE transaksi SET id_pasien = '$psn', nip_dokter = '$dok', kode_penyakit = '$pyk' ,biaya_perawatan = '$biaya' WHERE no_transaksi = '$no'";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}