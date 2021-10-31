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