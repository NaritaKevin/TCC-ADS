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
        $cmd = $this->pdo->query("SELECT * FROM questoes q LEFT JOIN subgrupos s ON q.queSubgrupoID = s.subID  LEFT JOIN niveis n ON n.nivID = q.queNivelID");
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    
    public function cadastrarQuestao($descricao,$bncc,$palavraChave,$stsTipo,$nivel,$ano,$subgrupo)
    {
        // verificar se a questao ja esta cadastrado
        $cmd = $this->pdo->prepare("SELECT queID FROM questoes where queDescricao = :queDescricao");

        $cmd->bindValue(':queDescricao',$descricao);
        $cmd->execute();

        if ($cmd->rowCount() > 0) {// questao ja existe no banco
                return false;
        } else { //não foi encontrado a questao
            $cmd = $this->pdo->prepare(
            "INSERT INTO questoes (queDescricao,queCodigoBncc,quePalavrasChave,queStsTipo,queStsRevisao,queNivelID,queAnoID,queSubgrupoID) 
            VALUES (:queDescricao,:queCodigoBncc,:quePalavrasChave,:queStsTipo,:queStsRevisao,:queNivelID,:queAnoID,:queSubgrupoID)");
            $cmd->bindValue(":queDescricao",$descricao);
            $cmd->bindValue(":queCodigoBncc",$bncc);
            $cmd->bindValue(":quePalavrasChave",$palavraChave);
            $cmd->bindValue(":queStsTipo",$stsTipo);
            $cmd->bindValue(":queStsRevisao","Não");
            $cmd->bindValue(":queNivelID",$nivel);
            $cmd->bindValue(":queAnoID",$ano);
            $cmd->bindValue(":queSubgrupoID",$subgrupo);
            $cmd->execute();
            return true;
        }
    }

    public function buscarUltimaQuestaoCadastrada(){
        $res = [];
        $cmd = $this->pdo->query("SELECT MAX(queID) AS queID FROM questoes LIMIT 1");
        $res = $cmd->fetch();
        return $res;
    }

    public function buscarAlternativasDaQuestao($questaoID){
        $res = [];
        $cmd = $this->pdo->query("SELECT * FROM alternativas WHERE altQuestaoID = :altQuestaoID");
        $cmd->bindValue(":altQuestaoID",$questaoID);
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }

    public function cadastrarAlternativa($altLetra,$altDescricao,$altStsCorreta,$altQuestaoID)
    {

        $cmd = $this->pdo->prepare(
            "INSERT INTO alternativas (altLetra,altDescricao,altStsCorreta,altQuestaoID) 
            VALUES (:altLetra,:altDescricao,:altStsCorreta,:altQuestaoID)");
                $cmd->bindValue(":altLetra",$altLetra);
            $cmd->bindValue(":altDescricao",$altDescricao);
            $cmd->bindValue(":altStsCorreta",$altStsCorreta);
            $cmd->bindValue(":altQuestaoID",$altQuestaoID);
            $cmd->execute();

            return true;

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

    public function excluirAlternativa($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM alternativas WHERE altQuestaoID = :queID ");
        $cmd->bindValue(":queID",$id);
        $cmd->execute();
    }
}
?>