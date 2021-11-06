<?php

   require_once '../BackAtividade/atividades.php';
   require_once '../questao.php';

    $a = new Atividade("pedagogy","localhost","root","");
    $q = new Questao("pedagogy","localhost","root","");


if(isset($_POST["opID"]) && isset($_POST["opAtividade"])){
   $opID =  addslashes($_POST['opID']);
   $opAtividade=  addslashes($_POST['opAtividade']);

   if($opAtividade == "delete" && !empty($opID)){

    $a->excluirAtividade($opID);
    $output = json_encode(array('type' => 'sucesso', 'text' => 'Excluido com sucesso!'));
    die($output);
    }

   if($opAtividade == "update" && !empty($opID)){//buscar atividade no banco e alterar

      $updateAtividade =  $a->buscarDadosAtividade($opID);
      if(empty($updateAtividade))
      {
        $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao buscar questão!'));
        die($output);
      }
      else
      {
       $output = json_encode($updateAtividade);
       die($output);
      }
   
     }

}
 
 if (isset($_POST["nome"])){ // clicou no botao cadastrar ou editar DISCIPLINA
     $nome = addslashes($_POST["nome"]);
     $descricao = addslashes($_POST["descricao"]);
     $tipoopc = addslashes($_POST['tipoopc']);
     $dataInicial = addslashes($_POST['dataFormInicial']);
     $dataFinal = addslashes($_POST['dataFormFinal']);
     $status = addslashes($_POST['status']);

    $questoesID  = array_map( 'addslashes', $_POST['questoesID'] );

     $opID = "";
     $opAtividade = "";
     
     if(isset($_POST["opID"])){
         $opID =  addslashes($_POST['opID']);
     }
     if(isset($_POST["opAtividade"])){
         $opAtividade=  addslashes($_POST['opAtividade']);
     }
 

     if($opAtividade == "update2" && !empty($opID)){
         if(!empty($nome) && !empty($descricao) && !empty($tipoopc) && !empty($dataInicial) && !empty($dataFinal) && !empty($dataFinal) ){// editar

             if($status == 2){
                 $tipoStatus = "Postado";
             }else{
                 $tipoStatus = "Não Postado";
             }

             //if (!empty($disDescricao) && !empty($opAtividade)){  // se os campos nao estiverem vazios entra no if

             $a->atualizarDadosAtividade($opID,$nome,$descricao, $tipoopc, $dataInicial, $dataFinal, $tipoStatus );
             $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
             die($output);
         }else{
             $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
             die($output);
             // }
         }
     }

     if(!empty($nome) && !empty($descricao) && !empty($tipoopc) && !empty($dataInicial) && !empty($dataFinal) && !empty($dataFinal) && !empty($questoesID) ){
        if($status == 2){
            $tipoStatus = "Postado";
        }else{
            $tipoStatus = "Não Postado";
        }


         if($a->cadastrarAtividades($nome, $descricao, $tipoopc,  $dataInicial, $dataFinal, $tipoStatus)){

             $atividadeID = $a->buscarUltimaAtividadeCadastrada();
             if(empty($atividadeID)){
                 $output = json_encode(array('type' => 'erro', 'text' => 'Atividade não cadastrada!'));
                 die($output);
             }


             for ($i = 0; $i < count($questoesID); $i++) {
                if($a->CadastrarAtividadeQuestao($dataInicial,$atividadeID['atiID'], $questoesID[$i])){
                    $output = json_encode(array('type' => 'sucesso', 'text' => 'Atividade cadastrada com sucesso!'));
                }else{
                    $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao cadastrar questões!'));
                    die($output);
                }
             }


             die($output);
         }else{
             $output = json_encode(array('type' => 'validacao', 'text' => 'Esta atividade já está cadastrada no sistema!'));
             die($output);
         }

    } else{
        $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
        die($output);
    }
     
      
}


//chamada para carregar a tabela
if(isset($_POST['buscaInicialAtividade'])){
    $buscaInicialAtividade = addslashes($_POST['buscaInicialAtividade']);

    if($buscaInicialAtividade == true){
       $dadosAtividade = $a->buscarDados();
       //die($dadosQuestao);
       if (!empty($dadosAtividade)) {
        print json_encode($dadosAtividade,JSON_UNESCAPED_UNICODE);
       }      
    }
}


//chamada para carregar a tabela
 if(isset($_POST['buscaInicialQuestao'])){
    $buscaInicialDisciplina = addslashes($_POST['buscaInicialQuestao']);

    if($buscaInicialDisciplina == true){
       $dadosQuestao = $q->buscarDadosQuestao();
       //die($dadosQuestao);
       if (!empty($dadosQuestao)) {
        print json_encode($dadosQuestao,JSON_UNESCAPED_UNICODE);
       }      
    }
}


if(isset($_POST['buscaInicialQuestoesSelecionadas'])){
    $buscaInicialQuestoes = addslashes($_POST['buscaInicialQuestoesSelecionadas']);
    $dadosQuestoes = addslashes($_POST['queSel']);
    $semNada =[];
    if($buscaInicialQuestoes == true){
       $dadosQuestao = $a->buscarDadosQuestaoSelecionadas($dadosQuestoes);

       if (empty($dadosQuestao)) {
           
        print json_encode(array('semNada'=> ''),JSON_UNESCAPED_UNICODE);
       }  
       if (!empty($dadosQuestao)) {
        print json_encode($dadosQuestao,JSON_UNESCAPED_UNICODE);
       }      
    }
}


?>
