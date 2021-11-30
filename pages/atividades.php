<?php
require_once '../backend/tipo.php';
require_once '../backend/classe.php';
require_once '../backend/questao.php';
require_once '../backend/subgrupo.php';
require_once '../backend/nivel.php';
$t = new Tipo("pedagogy", "localhost", "root", "");
$c = new Classe("pedagogy", "localhost", "root", "");
$q = new Questao("pedagogy", "localhost", "root", "");
$s = new Subgrupo("pedagogy", "localhost", "root", "");
$n = new Nivel("pedagogy", "localhost", "root", "");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Pedagogy</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="../vendors/feather/feather.css">
    <link rel="stylesheet" href="../vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" href="../vendors/css/vendor.bundle.base.css">
    <link rel="stylesheet" href="../vendors/bootstrapicons/bootstrap-icons.css">
    <link rel="stylesheet" href="../vendors/bootstrapselect/bootstrap-select.min.css">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <link rel="stylesheet" href="../vendors/datatables.net-bs4/dataTables.bootstrap4.css">
    <link rel="stylesheet" href="../vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" type="text/css" href="../js/select.dataTables.min.css">
    <link rel="stylesheet" href="../js/jquery.datetimepicker.min.css">
    <link rel="stylesheet" href="../js/dataTables.checkboxes.css">
    <link rel="stylesheet" href="../vendors/datatableRowReorder/rowReorder.css">


    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="../css/vertical-layout-light/style.css">
    <!-- endinject -->
    <link rel="shortcut icon" href="../images/logo-mini.svg" />

    <style type="text/css">
        .subgrupoSelected {
            cursor: default !important;
            color: black !important;
            background-color: #f8f9fa !important;
            border-color: #f8f9fa !important;
        }

        .subgrupoSelected:hover {
            background-color: #e6e9ed !important;
        }

        .dropdown-item.active,
        .dropdown-item:active {
            background-color: #6664bd;
        }

        .list-wrapper ul li {
            font-size: 0.9375rem;
            padding: 0.2rem 1.4rem;
            border: none;
            margin-bottom: 0.812rem;
            border-radius: 7px;
        }

        .list-wrapper ul li .form-check,
        .list-wrapper ul li .form-check .form-check-label,
        .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-name,
        .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-designation,
        .email-wrapper .mail-list-container .mail-list .content .sender-name,
        .email-wrapper .message-body .attachments-sections ul li .details p.file-name,
        .settings-panel .chat-list .list .info p {

            white-space: normal;
        }

    
    </style>
</head>

<body>
    <div class="container-scroller">
        <!-- partial:../../partials/_navbar.html -->
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a id="" class="navbar-brand brand-logo mr-5" href="../index.html"><img src="../images/logo-full.svg" class="mr-4 filter-purple" alt="logo" /></a>
                <a class="navbar-brand brand-logo-mini" href="../index.html"><img src="../images/logo-mini.svg" alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="icon-menu"></span>
                </button>

                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item dropdown">
                        <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                            <i class="icon-bell mx-0"></i>
                            <span class="count"></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                            <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                            <a class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <div class="preview-icon bg-success">
                                        <i class="ti-info-alt mx-0"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content">
                                    <h6 class="preview-subject font-weight-normal">Application Error</h6>
                                    <p class="font-weight-light small-text mb-0 text-muted">
                                        Just now
                                    </p>
                                </div>
                            </a>
                            <a class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <div class="preview-icon bg-warning">
                                        <i class="ti-settings mx-0"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content">
                                    <h6 class="preview-subject font-weight-normal">Settings</h6>
                                    <p class="font-weight-light small-text mb-0 text-muted">
                                        Private message
                                    </p>
                                </div>
                            </a>
                            <a class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <div class="preview-icon bg-info">
                                        <i class="ti-user mx-0"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content">
                                    <h6 class="preview-subject font-weight-normal">New user registration</h6>
                                    <p class="font-weight-light small-text mb-0 text-muted">
                                        2 days ago
                                    </p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item nav-profile dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                            <span>Perfil</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            <a class="dropdown-item">
                                <i class="ti-settings text-primary"></i>
                                Settings
                            </a>
                            <a class="dropdown-item">
                                <i class="ti-power-off text-primary"></i>
                                Logout
                            </a>
                        </div>
                    </li>

                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span class="icon-menu"></span>
                </button>
            </div>
        </nav>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">

            <!-- partial:../../partials/_sidebar.html -->
            <?php require_once '../partials/menu.php'; ?>
            <!-- Corpo da página-->
            <div class="main-panel">
                <div class="content-wrapper">
                    <div id="crudAtividade" class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 id="cardTableTitle" class="card-title">Tabela de atividades </h4>
                                    <p class="card-description">
                                        <button type="button" id="btn-nova-atividade" class="btn btn-primary btn-icon-text ">
                                            <i class="bi bi-plus-circle btn-icon-prepend "></i>
                                            Nova Atividade
                                        </button>
                                    </p>


                                    <div id="cadastrarAtividade">
                                        <div class="stretch-card">
                                            <div class="card">
                                                <div class="card-body" style="padding-bottom: 0px">
                                                    <h4 id="cardTitle" class="card-title">Cadastro de atividades</h4>
                                                    <p id="cardDesc" class="card-description">Informe os dados da atividade a ser
                                                        cadastrada.</p>
                                                    <form id="formAtividades">

                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-md-8">
                                                                    <label for="nome">Nome</label>
                                                                    <input type="text" class="form-control" id="nome" placeholder="Nome">
                                                                </div>

                                                                <div class="col-md-2">

                                                                    <label for="data-inicial">Data Inicial</label>
                                                                    <input type="text" id="data-inicial" class="form-control" autocomplete="off" />

                                                                </div>
                                                                <div class="col-md-2">
                                                                    <label for="data-final">Data Final</label>
                                                                    <input type="text" id="data-final" class="form-control" autocomplete="off" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="descricao">Descricao</label>
                                                            <textarea class="form-control" name="descricao" id="descricao" rows="7"></textarea>
                                                        </div>

                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-md-3">
                                                                    <label label class="labelCadastroAtividade">Tipo</label>
                                                                    <select id="tipoopc" class="selectpicker show-tick" name="tipoopc" data-width="fit">

                                                                        <?php $arr_tipo = $t->buscarTipo() ?>
                                                                        <?php if (!empty($arr_tipo)) { ?>
                                                                            <?php foreach ($arr_tipo as $tipoop) {
                                                                            ?>
                                                                                <option value="<?php echo $tipoop['tipID']; ?>"><?php echo $tipoop['tipDescricao']; ?></option>
                                                                            <?php } ?>
                                                                        <?php } ?>
                                                                    </select>
                                                                </div>

                                                                <div class="col-md-3">
                                                                    <label class="labelCadastroAtividade">Classe</label>
                                                                    <select id="classe" class="selectpicker show-tick" name="classe" data-width="fit">
                                                                        <?php $arr_classe = $c->buscarClasse() ?>
                                                                        <?php if (!empty($arr_classe)) { ?>
                                                                            <?php foreach ($arr_classe as $classe) {
                                                                            ?>
                                                                                <option value="<?php echo $classe['claCodigo']; ?>"><?php echo $classe['claNome']; ?></option>
                                                                            <?php } ?>
                                                                        <?php } ?>
                                                                    </select>
                                                                </div>

                                                                <div class="col-md-3">
                                                                    <label class="labelCadastroAtividade">Visibilidade da Atividade</label>
                                                                    <select id="status" class="selectpicker show-tick" name="status" data-width="fit">
                                                                        <option value="1">Privada</option>
                                                                        <option value="2">Pública</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <label class="labelCadastroAtividade">Continuar Onde Parou</label>
                                                                    <select id="stsReinicio" class="selectpicker show-tick" name="stsReinicio" data-width="fit">
                                                                        <option value="1">Sim</option>
                                                                        <option value="2">Não</option>
                                                                    </select>
                                                                </div>
                                                               

                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-md-3">
                                                                    <label class="labelCadastroAtividade">Exibição das Alternativas</label>
                                                                    <select id="stsAlternativas" class="selectpicker show-tick" name="stsAlternativas" data-width="fit">
                                                                        <option value="1">Randômica</option>
                                                                        <option value="2">Ordenada</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <label class="labelCadastroAtividade">Exibição das Questões</label>
                                                                    <select id="stsQuestoes" class="selectpicker show-tick" name="stsQuestoes" data-width="fit">
                                                                        <option value="1">Randômica</option>
                                                                        <option value="2">Ordenada</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <label class="labelCadastroAtividade">Exibição das Respostas</label>
                                                                    <select id="stsRespostas" class="selectpicker show-tick" name="stsRespostas" data-width="fit">
                                                                        <option value="1">Após Responder</option>
                                                                        <option value="2">Final da Atividade</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <label class="labelCadastroAtividade">Navegar Entre Questões</label>
                                                                    <select id="stsNavegacao" class="selectpicker show-tick" name="stsNavegacao" data-width="fit">
                                                                        <option value="1">Sim</option>
                                                                        <option value="2">Não</option>
                                                                    </select>
                                                                </div>
                                                               

                                                            </div>
                                                        </div>

                                                        <div class="form-group" id="tableQuestoesSelecionadas">
                                                            <div class="row">
                                                                <div class="col-lg-12 grid-margin stretch-card">
                                                                    <div class="card">
                                                                        <div class="card-body">
                                                                            <h4 class="card-title">Escolha as questões para a atividade.</h4>
                                                                            <p class="card-description">

                                                                                <button id="btn-modal-escolher" type="button" data-toggle="modal" data-target="#modalQuestao" class="btn btn-inverse-primary btn-fw btn-icon-text">
                                                                                    <i class="bi bi-list-check "></i>
                                                                                    Escolher
                                                                                </button>

                                                                                <button type="button" id="adicionarQuestoes" class="btn btn-inverse-primary btn-rounded btn-icon">
                                                                                    <i class="bi bi-plus"></i>
                                                                                </button>
                                                                            </p>
                                                                            <div id="tableQuestoesToggle" class="table-responsive">
                                                                                <table class=" table table-hover" style="width: 100%;" id="tableQuestoesAtividade">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th width="1%">Ordem</th>
                                                                                            <th>ID</th>
                                                                                            <th width="22%">Enunciado</th>
                                                                                            <th width="1%">Pontuação</th>
                                                                                            <th width="5%">Subgrupo</th>
                                                                                            <th width="3%">Código BNCC</th>
                                                                                            <th width="2%">Status</th>
                                                                                            <th width="2%">Nível</th>
                                                                                            <th width="1%">Ações</th>

                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody id="tbodyQuestoesAtividade">



                                                                                    </tbody>
                                                                                </table>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="row" id="botoesAtividade">
                                                                <button id="btn-cadastrarAtividade" type="submit" class="btn btn-primary mr-2"><i class="bi bi-check2-circle btn-icon-prepend"></i><span> Cadastrar</span></button>
                                                                <button id="cancelarAtividade" type="button" class="btn btn-secondary"><i class="bi bi-x-circle btn-icon-prepend"></i> Cancelar</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    <div id="cadastrarQuestao" class=" stretch-card">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <hr>
                                                                <h4 id="cardTitle" class="card-title">Cadastrar Questão</h4>
                                                                <p id="cardDescri" class="card-description">
                                                                    Cadastre a questão para a atividade.
                                                                </p>
                                                                <form id="formQuestoes">

                                                                    <div class="form-group">
                                                                        <div class="row">
                                                                            <div class="col-md-6">
                                                                                <div class="form-group">
                                                                                    <label style="display: block;">Subgrupo</label>
                                                                                    <select id="subgrupoopc" class="selectpicker show-tick" name="subgrupoopc" data-width="fit" data-live-search="true" data-show-subtext="true">
                                                                                        <option disabled selected value="0">Escolha</option>
                                                                                        <?php $arr_subgrupo = $s->buscarDadosSub() ?>
                                                                                        <?php if (!empty($arr_subgrupo)) { ?>
                                                                                            <?php foreach ($arr_subgrupo as $subgrupoop) {
                                                                                            ?>
                                                                                                <option data-subtext="<?php echo " - ", $subgrupoop['temDescricao'], " - ", $subgrupoop['disDescricao']; ?>" value="<?php echo $subgrupoop['subID']; ?>"><?php echo $subgrupoop['subDescricao']; ?></option>
                                                                                            <?php } ?>
                                                                                        <?php } ?>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                                <div class="form-group">
                                                                                    <label class="labelCadastroAtuacao">Status</label>
                                                                                    <select id="statusopc" class="selectpicker show-tick" name="statusopc" data-width="fit">
                                                                                        <option value="1">Pública</option>
                                                                                        <option value="2">Privada professor</option>
                                                                                        <option value="3">Privada grupo</option>
                                                                                        <option value="4">Privada escola</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-md-6">
                                                                                <label class="labelCadastroAtuacao">Ano</label>
                                                                                <select id="ano" class="selectpicker show-tick" name="ano" data-width="fit" data-live-search="true" data-show-subtext="true">
                                                                                    <option disabled selected value="0">Escolha</option>
                                                                                    <?php $arr_ano = $q->buscarAno() ?>
                                                                                    <?php if (!empty($arr_ano)) { ?>
                                                                                        <?php foreach ($arr_ano as $ano) {
                                                                                        ?>
                                                                                            <option data-subtext="<?php echo " - ", $ano['anoEtapa']; ?>" value="<?php echo $ano['anoCodigo']; ?>"><?php echo $ano['anoDescricao']; ?></option>
                                                                                        <?php } ?>
                                                                                    <?php } ?>
                                                                                </select>
                                                                            </div>


                                                                            <div class="col-md-6">
                                                                                <div class="form-group">
                                                                                    <label class="labelCadastroAtuacao">Nível</label>
                                                                                    <select id="nivelopc" class="selectpicker show-tick" name="nivelopc" data-width="fit">
                                                                                        <?php $arr_nivel = $n->buscarDadosNivel() ?>
                                                                                        <?php if (!empty($arr_nivel)) { ?>
                                                                                            <?php foreach ($arr_nivel as $nivelop) {
                                                                                            ?>
                                                                                                <option value="<?php echo $nivelop['nivID']; ?>"><?php echo $nivelop['nivDescricao']; ?></option>
                                                                                            <?php } ?>
                                                                                        <?php } ?>
                                                                                    </select>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-md-2">
                                                                            <div class="form-group">
                                                                                <label for="codigobncc">Código BNCC</label>
                                                                                <input type="hidden" name="opQuestao" id="opQuestao">
                                                                                <input type="hidden" name="queID" id="queID">
                                                                                <input type="text" class="form-control" name="codigobncc" id="codigobncc" placeholder="EF08MA06">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-10">
                                                                            <div class="form-group">
                                                                                <label for="palavrasChave">Palavras-chave</label>
                                                                                <input type="text" class="form-control" name="palavrasChave" id="palavrasChave" placeholder="Expressão Valor Ordenação Operações">
                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label for="enunciado">Enunciado</label>
                                                                        <textarea class="form-control" name="enunciado" placeholder="O valor numérico de uma expressão algébrica depende muito da ordenação das operações..." id="enunciado" rows="7"></textarea>
                                                                    </div>

                                                                    <div class="form-group">
                                                                        <p class="card-title">
                                                                            Alternativas
                                                                        </p>
                                                                        <p class="card-description">
                                                                            Cadastre as alternativas da questão.
                                                                        </p>
                                                                        <button id="adicionarQuestao" type="button" class="btn btn-inverse-primary btn-rounded btn-icon">
                                                                            <i class="bi bi-plus-lg"></i>
                                                                        </button>
                                                                        <button id="deletarQuestao" type="button" class="btn btn-inverse-danger btn-rounded btn-icon">
                                                                            <i class="bi-trash"></i>
                                                                        </button>
                                                                    </div>

                                                                    <div class="form-group">
                                                                        <ul id="alternativas" class="list-group">

                                                                        </ul>
                                                                    </div>

                                                                    <button id="submitQuestao" type="submit" class="btn btn-icon-text btn-inverse-primary mr-2"><i class="bi bi-check2-circle btn-icon-prepend"></i><span>Cadastrar Questão</span></button>
                                                                    <button id="cancelarQuestaoAtividade" type="button" class="btn btn-icon-text btn-inverse-dark"><i class="bi bi-x-circle btn-icon-prepend"></i>Cancelar</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="tableAtividadesToggle" class="expandable-table table-responsive">
                                        <table id="tableAtividade" class="table table-striped table-hover ">
                                        <caption style="caption-side: top;padding: 0.5rem 0.5rem"><i class="bi bi-square-fill" style="padding-right: 0.5rem;color:#BCBAE0" ></i>Atividade postada</caption>
                                            <thead>
                                                <tr>
                                                    <th width="2%">ID</th>
                                                    <th>Nome</th>
                                                    <th>Descrição</th>
                                                    <th width="10%">Data/Hora Início</th>
                                                    <th width="10%">Data/Hora Final</th>
                                                    <th width="7%">Tipo</th>
                                                    <th width="2%">Status</th>
                                                    <th width="2%">Turma</th>
                                                    <th width="10%" style="text-align: center">Ações</th>
                                                    <th width="1%"></th>

                                                </tr>
                                            </thead>
                                            <tbody id="tbodyAtivdades">

                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                  
                    <div id="verAtividade" class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div id="tituloAtividade">

                                    </div>

                                    <button type="button" id="btn-voltar-verAtividade" class="btn btn-secondary btn-icon-text">
                                        <i class="bi bi-arrow-left-circle btn-icon-prepend"></i>
                                        Voltar
                                    </button>
                                    <p class="card-description">

                                    </p>

                                    <div id="enunciadoQuestao">


                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div id="cover-spin"></div>
             
                <!-- Modal Questão-->
                <div class="modal fade" id="modalQuestao" tabindex="-1" aria-labelledby="modalQuestao" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <!-- <div class="row justify-content-center">
                                <div class="spinner-border text-primary" 
                                id="spinner" role="status">
                                <span class="sr-only">Carregando...</span>
                            </div>
                                </div> -->
                          
                                <div id="escolherQuestoess" class="expandable-table table-responsive">
                                    <table class="table table-hover display" id="tableEscolherQuestoes" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>ID</th>
                                                <th>Enunciado</th>
                                                <th>Subgrupo</th>
                                                <th>Código BNCC</th>
                                                <th>Ensino - Ano</th>
                                                <th>Nível</th>
                                                <th width="20px">Status</th>

                                            </tr>
                                        </thead>
                                        <tbody id="tbodyModalAtividade">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="btn-modalCancelarQuestao" type="button" data-dismiss="modal" class="btn btn-secondary">Cancelar</button>
                                <button id="btn-modalConfirmarQuestao" type="button" class="btn btn-primary">Confirmar</button>
                            </div>

                        </div>
                    </div>

                </div>
                <!-- content-wrapper ends -->
                <!-- partial:../../partials/_footer.html -->

                <?php require_once '../partials/footer.php'; ?>

            </div>
            <!-- main-panel ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <!-- plugins:js -->
    <script src="../vendors/js/vendor.bundle.base.js"></script>
    <!-- endinject -->
    <!-- Plugin js for this page -->
    <!-- End plugin js for this page -->
    <!-- inject:js -->

    <script src="../vendors/datatables.net/jquery.dataTables.js"></script>
    <script src="../vendors/datatables.net-bs4/dataTables.bootstrap4.js"></script>
    <script src="../js/dataTables.select.min.js"></script>
    <script src="../js/off-canvas.js"></script>
    <script src="../js/hoverable-collapse.js"></script>
    <script src="../js/settings.js"></script>

    <script src="../js/template.js"></script>
    <script src="../vendors/jquery-ui/jquery-ui.min.js"></script>
    <script src="../js/jquery.datetimepicker.full.min.js"></script>
   
    
    <script src="../js/sweetAlert.js"></script>
    <script src="../js/dataTables.checkboxes.min.js"></script>
    <script src="../vendors/bootstrapselect/bootstrap-select.min.js"></script>
    <script src="../js/rowOrder.js"></script>
    <script src="../js/mainjs/atividades.js"></script>
    <script src="../js/mainjs/questoes.js"></script>




    <!-- endinject -->
</body>

</html>