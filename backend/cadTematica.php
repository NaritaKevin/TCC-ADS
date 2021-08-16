<?php

session_start();
include_once("config.php");
$disciplinaopc = $_POST['disciplinaopc'];
$tematica = $_POST['tematica'];


$sql = "INSERT INTO tematicas (temDescricao,temDisciplinaID)
    VALUES (:temDescricao,:temDisciplinaID)";


$stmt = $conn->prepare($sql);

if($stmt->execute(['temDescricao'=> $tematica,'temDisciplinaID'=> $disciplinaopc ])){
    $_SESSION['msg'] = ' <script type="text/javascript">
                            Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Cadastrado com sucesso!",
                            showConfirmButton: false,
                            timer: 2000
                            })
                        </script>';
    header("Location: ../pages/atuacao.php");
}else{
    $_SESSION['msg'] = ' <script type="text/javascript">
                            Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Ocorreu um erro ao cadastrar!",
                            showConfirmButton: false,
                            timer: 2000
                            })
                        </script>';
    header("Location: ../pages/atuacao.php");
} 



?>