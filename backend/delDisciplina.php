<?php
session_start();
include_once("config.php");
$disID = $_POST['idDisciplinaDel'];


$sql = "DELETE FROM disciplinas WHERE disID = :disID";
   

$stmt = $conn->prepare($sql);

if($stmt->execute(['disID'=>$disID])){
    $_SESSION['msg'] = ' <script type="text/javascript">
                            Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Excluido com sucesso!",
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

