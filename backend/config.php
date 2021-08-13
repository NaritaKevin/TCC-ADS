<?php
$conn = new mysqli("localhost", "root", "", "pedagogy");
 
if ($conn->connect_errno) {
    echo "Error: " . $conn->connect_error;
    
}