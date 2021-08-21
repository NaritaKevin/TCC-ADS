<?php

    class Tematica
    {
         private $pdo;
         public function __construct($dbname, $host, $user,$senha)
         {

            try 
            {
                $this->pdo = new PDO("mysql:dbname=".$dbname.";host=".$host,$user,$senha);
            } 
            catch (PDOException $e) 
            {
                echo "erro com banco de dados:".$e->getMessage();
                exit();
            }
            catch (Exception $e)
             {
                echo "erro generico".$e->getMessage();
                exit();
            }
         }
         public function cadastrarTematica($descricao,$disciplina)
         {
             // verificar se o subgrupo ja esta cadastrado
             $cmd = $this->pdo->prepare("SELECT temID FROM tematicas where temDescricao = :temDescricao");
     
             $cmd->bindValue(':temDescricao',$descricao);
             $cmd->execute();
     
             if ($cmd->rowCount() > 0) {// subgrupo ja existe no banco
                     return false;
             } else { //não foi encontrado o subgrupo
                 $cmd = $this->pdo->prepare("INSERT INTO tematicas (temDescricao,temDisciplinaID) VALUES (:temDescricao,:temDisciplinaID)");
                 $cmd->bindValue(":temDescricao",$descricao);
                 $cmd->bindValue(":temDisciplinaID",$disciplina);
                 if($cmd->execute()){
                     $_SESSION['msg'] = ' <script type="text/javascript">
                                             Swal.fire({
                                             position: "center",
                                             icon: "success",
                                             title: "Cadastrado com sucesso!",
                                             showConfirmButton: false,
                                             timer: 2000
                                             })
                                         </script>';
                     
                 }else{
                     $_SESSION['msg'] = ' <script type="text/javascript">
                                             Swal.fire({
                                             position: "center",
                                             icon: "error",
                                             title: "Ocorreu um erro ao cadastrar!",
                                             showConfirmButton: false,
                                             timer: 2000
                                             })
                                         </script>';             
                 }
                 return true;
             }
     
         }

         public function BuscarTematica()
         {
            $sql = "SELECT * FROM tematicas t JOIN disciplinas d ON t.temDisciplinaID = d.disID ";
            //$sql = "SELECT temDescricao, temID, temDisciplinaID FROM tematicas";
            $pdo = $this->pdo->query($sql);
            $res = $pdo->fetchAll(PDO::FETCH_ASSOC);
            return $res;
         }

         public function buscarDadosTematica($id){
            $res = array();
            $cmd = $this->pdo->prepare("SELECT * FROM tematicas where temID = :temID");
            $cmd->bindValue(":temID",$id);
            $cmd->execute();
            $res = $cmd->fetch(PDO::FETCH_ASSOC);
    
            return $res;
        }
        public function atualizarDadosTematica($id,$descricao,$disciplina){
           
            $cmd = $this->pdo->prepare("UPDATE tematicas SET temDescricao = :temDescricao,temDisciplinaID = :temDisciplinaID WHERE temID = :temID ");
            $cmd->bindValue(":temID",$id);
            $cmd->bindValue(":temDescricao",$descricao);
            $cmd->bindValue(":temDisciplinaID",$disciplina);
            $cmd->execute();
    
        }

        public function excluirTematica($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM tematicas WHERE temID = :temID ");
        $cmd->bindValue(":temID",$id);
        $cmd->execute();
    }

    }


?>