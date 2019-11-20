<?php
include_once('koneksi.php');
$no=$_POST['no'];
$psn=$_POST['select-psn'];
$dok=$_POST['select-dok'];
$pyk=$_POST['select-pyk'];
$biaya=$_POST['biaya'];

$query="INSERT INTO transaksi (no_transaksi, id_pasien, nip_dokter, kode_penyakit, biaya_perawatan) VALUES ('$no', '$psn', '$dok','$pyk','$biaya')";
$result=$conn->query($query);
if($result){
    header('access-control-allow-origin:*');
    header("location: https://vast-cliffs-90191.herokuapp.com/transaksi.html");
    mysqli_close($conn);
    echo 'success';
}else{
    echo 'fail';
}