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
       }      
    }
}

if(isset($_POST['buscaInicialAlunosResultados']) && isset($_POST['idAtividade'])){
   $buscaInicialAlunosResultados = addslashes($_POST['buscaInicialAlunosResultados']);
   $idAtividade = addslashes($_POST['idAtividade']);

   if($buscaInicialAlunosResultados == true){
      $dados = $r->buscarResultadosAluno($idAtividade);
      if (!empty($dados)) {
       print json_encode($dados,JSON_UNESCAPED_UNICODE);
      }

   }
}

if(isset($_POST['atividadeID'])){
   $atividadeID = addslashes($_POST['atividadeID']);

   if($atividadeID != 0){
      if($r->criarViewAcertos($atividadeID) && $r->criarViewErros($atividadeID) && $r->criarViewTotalAlunos($atividadeID)){
         $dados = $r->resultadoQuestao($atividadeID);
         if (!empty($dados)) {
            print json_encode($dados,JSON_UNESCAPED_UNICODE);
         }
      }else{
         $output = json_encode(array('type' => 'buscaVazia', 'text' => 'Os alunos não responderam as questões!'));
         die($output);
      }
    
      // $merge = array_merge($dados, $dados1);
     
   }
}