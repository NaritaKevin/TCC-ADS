<?php

    class Resultados
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
    
       
         public function BuscarAtividades()
         {
            $sql = "SELECT  * FROM atividades a, classes c,tipos t,atividade_questao aq WHERE a.atiClasseID = c.claCodigo AND t.tipID = a.atiTipoID AND a.atiID = aq.atiqAtividadeID AND a.atiUsuarioID = 2 GROUP BY a.atiID";
            $pdo = $this->pdo->query($sql);
            $res = $pdo->fetchAll(PDO::FETCH_ASSOC);
            return $res;
         }
         public function buscarResultadosAluno($id){
            $res = array();
            $cmd = $this->pdo->prepare("SELECT ua.usuID,p.pesNome,ua.usuPontuacao,ua.usuDataRealizacao,
            (SELECT COUNT(*) FROM resultados,atividade_questao 
            WHERE atiqAtividadeID = resAtividadeId AND atiqQuestaoID = resQuestaoID  AND resResposta = 'Sim' AND resStsResposta = 'Respondido' AND resUsuarioAtividadeID = ua.usuID) AS Acertos,
            (SELECT COUNT(atiqAtividadeID) FROM atividade_questao WHERE atiqAtividadeID = ua.usuAtividadeID) AS TotalQuestoes
            FROM pessoa p JOIN usuario u ON p.pesUsuCodigo = u.usuCodigo 
            JOIN usuario_classe uc ON u.usuCodigo = uscUsuCodigo 
            JOIN usuario_atividade ua ON ua.usuUsuarioClasseID = uc.uscCodigo 
            WHERE ua.usuAtividadeID = :usuAtividadeID ORDER BY p.pesNome;");

            $cmd->bindValue(":usuAtividadeID",$id);
            $cmd->execute();
            $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
    
            return $res;
        }

     
        public function criarViewAcertos($id)
        {
            // verificar se o subgrupo ja esta cadastrado
            $cmd = $this->pdo->prepare("SELECT resQuestaoID,COUNT(*) as acertos from resultados WHERE resAtividadeID = :atiID AND resResposta = 'Sim' AND resStsResposta = 'Respondido' GROUP BY resQuestaoID asc ;");
            $cmd->bindValue(":atiID",$id);
            $cmd->execute();
    
            if ($cmd->rowCount() == 0) {// subgrupo ja existe no banco
                    return false;
            } else { //não foi encontrado o subgrupo
                $cmd = $this->pdo->prepare("CREATE OR REPLACE VIEW resultados_acertos AS
                SELECT r.resQuestaoID,COUNT(r.resID) acertos,(SELECT atiDescricao FROM atividades a  WHERE a.atiID = r.resAtividadeID) AS atividade
                FROM resultados r
                WHERE resAtividadeID = :atiID AND resResposta = 'Sim' AND resStsResposta = 'Respondido' GROUP BY resQuestaoID ASC;");
                $cmd->bindValue(":atiID",$id);
                $cmd->execute();
                return true;
            }
    
        }

        public function criarViewErros($id)
        {
            // verificar se o subgrupo ja esta cadastrado
            $cmd = $this->pdo->prepare("SELECT resQuestaoID,COUNT(*) as acertos from resultados WHERE resAtividadeID = :atiID AND resResposta = 'Não' AND resStsResposta = 'Respondido' GROUP BY resQuestaoID asc ;");
            $cmd->bindValue(":atiID",$id);
            $cmd->execute();
    
            if ($cmd->rowCount() == 0) {// subgrupo ja existe no banco
                    return false;
            } else { //não foi encontrado o subgrupo
                $cmd = $this->pdo->prepare("CREATE OR REPLACE VIEW resultados_erros AS
                SELECT r.resQuestaoID AS resQuestaoIDErro,COUNT(r.resID) erros
                FROM resultados r
                WHERE resAtividadeID = :atiID AND resResposta = 'Nao' AND resStsResposta = 'Respondido' GROUP BY resQuestaoID ASC;");
                $cmd->bindValue(":atiID",$id);
                $cmd->execute();
                return true;
            }
        }

        public function criarViewTotalAlunos($id)
        {
            // verificar se o subgrupo ja esta cadastrado
            $cmd = $this->pdo->prepare("SELECT resQuestaoID,COUNT(resUsuarioAtividadeID) AS totalAlunos FROM resultados WHERE resAtividadeID = :atiID  AND resStsResposta = 'Respondido'  GROUP BY resQuestaoID ORDER BY resQuestaoID;");
            $cmd->bindValue(":atiID",$id);
            $cmd->execute();
    
            if ($cmd->rowCount() == 0) {// subgrupo ja existe no banco
                    return false;
            } else { //não foi encontrado o subgrupo
                $cmd = $this->pdo->prepare("CREATE OR REPLACE VIEW resultados_totalalunos AS
                SELECT resQuestaoID,COUNT(resUsuarioAtividadeID) AS totalAlunos FROM resultados 
                WHERE resAtividadeID = :atiID  AND resStsResposta = 'Respondido'  GROUP BY resQuestaoID ORDER BY resQuestaoID;");
                $cmd->bindValue(":atiID",$id);
                $cmd->execute();
                return true;
            }
    
        }

        public function resultadoQuestao($id){
            $res = array();
            $cmd = $this->pdo->prepare("SELECT atiqOrdemQuestao,r1.*,c.claNome,r2.resQuestaoIDErro,r2.erros,atiqPontuacao, r3.totalAlunos 
            FROM atividade_questao aq LEFT JOIN resultados_acertos r1 ON r1.resQuestaoID = aq.atiqQuestaoID 
            LEFT JOIN resultados_erros r2 ON aq.atiqQuestaoID = r2.resQuestaoIDErro 
            JOIN resultados_totalalunos r3 ON r3.resQuestaoID = aq.atiqQuestaoID
            JOIN atividades a ON a.atiID = aq.atiqAtividadeID
            JOIN classes c ON c.claCodigo = a.atiClasseID
            WHERE atiqAtividadeID = :atiID  ORDER BY atiqOrdemQuestao;");
            $cmd->bindValue(":atiID",$id);
            $cmd->execute();
            $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
    
            return $res;
        }

        public function questoesDaAtividade($id){
            $res = array();
            $cmd = $this->pdo->prepare("SELECT alt.*,q.queDescricao,a.atiqOrdemQuestao 
            FROM alternativas alt 
            LEFT JOIN questoes q ON alt.altQuestaoID = q.queID 
            RIGHT JOIN atividade_questao a ON a.atiqQuestaoID = q.queID WHERE a.atiqAtividadeID = :atiID GROUP BY alt.altID ORDER BY atiqOrdemQuestao;");
            $cmd->bindValue(":atiID",$id);
            $cmd->execute();
            $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
    
            return $res;
        }
        public function criarViewQuestoesDaAtividade($id)
        {
            // verificar se o subgrupo ja esta cadastrado
            $cmd = $this->pdo->prepare("SELECT alt.*,q.queDescricao,a.atiqOrdemQuestao 
            FROM alternativas alt 
            LEFT JOIN questoes q ON alt.altQuestaoID = q.queID 
            RIGHT JOIN atividade_questao a ON a.atiqQuestaoID = q.queID WHERE a.atiqAtividadeID = :atiID GROUP BY alt.altID ORDER BY atiqOrdemQuestao;");
            $cmd->bindValue(":atiID",$id);
            $cmd->execute();
    
            if ($cmd->rowCount() == 0) {// subgrupo ja existe no banco
                    return false;
            } else { //não foi encontrado o subgrupo
                $cmd = $this->pdo->prepare("CREATE OR REPLACE VIEW questoes_e_alternativas AS
                SELECT alt.*,q.queDescricao,a.atiqOrdemQuestao FROM alternativas alt 
                LEFT JOIN questoes q ON alt.altQuestaoID = q.queID 
                RIGHT JOIN atividade_questao a ON a.atiqQuestaoID = q.queID WHERE a.atiqAtividadeID = :atiID GROUP BY alt.altID ORDER BY atiqOrdemQuestao;");
                $cmd->bindValue(":atiID",$id);
                $cmd->execute();
                return true;
            }
    
        }
        public function resultadosAluno($id){
            $res = array();
            $cmd = $this->pdo->prepare("SELECT r.*,qa.* 
            FROM resultados r JOIN usuario_atividade ua ON ua.usuID = r.resUsuarioAtividadeID  
            JOIN questoes_e_alternativas qa ON qa.altQuestaoID = r.resQuestaoID  WHERE r.resUsuarioAtividadeID = :usuID ORDER BY atiqOrdemQuestao");
            $cmd->bindValue(":usuID",$id);
            $cmd->execute();
            $res = $cmd->fetchAll(PDO::FETCH_ASSOC);
    
            return $res;
        }

    }


?>