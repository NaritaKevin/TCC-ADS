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
        $cmd = $this->pdo->query("SELECT * FROM atividades a INNER JOIN tipos t on a.atiTipoID = t.tipID inner join classes c on a.atiClasseID = c.claCodigo");
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }
    public function buscarDadosPorID($id){
        $res = array();
        $cmd = $this->pdo->prepare("SELECT * FROM atividades a INNER JOIN tipos t on a.atiTipoID = t.tipID inner join classes c on a.atiClasseID = c.claCodigo where atiID = :atiID");
        $cmd->bindValue(":atiID",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);
        return $res;
    }
    // função para cadastrar atividades no banco de dados
    public function cadastrarAtividades($nome, $descricao, $tipo, $dataInicial, $dataFinal, $stsAtiv, $turma,$stsQues,$stsAlt,$stsResp,$stsNaveg,$stsReini )
    {
        // verificar se o email ja esta cadastrado
        $cmd = $this->pdo->prepare("SELECT atiID FROM atividades where atiDescricao = :atiDescricao and atiTipoID = :tipo and atiObservacao = :observacao");

        $cmd->bindValue(':atiDescricao',$nome);
        $cmd->bindValue(':tipo',$tipo);
        $cmd->bindValue(':observacao',$descricao);
        $cmd->execute();

        if ($cmd->rowCount() > 0) {// email ja existe no banco
                return false;
        } else { //não foi encontrado o email
            $cmd = $this->pdo->prepare(
            "INSERT INTO atividades (atiDescricao, atiDataInicio, atiDataFim, atiObservacao, atiStatus, atiStsQuestoes,atiStsAlternativas,atiStsRespostas,atiStsNavegacao,atiStsReinicio, atiTipoID, atiUsuarioID, atiClasseID) 
            VALUES (:nome, :dataInicio, :dataFim, :observacao,:tipoStatus, :atiStsQuestoes , :stsAlt, :stsResp,:stsNaveg, :stsReini, :tipo, :atiUsuarioID, :atiClasseID)");
            $cmd->bindValue(":nome",$nome);
            $cmd->bindValue(":dataInicio",$dataInicial);
            $cmd->bindValue(":dataFim",$dataFinal);
            $cmd->bindValue(":observacao",$descricao);
            $cmd->bindValue(":tipo",$tipo);
            $cmd->bindValue(":tipoStatus",$stsAtiv);
            $cmd->bindValue(":atiStsQuestoes",$stsQues);
            $cmd->bindValue(":stsAlt",$stsAlt);
            $cmd->bindValue(":stsResp",$stsResp);
            $cmd->bindValue(":stsNaveg",$stsNaveg);
            $cmd->bindValue(":stsReini",$stsReini);
            $cmd->bindValue(":atiUsuarioID",2);
            $cmd->bindValue(":atiClasseID",$turma);
            
            $cmd->execute();
            return true;
        }

    }

    public function CadastrarAtividadeQuestao($dataInicial,$pontuacao,$ordem, $atividadeID, $questaoID){

        $cmd = $this->pdo->prepare("INSERT INTO atividade_questao 
        (atiqData,atiqPontuacao,atiqOrdemQuestao, atiqAtividadeID, atiqQuestaoID) 
        VALUES (:dataInicial,:pontuacao,:ordem, :AtividadeID, :questaoID)");
        $cmd->bindValue(":dataInicial",$dataInicial);
        $cmd->bindValue(":pontuacao",$pontuacao);
        $cmd->bindValue(":ordem",$ordem);
        $cmd->bindValue(":AtividadeID", $atividadeID);
        $cmd->bindValue(":questaoID",$questaoID);
        $cmd->execute();
        return true;
    }

    public function buscarDadosAtividade($id){
        $res = array();
        $cmd = $this->pdo->prepare("SELECT * FROM atividades a INNER JOIN tipos t on a.atiTipoID = t.tipID inner join classes c on a.atiClasseID = c.claCodigo where atiID = :atiID");
        $cmd->bindValue(":atiID",$id);
        $cmd->execute();
        $res = $cmd->fetch(PDO::FETCH_ASSOC);

        return $res;
    }


    public function buscarDadosAtividadeQuestao(){
        $res = array();
        $cmd = $this->pdo->query("SELECT * FROM atividade_questao a inner join questoes q on  a.atiqQuestaoID = q.queID");
        $cmd->execute();
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);

        return $res;
    }


    public function buscarQuestoesSelecionadas($id){
        $res = array();
        $cmd = $this->pdo->prepare("SELECT * FROM atividade_questao a INNER JOIN  questoes q ON a.atiqQuestaoID = q.queID  INNER JOIN niveis n ON n.nivID = q.queNivelID JOIN subgrupos s ON s.subID = q.queSubgrupoID WHERE a.atiqAtividadeID = :atiqAtividadeID ORDER BY atiqOrdemQuestao");
        $cmd->bindValue(":atiqAtividadeID",$id);
        $cmd->execute();
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);

        return $res;
    }

    public function buscarUltimaAtividadeCadastrada(){
        $res = [];
        $cmd = $this->pdo->query("SELECT MAX(atiID) AS atiID FROM atividades LIMIT 1");
        $res = $cmd->fetch(PDO::FETCH_ASSOC);
        return $res;
    }

    public function atualizarDadosAtividade($id,$nome,$descricao,$tipo, $dataInicial,$dataFinal, $stsAtiv, $turma, $stsQues,$stsAlt,$stsResp,$stsNaveg,$stsReini){
       
        $cmd = $this->pdo->prepare(
            "UPDATE atividades SET atiDescricao = :atiDescricao, atiDatainicio = :atiDatainicio, atidataFim = :atidataFim, atiObservacao = :atiObservacao, 
            atiStatus = :stsAtiv, atiStsQuestoes = :stsQues, atiStsAlternativas = :stsAlt, atiStsRespostas = :stsResp, atiStsNavegacao = :stsNaveg, atiStsReinicio = :stsReini,
             atiTipoID = :atiTipoID , atiClasseID = :atiClasseID
            WHERE atiID = :atiID ");
        $cmd->bindValue(":atiID",$id);
        $cmd->bindValue(":atiDescricao",$nome);
        $cmd->bindValue(":atiDatainicio",$dataInicial);
        $cmd->bindValue(":atidataFim", $dataFinal);
        $cmd->bindValue(":atiObservacao", $descricao);
        $cmd->bindValue(":atiTipoID", $tipo);
        $cmd->bindValue(":stsAtiv",$stsAtiv);
        $cmd->bindValue(":stsQues",$stsQues);
        $cmd->bindValue(":stsAlt",$stsAlt);
        $cmd->bindValue(":stsResp",$stsResp);
        $cmd->bindValue(":stsNaveg",$stsNaveg);
        $cmd->bindValue(":stsReini",$stsReini);
        $cmd->bindValue(":atiClasseID", $turma);

        $cmd->execute();
        
    }
    public function publicarAtividade($id,$atiPostado){
       
        $cmd = $this->pdo->prepare(
            "UPDATE atividades SET  atiPostado = :atiPostado
            WHERE atiID = :atiID ");
        $cmd->bindValue(":atiID",$id);
        $cmd->bindValue(":atiPostado",$atiPostado);
      
        $cmd->execute();
        return true;
    }

    public function excluirAtividade($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM atividades WHERE atiID = :atiID ");
        $cmd->bindValue(":atiID",$id);
        $cmd->execute();
    }


    public function excluirAtividadeQuestao($id)
    {
        $cmd = $this->pdo->prepare(" DELETE FROM atividade_questao WHERE atiqAtividadeID = :atiqAtividadeID ");
        $cmd->bindValue(":atiqAtividadeID",$id);
        $cmd->execute();
    }

    public function buscarDadosQuestaoSelecionadas($id){
        $res = [];
        $cmd = $this->pdo->query("SELECT q.queID,q.queDescricao,q.queCodigoBncc,q.quePalavrasChave,q.queStsTipo,q.queStsRevisao,s.subDescricao,n.nivDescricao  FROM questoes q LEFT JOIN subgrupos s ON q.queSubgrupoID = s.subID  LEFT JOIN niveis n ON n.nivID = q.queNivelID where queID in ($id)");

        $res = $cmd->fetchAll();(PDO::FETCH_ASSOC);

        return $res;
    }

    public function buscarDadosQuestaoEscolher($id){
        $res = array();
        $cmd = $this->pdo->query("SELECT * FROM questoes q LEFT JOIN subgrupos s ON q.queSubgrupoID = s.subID  LEFT JOIN niveis n ON n.nivID = q.queNivelID  LEFT JOIN ano a ON a.anoCodigo = queAnoID where queID not in ($id)");

        $res = $cmd->fetchAll();(PDO::FETCH_ASSOC);

        return $res;
    }

    public function buscarNada(){
        $res = array();
        $cmd = $this->pdo->query("SELECT * FROM questoes q LEFT JOIN subgrupos s ON q.queSubgrupoID = s.subID  LEFT JOIN niveis n ON n.nivID = q.queNivelID where 1 = 2");

        $res = $cmd->fetchAll();(PDO::FETCH_ASSOC);

        return $res;
    }

}