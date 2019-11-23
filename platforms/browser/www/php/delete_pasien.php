<?php
include_once('koneksi.php');
$id=$_POST['id'];
$query="DELETE FROM pasien WHERE ID='$id'";
$result=$conn->query($query);
if($result){
    mysqli_close($conn);
    header('access-control-allow-origin:*');
    echo 'success';
}else{
    echo 'fail';
}