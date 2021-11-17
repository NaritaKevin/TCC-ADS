<?php

   require_once '../BackAtividade/atividades.php';
   require_once '../questao.php';
   require_once '../resultados/resultados.php';

    $a = new Atividade("pedagogy","localhost","root","");
    $q = new Questao("pedagogy","localhost","root","");
    $r = new Resultados("pedagogy","localhost","root","");

if(isset($_POST["opID"]) && isset($_POST["opAtividade"])){
   $opID =  addslashes($_POST['opID']);
   $opAtividade=  addslashes($_POST['opAtividade']);

   if($opAtividade == "delete" && !empty($opID)){
    $a->excluirAtividadeQuestao($opID);// excluir primeiro da tabela atividade questão

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
     $turma = addslashes($_POST['turma']);
     $StsQuestoes = addslashes($_POST['StsQuestoes']);

    $questoesID  = array_map( 'addslashes', $_POST['questoesID'] );

     $opID = "";
     $opAtividade = "";
     
     if(isset($_POST["opID"])){
         $opID =  addslashes($_POST['opID']);
         
     }else if(isset($_POST["IDatividade"])){
        $opID =  addslashes($_POST['IDatividade']);
     }
     if(isset($_POST["opAtividade"])){
         $opAtividade=  addslashes($_POST['opAtividade']);
     }
 

     if($opAtividade == "update2" && !empty($opID)){
         if(!empty($nome) && !empty($descricao) && !empty($tipoopc) && !empty($dataInicial) && !empty($dataFinal) && !empty($dataFinal) ){// editar

             if($status == 2){
                 $tipoStatus = "Pública";
             }else{
                 $tipoStatus = "Privada";
             }

             //if (!empty($disDescricao) && !empty($opAtividade)){  // se os campos nao estiverem vazios entra no if

             $a->atualizarDadosAtividade($opID,$nome,$descricao, $tipoopc, $dataInicial, $dataFinal, $tipoStatus, $turma );

            $a->excluirAtividadeQuestao($opID);


            for ($i = 0; $i < count($questoesID); $i++) {
                if($a->CadastrarAtividadeQuestao($dataInicial,$opID, $questoesID[$i])){
                    $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
                }else{
                    $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao cadastrar questões!'));
                    die($output);
                }
             }
            // $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
             die($output);
         }else{
             $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
             die($output);
             // }
         }
     }

     if(!empty($nome) && !empty($descricao) && !empty($tipoopc) && !empty($dataInicial) && !empty($dataFinal) && !empty($dataFinal)  && !empty($turma) && !empty($StsQuestoes) ){
        if($status == 2){
            $tipoStatus = "Pública";
        }else{
            $tipoStatus = "Privada";
        }

        if($StsQuestoes == 2){
            $Status= "Na Ordem";
        }else{
            $Status = "Aleatória";
        }




         if($a->cadastrarAtividades($nome, $descricao, $tipoopc,  $dataInicial, $dataFinal, $tipoStatus, $turma , $Status)){

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
    $dadosQuestoes = addslashes($_POST['Selecionadas']);
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


if(isset($_POST['buscaInicialEscolher'])){
    $buscaInicialQuestoes = addslashes($_POST['buscaInicialEscolher']);
    $questoes = addslashes($_POST['arr_questoes']);
    $semNada =[];
    if($buscaInicialQuestoes == true){
       $questao = $a->buscarDadosQuestaoEscolher($questoes);

       if (empty($questao)) {
           
        print json_encode(array('semNada'=> ''),JSON_UNESCAPED_UNICODE);
       }  
       if (!empty($questao)) {
        print json_encode($questao,JSON_UNESCAPED_UNICODE);
       }      
    }
}



if(isset($_POST['buscaInicialQuestõesEditar'])){
    $buscaInicialQuestoes = addslashes($_POST['buscaInicialQuestõesEditar']);
    $atividadeID = addslashes($_POST['opID']);
   $semNada =[];
   // $questoesAtividade = array();
    if($buscaInicialQuestoes == true){
        $questoesAtividade =  $a->buscarDadosAtividadeEditar($atividadeID);
        if (empty($questoesAtividade)) {
           
           print json_encode(array('semNada'=> ''),JSON_UNESCAPED_UNICODE);
          }  

        if(!empty($questoesAtividade)){
            print json_encode($questoesAtividade,JSON_UNESCAPED_UNICODE);
         }
    }
     
}


if(isset($_POST['buscaInicialNada'])){
    $buscaInicialQuestoes = addslashes($_POST['buscaInicialNada']);
   
   
    if($buscaInicialQuestoes == true){
       $dadosQuestao = $a->buscarNada();
        print json_encode( $dadosQuestao,JSON_UNESCAPED_UNICODE);
       }  
}


//carregar atividade com as questoes e alternativas
if(isset($_POST['atiIDResultados'])){
    $atividadeID = addslashes($_POST['atiIDResultados']);

    if($atividadeID != 0){
    
       $atividadeMontada = $r->questoesDaAtividade($atividadeID);
      
       if (!empty($atividadeMontada)) {
          print json_encode($atividadeMontada,JSON_UNESCAPED_UNICODE);
       }else{
          $output = json_encode(array('type' => 'buscaVazia', 'text' => 'Não foi encontrado a atividade!'));
          die($output);
       }
 
    }else{
       $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao buscar a atividade!'));
       die($output);
    }
 }

?>
