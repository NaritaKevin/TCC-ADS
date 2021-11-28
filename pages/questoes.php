<?php

require_once '../backend/subgrupo.php';
require_once '../backend/nivel.php';
require_once '../backend/questao.php';

$s = new Subgrupo("pedagogy", "localhost", "root", "");
$n = new Nivel("pedagogy", "localhost", "root", "");
$q = new Questao("pedagogy", "localhost", "root", "");
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../vendors/bootstrapselect/bootstrap-select.min.css">

    <!-- endinject -->
    <!-- Plugin css for this page -->
    <link rel="stylesheet" href="../vendors/datatables.net-bs4/dataTables.bootstrap4.css">
    <link rel="stylesheet" href="../vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" type="text/css" href="../js/select.dataTables.min.css">

    <link rel="stylesheet" href="../js/jquery.datetimepicker.min.css">

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
        .bootstrap-select .dropdown-menu li.active small {
            color: #fff !important;
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
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 id="titleQuestoes" class="card-title">Tabela de Questões</h4>
                                    <p class="card-description">
                                        <button type="button" id="btn-nova-questao" class="btn btn-primary btn-icon-text">
                                            <i class="bi bi-plus-circle btn-icon-prepend"></i>Nova Questão
                                        </button>
                                    </p>
                                    <div id="cadastrarQuestao" class=" stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 id="cardTitle"class="card-title">Cadastrar Questão</h4>
                                                <p id="cardDescri" class="card-description">
                                                    Cadastre a questão para a atividade.
                                                </p>
                                                <form id="formQuestoes">

                                                    <div class="form-group">
                                                        <div class="row" >
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label style="display: block;">Subgrupo</label>
                                                                    <select id="subgrupoopc" class="selectpicker show-tick" name="subgrupoopc" data-width="fit" data-live-search="true" data-show-subtext="true">
                                                                        <option disabled selected value="0" >Escolha</option>
                                                                        <?php $arr_subgrupo = $s->buscarDadosSub() ?>
                                                                        <?php if (!empty($arr_subgrupo)) { ?>
                                                                            <?php foreach ($arr_subgrupo as $subgrupoop) {
                                                                            ?>
                                                                                <option data-subtext="<?php echo " - ", $subgrupoop['temDescricao'], " - " ,$subgrupoop['disDescricao']; ?>" value="<?php echo $subgrupoop['subID']; ?>"><?php echo $subgrupoop['subDescricao']; ?></option>
                                                                            <?php } ?>
                                                                        <?php } ?>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="labelCadastroAtuacao">Visibilidade</label>
                                                                <select id="statusopc" class="selectpicker show-tick" name="statusopc" data-width="fit">
                                                                    <option value="1">Pública</option>
                                                                    <option value="2">Privada professor</option>
                                                                    <option value="3">Privada grupo</option>
                                                                    <option value="4">Privada escola</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        </div>

                                                        <div class="row" >
                                                        <div class="col-md-6">
                                                            <label class="labelCadastroAtuacao">Ano</label>
                                                                <select id="ano" class="selectpicker show-tick" name="ano" data-width="fit" data-live-search="true" data-show-subtext="true">
                                                                    <option disabled selected value="0" >Escolha</option>
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
                                                                <input type="text"  class="form-control" name="codigobncc" id="codigobncc" placeholder="EF08MA06">
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

                                                    <button id="submitQuestao" type="submit" class="btn btn-icon-text btn-primary mr-2"><i class="bi bi-check2-circle btn-icon-prepend"></i><span>Cadastrar</span></button>
                                                    <button id="cancelarQuestao" type="button" class="btn btn-icon-text btn-secondary"><i class="bi bi-x-circle btn-icon-prepend"></i>Cancelar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tableQuestoesToggle" class="expandable-table table-responsive ">
                                        <table class="table table-hover table-striped" style="width: 100%" id="tableQuestoes">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Enunciado</th>
                                                    <th>Palavras-Chave</th>
                                                    <th>Subgrupo</th>
                                                    <th>Código BNCC</th>
                                                    <th>Ensino - Ano</th>
                                                    <th>Nível</th>
                                                    <th>Status</th>
                                                    <th>Revisada</th>
                                                    <th style="text-align: center">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyQuestao">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="cover-spin"></div>
                    </div>
                </div>

                <div class="modal fade" id="modalInfoQuestao" tabindex="-1" role="dialog" aria-labelledby="modalInfoQuestao" aria-hidden="true">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content ">
                            <div class="modal-body">
                                <div class="stretch-card">
                                    <div class="card">
                                        <div style="padding: 0px" class="card-body">
                                            <p class="card-title text-center">Alternativas Cadastradas</p>
                                            <div style="border-bottom: 1px solid #e3e3e3"></div>
                                            <div class="list-group" id="alternativasModal">


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button id="modalCancelarAlt" type="button" class="btn btn-secondary btn-block">Voltar</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="modalDelete" aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content">
                            <form id="formDelete">
                                <div class="modal-header">
                                    <h4 class="modal-title ml-auto">Deseja excluir o item selecionado?</h4>
                                    <button type="button" id="buttonXmodal" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <input type="hidden" name="idDeleteSelecionado" id="idDeleteSelecionado">
                                    <input type="hidden" name="tabelaSelecionada" id="tabelaSelecionada">
                                </div>

                                <div class="modal-footer">
                                    <button id="modalCancelar" type="button" class="btn btn-secondary  mr-auto"><i class="bi bi-x-circle btn-icon-prepend "></i> Cancelar</button>
                                    <button id="modalConfirmar" type="submit" class="btn btn-primary">
                                        <i class="bi bi-check2-circle btn-icon-prepend "></i> Excluir</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <?php require_once '../partials/footer.php'; ?>
            </div>

        </div>

    </div>
    < <!-- plugins:js -->
        <script src="../vendors/js/vendor.bundle.base.js"></script>
        <!-- endinject -->

        <!-- inject:js -->
        <script src="../vendors/datatables.net/jquery.dataTables.js"></script>
        <script src="../vendors/datatables.net-bs4/dataTables.bootstrap4.js"></script>
        <script src="../js/dataTables.select.min.js"></script>
        <script src="../js/off-canvas.js"></script>
        <script src="../js/hoverable-collapse.js"></script>
        <script src="../js/settings.js"></script>
        <script src="../js/sweetAlert.js"></script>
        <script src="../js/template.js"></script>
        <script src="../vendors/bootstrapselect/bootstrap-select.min.js"></script>

        <!-- <script src="https://cdn.datatables.net/rowreorder/1.2.8/js/dataTables.rowReorder.min.js"></script>
        <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script> -->

        <!-- endinject -->
        <!-- Custom js for this page-->
        <script src="../js/mainjs/questoes.js"></script>
        <!-- End custom js for this page-->
</body>

</html>