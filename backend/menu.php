<?php

class Menu {
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


    public function buscarNomeUsuario($id){
        $res = [];
        $cmd = $this->pdo->prepare("SELECT p.pesNome FROM pessoa p JOIN usuario u ON p.pesUsuCodigo = u.usuCodigo WHERE u.usuCodigo = :id ;");
        $cmd->bindValue(":id",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);
        return $res;

    }

    public function buscarAtividade($id){
        $res = [];
        $cmd = $this->pdo->prepare("SELECT COUNT(*) as quantAtividade FROM atividades WHERE atiUsuarioID = :id limit 1;");
        $cmd->bindValue(":id",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);
        return $res;
    }
    public function bucsarQuestao(){
        $res = [];
        $cmd = $this->pdo->query("SELECT COUNT(*) as quantQuestoes FROM questoes limit 1;");
        $res = $cmd->fetch(PDO::FETCH_ASSOC);
        return $res;

    }
    public function buscarDisciplina(){
        $res = [];
        $cmd = $this->pdo->query("SELECT (SELECT COUNT(*) FROM disciplinas) + (SELECT COUNT(*) FROM tematicas) + (SELECT COUNT(*) FROM subgrupos) AS totalDisciplina limit 1");
        $res = $cmd->fetch(PDO::FETCH_ASSOC);
        return $res;

    }
    public function buscarResultado($id){
        $res = [];
        $cmd = $this->pdo->prepare("SELECT COUNT(DISTINCT aq.atiqAtividadeID) AS quatResultados FROM atividade_questao aq JOIN atividades a ON a.atiID = aq.atiqAtividadeID WHERE a.atiUsuarioID = :id and a.atiPostado = 'Sim' AND a.atiDataInicio <= CURRENT_TIMESTAMP() limit 1;");
        $cmd->bindValue(":id",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);
        return $res;
    }



    public function buscarClasse($idClas,$idProf){
        $res = [];
        $cmd = $this->pdo->prepare("SELECT COUNT(uc.uscClaCodigo) AS quantAluno,c.claNome, (SELECT LEFT(c.claPeriodo, 1)) AS periodo FROM usuario_classe uc JOIN classes c ON uc.uscClaCodigo = c.claCodigo  WHERE uscClaCodigo = :idClas AND uscUsuCodigo != :idProf ORDER BY uscClaCodigo");
        $cmd->bindValue(":idClas",$idClas);
        $cmd->bindValue(":idProf",$idProf);
        $cmd->execute();
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    public function buscarClasseProfessor($id){
        $res = [];
        $cmd = $this->pdo->prepare("SELECT uscClaCodigo FROM usuario_classe WHERE uscUsuCodigo = :id GROUP BY uscClaCodigo ORDER BY uscClaCodigo;");
        $cmd->bindValue(":id",$id);
        $cmd->execute();
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }

}