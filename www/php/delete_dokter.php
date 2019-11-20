<?php
include_once('koneksi.php');
$nip=$_GET['nip'];
$query="DELETE FROM dokter WHERE NIP='$nip'";
$result=$conn->query($query);
if($result){
    mysqli_close($conn);
    header('access-control-allow-origin:*');
    echo 'success';
}else{
    echo 'fail';
}
header("location: /rumahsakit/www/index.html");
exit;?>