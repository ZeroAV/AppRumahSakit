<?php
include_once('koneksi.php');
$query="SELECT * FROM penyakit";
$result=$conn->query($query);
if($result){
    while($row=$result->fetch_assoc()) {
        $arr[] = $row;
    }
    header('access-control-allow-origin:*'); 
    $array = array(json_encode($arr));
    echo json_encode($arr);
    mysqli_close($conn);
}
