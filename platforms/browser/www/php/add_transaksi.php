<?php
include_once('koneksi.php');
$no=$_POST['no'];
$psn=$_POST['psn'];
$dok=$_POST['dok'];
$pyk=$_POST['pyk'];
$biaya=$_POST['biaya'];

$query="INSERT INTO transaksi (no_transaksi, id_pasien, nip_dokter, kode_penyakit, biaya_perawatan) VALUES ('$no', '$psn', '$dok','$pyk','$biaya')";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}