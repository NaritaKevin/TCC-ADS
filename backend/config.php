<?php

try {
    $conn = new PDO("mysql:host=localhost;dbname=pedagogy;charset=utf8","root","");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo "Error: " . $e->getMessage();
}

/* 
$conn = new mysqli("localhost", "root", "", "pedagogy");
 
if ($conn->connect_errno) {
    die("Conexão falhou: " . $conn->connect_error);
    
} */