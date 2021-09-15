<?php

   require_once 'atividades.php';
   require_once 'questao.php';

 $a = new Atividade("pedagogy","localhost","root","");
 $q = new Questao("pedagogy","localhost","root","");


//chamada para carregar a tabela
 if(isset($_POST['buscaInicialQuestao'])){
    $buscaInicialDisciplina = addslashes($_POST['buscaInicialQuestao']);

    if($buscaInicialDisciplina == true){
       $dadosQuestao = $q->buscarDadosQuestao();
       if (!empty($dadosQuestao)) {
        print json_encode($dadosQuestao,JSON_UNESCAPED_UNICODE);
       }      
    }
}
//Deletar da tabela
?>

