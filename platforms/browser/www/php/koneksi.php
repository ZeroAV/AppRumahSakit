<?php
  $namahost = "remotemysql.com:3306";
  $username = "HEjZ02V4cP";
  $password = "vgGK9673NK";
  $database = "HEjZ02V4cP"; 
  $conn= new mysqli($namahost,$username,$password,$database);
  $conn->query("SET time_zone='+07:00';");
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 
