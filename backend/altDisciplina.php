<?php
session_start();
include_once("config.php");
$disciplina = $_POST['disDescricao'];
$disID = $_POST['idDisciplina'];


$sql = "UPDATE disciplinas SET disDescricao = :disDescricao WHERE disID = :disID";
   

$stmt = $conn->prepare($sql);

if($stmt->execute(['disDescricao'=> $disciplina,'disID'=>$disID])){
    $_SESSION['msg'] = ' <script type="text/javascript">
                            Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Alterado com sucesso!",
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

