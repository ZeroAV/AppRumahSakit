<?php
include_once('koneksi.php');
$no=$_POST['no'];
$query="DELETE FROM transaksi WHERE no_transaksi='$no'";
$result=$conn->query($query);
if($result){
    mysqli_close($conn);
    header('access-control-allow-origin:*');
    echo 'success';
}else{
    echo 'fail';
}