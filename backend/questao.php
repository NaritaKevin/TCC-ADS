<?php

class Questao{
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
    
    public function buscarDadosQuestao(){
        $res = [];
        $cmd = $this->pdo->query("SELECT * FROM questoes q LEFT JOIN subgrupos s ON q.queID = s.subID LEFT JOIN alternativas a ON q.queID = a.altQuestaoID LEFT JOIN niveis n ON n.nivID = q.queNivelID");
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    
    public function cadastrarQuestao($descricao,$tematica)
    {
        // verificar se o subgrupo ja esta cadastrado
        $cmd = $this->pdo->prepare("SELECT queID FROM questoes where queDescricao = :queDescricao");

        $cmd->bindValue(':queDescricao',$descricao);
        $cmd->execute();

        if ($cmd->rowCount() > 0) {// subgrupo ja existe no banco
                return false;
        } else { //não foi encontrado o subgrupo
            $cmd = $this->pdo->prepare(
            "INSERT INTO questoes (subDescricao,subTematicaID) 
            VALUES (:subDescricao,:subTematicaID)");
            $cmd->bindValue(":subDescricao",$descricao);
            $cmd->bindValue(":subTematicaID",$tematica);
            $cmd->execute();
            return true;
        }

    }

 
    public function atualizarDadosQuestao($id,$descricao,$idTematica){
       
        $cmd = $this->pdo->prepare("UPDATE subgrupos SET subDescricao = :subDescricao, subTematicaID = :subTematicaID WHERE subID = :subID ");
        $cmd->bindValue(":subID",$id);
        $cmd->bindValue(":subDescricao",$descricao);
        $cmd->bindValue(":subTematicaID",$idTematica);
        $cmd->execute();

    }

    public function excluirQuestao($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM questoes WHERE queID = :queID ");
        $cmd->bindValue(":queID",$id);
        $cmd->execute();
    }
}
?>