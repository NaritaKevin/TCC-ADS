<?php
 header('Content-Type: text/html; charset=utf-8');

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
     
        if($q->excluirAlternativa($idDeleteSelecionado) &&  $q->excluirQuestao($idDeleteSelecionado) ){
            $output = json_encode(array('type' => 'excluido', 'text' => 'Excluído com sucesso!'));
            die($output);
        }else{
            $output = json_encode(array('type' => 'erro', 'text' => 'Ocorreu um erro ao excluir a questão!'));
            die($output);
        }
       
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
       }else{
           print json_encode($dadosAlternativas,JSON_UNESCAPED_UNICODE);
       }
    }else{
        $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao buscar as alternativas!'));
        die($output);  
    }
}

// BUSCAR QUESTAO PARA ALTERARRR/ALTERARR
if(isset($_POST['idEditQuestao']) && isset($_POST['opQuestao'])){
    $opQuestao = addslashes($_POST["opQuestao"]);
    $queID = addslashes($_POST["idEditQuestao"]);

    if($opQuestao == "update" && !empty($queID) ){

        $questao = $q->buscarQuestao($queID);
        $alternativas = $q->buscarAlternativasDaQuestao($queID);
        if(empty($questao)){
            $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao buscar questão!'));
            die($output); 
        }else{

           $output =  array('queID' => $questao[0]['queID'], 'queDescricao' => $questao[0]['queDescricao'], 'queCodigoBncc' => $questao[0]['queCodigoBncc'],
            'quePalavrasChave' => $questao[0]['quePalavrasChave'], 'queStsTipo' => $questao[0]['queStsTipo'], 'queStsRevisao'=> $questao[0]['queStsRevisao'],
            'nivID' => $questao[0]['nivID'],
            'subID' => $questao[0]['subID'],
            'temID' => $questao[0]['temID'],
            'disID' => $questao[0]['disID'], 
            'queAnoID' => $questao[0]['queAnoID'], 
            'subDescricao' => $questao[0]['subDescricao'],
            'temDescricao' => $questao[0]['temDescricao'],
            'disDescricao' => $questao[0]['disDescricao'],
            'anoDescricao' => $questao[0]['anoDescricao'],
            'anoEtapa' => $questao[0]['anoEtapa'],  
            'nivDescricao' => $questao[0]['nivDescricao'],$alternativas);

            $output2 = json_encode($output);
           
            die($output2);  
        }
         
    
    } else{
        $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao buscar questão!'));
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
    $ano = addslashes($_POST['ano']);

    $id='';
    $update = '';
    $cadastrar = true;
    if(isset($_POST['atualizarQuestao']) && isset($_POST['questaoID'])){
        $opQuestao = addslashes($_POST["atualizarQuestao"]);
        $queID = addslashes($_POST["questaoID"]);

        $id = $queID;
        $update = $opQuestao;
    }


    
    

    if ( $update == "update" && !empty($queID)) {// Editar questão
        if(!empty($enunciado) && !empty($subgrupoopc) && !empty($nivelopc) && !empty($statusopc) && !empty($ano)){

            if($q->atualizarDadosQuestao($id,$enunciado,$codigobncc,$palavrasChave,$statusopc,$nivelopc,$ano,$subgrupoopc)){
                $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
                $q->excluirAlternativa($id);

                $cadastrar = false;
            }else{
                $output = json_encode(array('type' => 'erro', 'text' => 'Erro ao atualizar!'));
                die($output); 
            }       
        }else{
            $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
            die($output); 
        }
                           
    }
   
    if($cadastrar == true){
        if(!empty($enunciado) && !empty($subgrupoopc)  && !empty($nivelopc) && !empty($statusopc) && !empty($ano)){ // Cadastrar questão
        
            if($q->cadastrarQuestao($enunciado,$codigobncc,$palavrasChave,$statusopc,$nivelopc,$ano,$subgrupoopc)){
            $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrada com sucesso!'));
            //die($output);  
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

        if($cadastrar == true){
            if($q->cadastrarAlternativa($altLetra,$altDescricao,$altStsCorreta,$altQuestaoID['queID'])){ // cadastrar alternativa
                $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrada com sucesso!'));   
            }else{
                $output = json_encode(array('type' => 'erro', 'text' => 'Ocorreu um erro ao cadastrar alternativas!'));
                die($output);  
            }
        }else{
            if($q->cadastrarAlternativa($altLetra,$altDescricao,$altStsCorreta,$id)){ // cadastrar alternativa
                $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrada com sucesso!'));   
            }else{
                $output = json_encode(array('type' => 'erro', 'text' => 'Ocorreu um erro ao cadastrar alternativas!'));
                die($output);  
            }
        }
       
    }
  

  
    $alternativa = substr($alternativa,0, -7);
    $alternativaX = "";
    $alternativaxtexto = "";
    $alternativaxstatus ="";

  }

  
  $questao = $q->buscarAlternativaCerta($id);
  $resultado = $q->buscarResultados($id);
   
  // print_r($questao[0]['altLetra']);
  // print_r(count($questao));
  if(count($resultado) > 0 && count($questao) > 0){
    for($x = 0; $x <  count($questao); $x++){

        for($i = 0; $i <  count($resultado); $i++){
            if($resultado[$i]['resAltEscolhida'] == $questao[$x]['altLetra'] && $questao[$x]['altStsCorreta'] == "Incorreta"){
                $q->atualizarResultados($resultado[$i]['resID'],"Não");
            }else if( $resultado[$i]['resAltEscolhida'] == $questao[$x]['altLetra'] && $questao[$x]['altStsCorreta'] == "Correta"){
                $q->atualizarResultados($resultado[$i]['resID'],"Sim");
            }
        }
    }
  }
  

  die($output); 

}
























































?>

