<?php

   require_once '../BackAtividade/atividades.php';
   require_once '../questao.php';

 $a = new Atividade("pedagogy","localhost","root","");
 $q = new Questao("pedagogy","localhost","root","");

 if (isset($_POST["nome"])) // clicou no botao cadastrar ou editar DISCIPLINA
 {    

    
     $nome = addslashes($_POST["nome"]);
     $descricao = addslashes($_POST["descricao"]);
     $tioopc = addslashes($_POST['tioopc']);
     $dataInicial = addslashes($_POST['dataFormInicial']);
     $dataFinal = addslashes($_POST['dataFormFinal']);
     $status = addslashes($_POST['status']);
     $opID = addslashes($_POST['opID']);
     $opAtividade = addslashes($_POST['opAtividade']);

     if($opAtividade == "update" && !empty($opId)){

       $updateAtividade =  $a->buscarDadosAtividade($opID);
        $output = json_encode($updateAtividade);
        die($output);

     }
     
     if(!empty($updateAtividade) && !empty($disDescricao) ){// editar

    //     if (!empty($disDescricao) && !empty($opDisciplina)){  // se os campos nao estiverem vazios entra no if   
             
           //      $p->atualizarDadosDisciplina($disIdUpdate,$disDescricao);
          //      $output = json_encode(array('type' => 'sucesso', 'text' => 'Alterado com sucesso!'));
         //       die($output);      
       //  }else{
       //     $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
       //     die($output);
       //  }
  //   }
     if(!empty($nome) && !empty($descricao) && !empty($tioopc) && !empty($dataInicial) && !empty($dataFinal) && !empty($dataFinal) ){
        if($status == 2){
            $tipoStatus = "Postado";
        }else{
            $tipoStatus = "Não Postado";
        }
         $a->cadastrarAtividades($nome, $descricao, $tioopc,  $dataInicial, $dataFinal, $tipoStatus);
         $output = json_encode(array('type' => 'sucesso', 'text' => 'Cadastrado com sucesso!'));
         die($output);
     }
     else
        {
            $output = json_encode(array('type' => 'validacao', 'text' => 'Preencha todos os campos!'));
            die($output);
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


//Deletar da tabela
?>

