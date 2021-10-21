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
        $cmd = $this->pdo->query("SELECT * FROM atividades a INNER JOIN tipos t on a.atiTipoID = t.tipID");
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    // função para cadastrar atividades no banco de dados
    public function cadastrarAtividades($nome, $descricao, $tipo, $dataInicial, $dataFinal, $Status )
    {
        // verificar se o email ja esta cadastrado
        $cmd = $this->pdo->prepare("SELECT atiID FROM atividades where atiDescricao = :atiDescricao");

        $cmd->bindValue(':atiDescricao',$descricao);
        $cmd->execute();

        if ($cmd->rowCount() > 0) {// email ja existe no banco
                return false;
        } else { //não foi encontrado o email
            $cmd = $this->pdo->prepare(
            "INSERT INTO atividades (atiDescricao, atiDataInicio, atiDataFim, atiObservacao, atiStatus, atiTipoID) 
            VALUES (:nome, :dataInicio, :dataFim, :observacao,:tipoStatus , :tipo)");
            $cmd->bindValue(":nome",$nome);
            $cmd->bindValue(":dataInicio",$dataInicial);
            $cmd->bindValue(":dataFim",$dataFinal);
            $cmd->bindValue(":observacao",$descricao);
            $cmd->bindValue(":tipo",$tipo);
            $cmd->bindValue(":tipoStatus",$Status);
            
            $cmd->execute();
            return true;
        }

    }

    public function buscarDadosAtividade($id){
        $res = array();
        $cmd = $this->pdo->prepare("SELECT * FROM atividade where atiID = :atiID");
        $cmd->bindValue(":atiID",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);

        return $res;
    }
    public function atualizarDadosAtividade($id,$descricao){
       
        $cmd = $this->pdo->prepare("UPDATE atividade SET atiDescricao = :atiDescricao WHERE atiID = :atiID ");
        $cmd->bindValue(":atiID",$id);
        $cmd->bindValue(":atiDescricao",$descricao);
        $cmd->execute();

    }

    public function excluirAtividade($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM disciplinas WHERE disID = :disID ");
        $cmd->bindValue(":disID",$id);
        $cmd->execute();
    }


}