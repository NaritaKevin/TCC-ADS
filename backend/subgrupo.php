<?php

class Subgrupo{
    private $pdo;
    //CONEXAO COM O BANCO DE DADOS
    public function __construct($dbname, $host, $user, $senha)
    {
        try {
            $this->pdo = new PDO("mysql:dbname=".$dbname.";host=".$host,$user,$senha);
        } 
        catch (PDOException $e) {
            echo "erro com banco de dados:".$e->getMessage();
            exit();
        }
        catch (Exception $e) {
            echo "erro generico".$e->getMessage();
            exit();
        }

    }
    
    public function buscarDadosSub(){
        $res = [];
        $cmd = $this->pdo->query("SELECT * FROM subgrupos s JOIN tematicas t ON s.subTematicaID = t.temID JOIN disciplinas d ON t.temDisciplinaID = d.disID ");
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    
    public function cadastrarSubgrupo($descricao,$tematica)
    {
        // verificar se o subgrupo ja esta cadastrado
        $cmd = $this->pdo->prepare("SELECT subID FROM subgrupos where subDescricao = :subDescricao");

        $cmd->bindValue(':subDescricao',$descricao);
        $cmd->execute();

        if ($cmd->rowCount() > 0) {// subgrupo ja existe no banco
                return false;
        } else { //não foi encontrado o subgrupo
            $cmd = $this->pdo->prepare(
            "INSERT INTO subgrupos (subDescricao,subTematicaID) 
            VALUES (:subDescricao,:subTematicaID)");
            $cmd->bindValue(":subDescricao",$descricao);
            $cmd->bindValue(":subTematicaID",$tematica);
            $cmd->execute();
            return true;
        }

    }

    public function buscarDadosSubgrupo($id){
        $res = array();
        $cmd = $this->pdo->prepare("SELECT * FROM subgrupos where subID = :subID");
        $cmd->bindValue(":subID",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);

        return $res;
    }
    public function atualizarDadosSubgrupo($id,$descricao,$idTematica){
       
        $cmd = $this->pdo->prepare("UPDATE subgrupos SET subDescricao = :subDescricao, subTematicaID = :subTematicaID WHERE subID = :subID ");
        $cmd->bindValue(":subID",$id);
        $cmd->bindValue(":subDescricao",$descricao);
        $cmd->bindValue(":subTematicaID",$idTematica);
        $cmd->execute();

    }

    public function excluirSubgrupo($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM subgrupos WHERE subID = :subID ");
        $cmd->bindValue(":subID",$id);
        $cmd->execute();
    }
}
?>