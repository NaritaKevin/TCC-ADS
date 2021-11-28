<?php

   require_once 'resultados.php';
 

 $r = new Resultados("pedagogy","localhost","root","");


 //chamada para carregar a tabela
 if(isset($_POST['buscaInicialAtividades'])){
    $buscaInicialAtividades = addslashes($_POST['buscaInicialAtividades']);

    if($buscaInicialAtividades == true){
       $dados = $r->BuscarAtividades();
       if (!empty($dados)) {
        print json_encode($dados,JSON_UNESCAPED_UNICODE);
       }else{
          $nada = [];
         print json_encode($nada,JSON_UNESCAPED_UNICODE);
       }   
    }
}
//carregar tabela dos alunos da atividade
if(isset($_POST['buscaInicialAlunosResultados']) && isset($_POST['idAtividade'])){
   $buscaInicialAlunosResultados = addslashes($_POST['buscaInicialAlunosResultados']);
   $idAtividade = addslashes($_POST['idAtividade']);

   if($buscaInicialAlunosResultados == true){
      $dados = $r->buscarResultadosAluno($idAtividade);
      if (!empty($dados)) {
       print json_encode($dados,JSON_UNESCAPED_UNICODE);
      }else{
         $nada = [];
         print json_encode($nada,JSON_UNESCAPED_UNICODE);
      }

   }
}
//carregar graficos
if(isset($_POST['atividadeID'])){
   $atividadeID = addslashes($_POST['atividadeID']);

   if($atividadeID != 0){
      if($r->criarViewAcertos($atividadeID) && $r->criarViewErros($atividadeID) && $r->criarViewTotalAlunos($atividadeID)){
         $dados = $r->resultadoQuestao($atividadeID);
         if (!empty($dados)) {
            print json_encode($dados,JSON_UNESCAPED_UNICODE);
         }else{
            $nada = [];
           print json_encode($nada,JSON_UNESCAPED_UNICODE);
         }   
      }else{
         $output = json_encode(array('type' => 'buscaVazia', 'text' => 'Os alunos não responderam as questões!'));
         die($output);
      }
    
      // $merge = array_merge($dados, $dados1);
     
   }
}
//carregar atividade com as questoes e alternativas
if(isset($_POST['atiIDResultados']) && isset($_POST['idAluno'])){
   $atividadeID = addslashes($_POST['atiIDResultados']);
   $alunoID = addslashes($_POST['idAluno']);
   if($atividadeID != 0){
   
      $dados = $r->questoesDaAtividade($atividadeID);
      $r->criarViewQuestoesDaAtividade($atividadeID);
      $dados1 = $r->resultadosAluno($alunoID);
      if (!empty($dados)) {
         print json_encode(array($dados,$dados1),JSON_UNESCAPED_UNICODE);
      }else{
         $output = json_encode(array('type' => 'buscaVazia', 'text' => 'Não foi encontrado a atividade!'));
         die($output);
      }

   }else{
      $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao buscar a atividade!'));
      die($output);
   }
}