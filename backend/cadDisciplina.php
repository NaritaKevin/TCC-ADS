<?php
session_start();
include_once("config.php");
$disciplina = $_POST['disciplina'];


$sql = "INSERT INTO disciplinas (disDescricao)
    VALUES (:disDescricao)";


$stmt = $conn->prepare($sql);

if($stmt->execute(['disDescricao'=> $disciplina])){
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

