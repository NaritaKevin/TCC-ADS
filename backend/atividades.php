<?php
class Atividade
{

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
    //FUNÇÃO PARA BUSCAR OS DADOS E EXIBIR NO CANTO DEREITO
    public function buscarDados(){
        $res = array();
        $cmd = $this->pdo->query("SELECT * FROM atividades");
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    // função para cadastrar pessoas no banco de dados
    public function cadastrarAtividades($descricao)
    {
        // verificar se o email ja esta cadastrado
        $cmd = $this->pdo->prepare("SELECT atiID FROM atividades where atiDescricao = :atiDescricao");

        $cmd->bindValue(':atiDescricao',$descricao);
        $cmd->execute();

        if ($cmd->rowCount() > 0) {// email ja existe no banco
                return false;
        } else { //não foi encontrado o email
            $cmd = $this->pdo->prepare(
            "INSERT INTO disciplinas (disDescricao) 
            VALUES (:disDescricao)");
            $cmd->bindValue(":disDescricao",$descricao);
            $cmd->execute();
            return true;
        }

    }

    public function buscarDadosDisciplina($id){
        $res = array();
        $cmd = $this->pdo->prepare("SELECT * FROM disciplinas where disID = :disID");
        $cmd->bindValue(":disID",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);

        return $res;
    }
    public function atualizarDadosDisciplina($id,$descricao){
       
        $cmd = $this->pdo->prepare("UPDATE disciplinas SET disDescricao = :disDescricao WHERE disID = :disID ");
        $cmd->bindValue(":disID",$id);
        $cmd->bindValue(":disDescricao",$descricao);
        $cmd->execute();

    }

    public function excluirDisciplina($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM disciplinas WHERE disID = :disID ");
        $cmd->bindValue(":disID",$id);
        $cmd->execute();
    }


}