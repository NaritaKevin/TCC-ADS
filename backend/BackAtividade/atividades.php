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
            "INSERT INTO atividades (atiDescricao, atiDataInicio, atiDataFim, atiObservacao, atiStatus, atiTipoID, atiUsuarioID) 
            VALUES (:nome, :dataInicio, :dataFim, :observacao,:tipoStatus , :tipo, :atiUsuarioID)");
            $cmd->bindValue(":nome",$nome);
            $cmd->bindValue(":dataInicio",$dataInicial);
            $cmd->bindValue(":dataFim",$dataFinal);
            $cmd->bindValue(":observacao",$descricao);
            $cmd->bindValue(":tipo",$tipo);
            $cmd->bindValue(":tipoStatus",$Status);
            $cmd->bindValue(":atiUsuarioID",2);
            
            $cmd->execute();
            return true;
        }

    }

    public function CadastrarAtividadeQuestao($dataInicial, $atividadeID, $questaoID){

        $cmd = $this->pdo->prepare("INSERT INTO atividade_questao 
        (atiqID, atiqData, atiqAtividadeID, atiqQuestaoID) 
        VALUES (:dataInicial, :AtividadeID, :questaoID,)");
        $cmd->bindValue(":dataInicial",$dataInicial);
        $cmd->bindValue(":AtividadeID", $atividadeID);
        $cmd->bindValue(":questaoID",$questaoID);
        $cmd->execute();
        return true;
    }

    public function buscarDadosAtividade($id){
        $res = array();
        $cmd = $this->pdo->prepare("SELECT * FROM atividades where atiID = :atiID");
        $cmd->bindValue(":atiID",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);

        return $res;
    }


    public function buscarUltimaAtividadeCadastrada(){
        $res = [];
        $cmd = $this->pdo->query("SELECT MAX(atiID) AS atiID FROM atividades LIMIT 1");
        $res = $cmd->fetch();
        return $res;
    }
    public function atualizarDadosAtividade($id,$nome,$descricao,$tipo, $dataInicial,$dataFinal, $Status){
       
        $cmd = $this->pdo->prepare(
            "UPDATE atividades SET atiDescricao = :atiDescricao, atiDatainicio = :atiDatainicio, atidataFim = :atidataFim, atiObservacao = :atiObservacao, atiStatus = :atiStatus, atiTipoID = :atiTipoID
            WHERE atiID = :atiID ");
        $cmd->bindValue(":atiID",$id);
        $cmd->bindValue(":atiDescricao",$nome);
        $cmd->bindValue(":atiDatainicio",$dataInicial);
        $cmd->bindValue(":atidataFim", $dataFinal);
        $cmd->bindValue(":atiObservacao", $descricao);
        $cmd->bindValue(":atiStatus", $Status);
        $cmd->bindValue(":atiTipoID", $tipo);

        $cmd->execute();
    }

    public function excluirAtividade($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM atividades WHERE atiID = :atiID ");
        $cmd->bindValue(":atiID",$id);
        $cmd->execute();
    }


    public function buscarDadosQuestaoSelecionadas($id){
        $res = array();
        $cmd = $this->pdo->query("SELECT * FROM questoes q LEFT JOIN subgrupos s ON q.queSubgrupoID = s.subID  LEFT JOIN niveis n ON n.nivID = q.queNivelID where queID in ($id)");

        $res = $cmd->fetchAll();(PDO::FETCH_ASSOC);

        return $res;
    }

}