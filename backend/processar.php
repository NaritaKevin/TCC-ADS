<?php


   require_once '../backend/disciplina.php';
   require_once '../backend/tematica.php';
   require_once '../backend/subgrupo.php';

 $p = new Disciplina("pedagogy","localhost","root","");
 $t = new Tematica("pedagogy","localhost","root","");
 $s = new Subgrupo("pedagogy","localhost","root","");



 if (isset($_POST["disciplina"])) // clicou no botao cadastrar ou editar DISCIPLINA
 {    
    
      $aa = "teste";
     $opDisciplina = addslashes($_POST["opDisciplina"]);
     $disIdUpdate = addslashes($_POST["disID"]);
     $disDescricao = addslashes($_POST['disciplina']);
     

    
     if($opDisciplina == "update" && !empty($disDescricao) ){// editar

         if (!empty($disDescricao) && !empty($opDisciplina)){  // se os campos nao estiverem vazios entra no if   
             
                 $p->atualizarDadosDisciplina($disIdUpdate,$disDescricao);
                $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
                die($output);      
         }else{
            $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos'));
            die($output);
         }
     }else if(!empty($disDescricao)){ // cadastrar
         if (!empty($disDescricao)){ 
            
             if($p->cadastrarDisciplina($disDescricao)){
                $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrado com sucesso!'));
                die($output);      
             }else{
                $output = json_encode(array('type' => 'erro', 'text' => 'Disciplina já cadastrada!'));
                die($output);  
             }          
        }
     }else{
         $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos'));
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
             $t->atualizarDadosTematica($temIdUpdate,$temDescricao,$temDisciplinaID);     
             $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
             die($output);                     
         }
         else{
            $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos'));
            die($output);
         }
     }else if(!empty($temDescricao)){ // cadastrar
       
            if($t->cadastrarTematica($temDescricao,$temDisciplinaID)){
               $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrado com sucesso!'));
               die($output);      
            }else{
               $output = json_encode(array('type' => 'erro', 'text' => 'Tematica já cadastrada!'));
               die($output);  
            }          
    }else{
        $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos'));
        die($output);
    }
 }

//chamada para carregar a tabela
 if(isset($_POST['buscaInicialDisciplina'])){
    $buscaInicialDisciplina = addslashes($_POST['buscaInicialDisciplina']);

    if($buscaInicialDisciplina == true){
       $dadosDisciplina = $p->buscarDados();
       if (!empty($dadosDisciplina)) {
        print json_encode($dadosDisciplina,JSON_UNESCAPED_UNICODE);
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



























































?>

