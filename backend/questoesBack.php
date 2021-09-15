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
        $q->excluirAlternativa($idDeleteSelecionado);
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

if(isset($_POST['idQuestaoSelecionada'])){

    $idQuestaoSelecionada = addslashes($_POST['idQuestaoSelecionada']);

    if(!empty($idQuestaoSelecionada)){
       $dadosAlternativas = $q->buscarAlternativasDaQuestao($idQuestaoSelecionada);
       if(!empty($dadosAlternativas)){
            print json_encode($dadosAlternativas,JSON_UNESCAPED_UNICODE);
       }
    }else{
        $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao buscar as alternativas!'));
        die($output);  
    }
}

if(isset($_POST['subgrupoopc']) && isset($_POST['nivelopc']) && isset($_POST['statusopc']) && isset($_POST['codigobncc']) && isset($_POST['enunciado'])){
    $subgrupoopc = addslashes($_POST['subgrupoopc']);
    $nivelopc = addslashes($_POST['nivelopc']);
    $codigobncc = addslashes($_POST['codigobncc']);
    $statusopc = addslashes($_POST['statusopc']);
    $enunciado = addslashes($_POST['enunciado']);
    $palavrasChave = addslashes($_POST['palavrasChave']);
    //$opQuestao = addslashes($_POST['opQuestao']);
    $opQuestao ="a";
    $ano = "1";
    

    if($opQuestao == "update" && !empty($enunciado) ){// Editar questão
        
     
        //     $s->atualizarDadosSubgrupo($subIdUpdate,$subDescricao,$subTematicaID);     
        //     $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
        //     die($output);                     
      
    }else if(!empty($enunciado) && !empty($subgrupoopc)){ // Cadastrar questão
      
           if($q->cadastrarQuestao($enunciado,$codigobncc,$palavrasChave,$statusopc,$nivelopc,$ano,$subgrupoopc)){
              $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrada com sucesso!'));
                  
           }else{
              $output = json_encode(array('type' => 'erro', 'text' => 'Questão já cadastrada!'));
              die($output);  
           }          
   }else{
       $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
       die($output);
   }


   $altQuestaoID = $q->buscarUltimaQuestaoCadastrada();
   if(empty($altQuestaoID)){
        $output = json_encode(array('type' => 'erro', 'text' => 'Questão não cadastrada!'));
        die($output); 
   }

   
    $alternativa = "alternativa";
    $letra = array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P");
	$texto = "texto";
    $status = "status";
    
    $alternativaX = "";
    $alternativaxtexto = "";
    $alternativaxstatus = "";

  for($x = 0; $x <  count($letra); $x++){

  $alternativa .= "$letra[$x]";
    $alternativaX = $alternativa;

  $alternativa .= "$texto";
    $alternativaxtexto = $alternativa;

   $alternativa = substr($alternativa,0, -5);

    $alternativa .= "$status";
    $alternativaxstatus = $alternativa;


    if(isset($_POST[$alternativaX]) && isset($_POST[$alternativaxtexto]) && isset($_POST[$alternativaxstatus])){

        $altLetra = addslashes($_POST[$alternativaX]);
        $altDescricao = addslashes($_POST[$alternativaxtexto]);
        $altStsCorreta = addslashes($_POST[$alternativaxstatus]);

        if($q->cadastrarAlternativa($altLetra,$altDescricao,$altStsCorreta,$altQuestaoID['queID'])){ // cadastrar alternativa
            $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrada com sucesso!'));   
            }else{
                $output = json_encode(array('type' => 'erro', 'text' => 'Ocorreu um erro ao cadastrar alternativas!'));
                die($output);  
            }
    }
  

  
    $alternativa = substr($alternativa,0, -7);
    $alternativaX = "";
    $alternativaxtexto = "";
    $alternativaxstatus ="";

  }

  die($output); 

}
























































?>

