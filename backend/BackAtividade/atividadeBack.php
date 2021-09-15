<?php

   require_once '../backend/BackAtividade/atividades.php';
   require_once '../backend/BackAtividade/questao.php';

 $a = new Atividade("pedagogy","localhost","root","");
 $q = new Questao("pedagogy","localhost","root","");



 if (isset($_POST["disciplina"])) // clicou no botao cadastrar ou editar DISCIPLINA
 {    

     $opDisciplina = addslashes($_POST["opDisciplina"]);
     $disIdUpdate = addslashes($_POST["disID"]);
     $disDescricao = addslashes($_POST['disciplina']);
     
     if($opDisciplina == "update" && !empty($disDescricao) ){// editar

         if (!empty($disDescricao) && !empty($opDisciplina)){  // se os campos nao estiverem vazios entra no if   
             
                 $p->atualizarDadosAtividade($atiIDUpdate,$atiDescricao);
                $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
                die($output);      
         }else{
            $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
            die($output);
         }
     }else if(!empty($disDescricao)){ // cadastrar
         if (!empty($disDescricao)){ 
            
             if($p->cadastrarAtividades($disDescricao)){
                $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrado com sucesso!'));
                die($output);      
             }else{
                $output = json_encode(array('type' => 'erro', 'text' => 'Disciplina já cadastrada!'));
                die($output);  
             }          
        }
     }else{
         $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
         die($output);
     }
 }

 if (isset($_POST["tematica"])) // clicou no botao cadastrar ou editar TEMATICA
 {    
     $temDisciplinaID = addslashes($_POST["disciplinaopc"]);
     $opTematica = addslashes($_POST["opTematica"]);
     $temIdUpdate = addslashes($_POST["temID"]);
     $temDescricao = addslashes($_POST['tematica']);
     
     // editar
     if($opTematica == "update" && !empty($temDescricao) ){
        
         if (!empty($temDescricao) && !empty($opTematica)) 
         {   // EDITAR
             $t->atualizarDadosQuestao($temIdUpdate,$temDescricao,$temDisciplinaID);     
             $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
             die($output);                     
         }
         else{
            $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
            die($output);
         }
     }else if(!empty($temDescricao)){ // cadastrar
       
            if($t->cadastrarQuestao($temDescricao,$temDisciplinaID)){
               $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrado com sucesso!'));
               die($output);      
            }else{
               $output = json_encode(array('type' => 'erro', 'text' => 'Tematica já cadastrada!'));
               die($output);  
            }          
    }else{
        $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
        die($output);
    }
 }

 if (isset($_POST["subgrupo"])) // clicou no botao cadastrar ou editar SUBGRUPO
 {    
     $subTematicaID = addslashes($_POST["tematicaopc"]);
     $opSubgrupo = addslashes($_POST["opSubgrupo"]);
     $subIdUpdate = addslashes($_POST["subID"]);
     $subDescricao = addslashes($_POST['subgrupo']);
     
     // editar
     if($opSubgrupo == "update" && !empty($subDescricao) ){
        
         if (!empty($subDescricao) && !empty($opSubgrupo)) 
         {   // EDITAR
             $s->atualizarDadosSubgrupo($subIdUpdate,$subDescricao,$subTematicaID);     
             $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
             die($output);                     
         }
         else{
            $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
            die($output);
         }
     }else if(!empty($subDescricao)){ // cadastrar
       
            if($s->cadastrarSubgrupo($subDescricao,$subTematicaID)){
               $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrado com sucesso!'));
               die($output);      
            }else{
               $output = json_encode(array('type' => 'erro', 'text' => 'Subgrupo já cadastrado!'));
               die($output);  
            }          
    }else{
        $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
        die($output);
    }
 }

//chamada para carregar a tabela
 if(isset($_POST['buscaInicialQuestao'])){
    $buscaInicialDisciplina = addslashes($_POST['buscaInicialQuestao']);

    if($buscaInicialDisciplina == true){
       $dadosQuestao = $p->buscarDadosQuestao();
       if (!empty($dadosQuestao)) {
        print json_encode($dadosQuestao,JSON_UNESCAPED_UNICODE);
       }      
    }
}
if(isset($_POST['buscaInicialTematica'])){
   $buscaInicialTematica = addslashes($_POST['buscaInicialTematica']);

   if($buscaInicialTematica == true){   
       $dadosTematica = $t->BuscarTematica();
       if (!empty($dadosTematica)) {
           print json_encode($dadosTematica,JSON_UNESCAPED_UNICODE);
       }
   }
}
if(isset($_POST['buscaInicialSubgrupo'])){
   $buscaInicialSubgrupo = addslashes($_POST['buscaInicialSubgrupo']);

   if($buscaInicialSubgrupo == true){   
       $dadosSubgrupo = $s->buscarDadosSub();
       if (!empty($dadosSubgrupo)) {
           print json_encode($dadosSubgrupo,JSON_UNESCAPED_UNICODE);
       }
   }
}

//Deletar da tabela
if(isset($_POST['idDeleteSelecionado'])){
    $idDeleteSelecionado = addslashes($_POST['idDeleteSelecionado']);
    $tabelaSelecionada = addslashes($_POST['tabelaSelecionada']);

    if($tabelaSelecionada == "disciplina" && !empty($idDeleteSelecionado)){
       $p->excluirDisciplina($idDeleteSelecionado);
       $output = json_encode(array('type' => 'excluido', 'text' => 'Excluído com sucesso!'));
       die($output);
    }else if($tabelaSelecionada == "tematica" && !empty($idDeleteSelecionado)){
        $t->excluirTematica($idDeleteSelecionado);
        $output = json_encode(array('type' => 'excluido', 'text' => 'Excluído com sucesso!'));
        die($output);
     }else if($tabelaSelecionada == "subgrupo" && !empty($idDeleteSelecionado)){
         $s->excluirSubgrupo($idDeleteSelecionado);
         $output = json_encode(array('type' => 'excluido', 'text' => 'Excluído com sucesso!'));
         die($output);
     }
}


?>

