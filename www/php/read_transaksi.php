<?php
include_once('koneksi.php');
$query="SELECT * FROM transaksi t join dokter d ON t.nip_dokter = d.NIP join pasien p ON p.ID=t.id_pasien join penyakit k ON k.kode_penyakit=t.kode_penyakit ORDER BY t.no_transaksi";
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
