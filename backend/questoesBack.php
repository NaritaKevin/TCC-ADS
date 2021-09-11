<?php

   require_once '../backend/questao.php';
   require_once '../backend/subgrupo.php';
 $q = new Questao("pedagogy","localhost","root","");
 $s = new Subgrupo("pedagogy","localhost","root","");



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


//Mostrar disciplina e tematica no formulario
if(isset($_POST['opSelecionada'])){

    $subgrupoID = addslashes($_POST['opSelecionada']);

    if(!empty($subgrupoID)){
       $dadosSubgrupo = $s->buscarDadosSubgrupo($subgrupoID);
       if(!empty($dadosSubgrupo)){
            print json_encode($dadosSubgrupo,JSON_UNESCAPED_UNICODE);
       }
    }
}

// subgrupoopc: subgrupoopc,
// nivelopc: nivelopc,
// codigobncc: codigobncc,
// enunciado: enunciado,
// palavrasChave: palavrasChave






















































?>

