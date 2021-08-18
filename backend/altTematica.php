<?php
session_start();
include_once("config.php");
$disciplinaopc = $_POST['disciplinaopc'];
$temDescricao = $_POST['temDescricao'];

$temID = $_POST['idTematica'];


$sql = "UPDATE tematicas SET temDescricao = :temDescricao WHERE temID = :temID";
   

$stmt = $conn->prepare($sql);

if($stmt->execute(['temDescricao'=> $temDescricao,'temID'=>$temID])){
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

