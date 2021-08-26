<?php

   require_once '../backend/questao.php';

 $q = new Questao("pedagogy","localhost","root","");




//chamada para carregar a tabela

if(isset($_POST['buscaInicialQuestao'])){
   $buscaInicialQuestao = addslashes($_POST['buscaInicialQuestao']);

   if($buscaInicialQuestao == true){   
       $dadosQuestao = $q->buscarDadosQuestao();
       if (!empty($dadosQuestao)) {
           print json_encode($dadosQuestao,JSON_UNESCAPED_UNICODE);
       }
   }
}

//Deletar da tabela
if(isset($_POST['idDeleteSelecionado'])){
    $idDeleteSelecionado = addslashes($_POST['idDeleteSelecionado']);
    $tabelaSelecionada = addslashes($_POST['tabelaSelecionada']);

    if($tabelaSelecionada == "questoes" && !empty($idDeleteSelecionado)){
         $q->excluirQuestao($idDeleteSelecionado);
         $output = json_encode(array('type' => 'excluido', 'text' => 'Excluído com sucesso!'));
         die($output);
     }
}

























































?>

