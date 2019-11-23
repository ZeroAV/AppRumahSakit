<?php
include_once('koneksi.php');
$nip=$_POST['nip'];
$query="DELETE FROM dokter WHERE NIP='$nip'";
$result=$conn->query($query);
if($result){
    mysqli_close($conn);
    header('access-control-allow-origin:*');
    echo 'success';
}else{
    echo 'fail';
}