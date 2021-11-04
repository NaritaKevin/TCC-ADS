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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../vendors/bootstrapselect/bootstrap-select.min.css">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <link rel="stylesheet" href="../vendors/datatables.net-bs4/dataTables.bootstrap4.css">
    <link rel="stylesheet" href="../vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" type="text/css" href="../js/select.dataTables.min.css">
    <link rel="stylesheet" href="../js/jquery.datetimepicker.min.css">
    <link rel="stylesheet" href="../js/dataTables.checkboxes.css">

    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="../css/vertical-layout-light/style.css">
    <!-- endinject -->
    <link rel="shortcut icon" href="../images/logo-mini.svg" />

    <style>
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
    </style>
</head>

<body>
    <div class="container-scroller">
        <!-- partial:../../partials/_navbar.html -->
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a id="" class="navbar-brand brand-logo mr-5" href="../index.html"><img src="../images/logo-full.svg"
                        class="mr-4 filter-purple" alt="logo" /></a>
                <a class="navbar-brand brand-logo-mini" href="../index.html"><img src="../images/logo-mini.svg"
                        alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="icon-menu"></span>
                </button>

                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item dropdown">
                        <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#"
                            data-toggle="dropdown">
                            <i class="icon-bell mx-0"></i>
                            <span class="count"></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                            aria-labelledby="notificationDropdown">
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
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown"
                            aria-labelledby="profileDropdown">
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
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                    data-toggle="offcanvas">
                    <span class="icon-menu"></span>
                </button>
            </div>
        </nav>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">

            <!-- partial:../../partials/_sidebar.html -->
            <?php require_once '../partials/menu.php';?>
            <!-- Corpo da página-->
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Tabela de atividades </h4>
                                    <p class="card-description">
                                        <button type="button" id="btn-nova-atividade"
                                            class="btn btn-primary btn-icon-text ">
                                            <i class="bi bi-plus-circle btn-icon-prepend "></i>
                                            Nova atividade
                                        </button>
                                    </p>


                                    <div id="cadastrarAtividade">
                                        <div class="stretch-card">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h4 class="card-title">Cadastro de atividades</h4>
                                                    <p class="card-description">Informe os dados da atividade a ser
                                                        cadastrada.</p>
                                                    <form id="formAtividades">

                                                        <div class="form-group">
                                                            <label for="nome">Nome</label>
                                                            <input type="text" class="form-control" id="nome" placeholder="Nome">
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="exampleInputEmail1">Descricao</label>
                                                            <textarea class="form-control" name="descricao" id="descricao" rows="7"></textarea>
                                                        </div>
                                                            
                                                                <div class="form-group">
                                                                <label class="labelCadastroAtividade">Tipo</label>
                                                              
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

                                                                <div class="form-group">
                                                                <label class="labelCadastroAtividade">Turma</label>
                                                              
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
                                                               

                                                                <div class="form-group">
                                                                <label class="labelCadastroAtividade">Status</label>
                                                                <select id="status" class="selectpicker show-tick" name="status" data-width="fit">
                                                                    <option value="1" >Não Postado</option>
                                                                    <option value="2" >Postado</option>
                                                                    
                                                                </select>
                                                                </div>
                                                        
                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group row">
                                                                        <label class="col-md-6 col-form-label">Data
                                                                            Inicial</label>
                                                                        <div class="col-sm-9">
                                                                            <input type="text" id="data-inicial"
                                                                                class="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group row">
                                                                        <label class="col-md-6 col-form-label">Data
                                                                            Final</label>
                                                                        <div class="col-sm-9">
                                                                            <input type="text" id="data-final"
                                                                                class="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group" id="tableQuestoesSelecionadas">
                                                            <div class="row">
                                                                <div class="col-lg-12 grid-margin stretch-card">
                                                                    <div class="card">
                                                                        <div class="card-body" >
                                                                            <h4 class="card-title">Questões Selecionadas</h4>
                                                                            <p class="card-description">

                                                                                <button id="btn-modal-escolher"
                                                                                    type="button"
                                                                                    class="btn btn-inverse-primary btn-fw btn-icon-text">
                                                                                    <i class="bi bi-list-check "></i>
                                                                                    Escolher
                                                                                </button>
                                                                                
                                                                                    <button type="button" id="adicionarQuestoes"
                                                                                        class="btn btn-primary btn-rounded btn-icon">
                                                                                        <i class="bi bi-plus"></i>
                                                                                    </button>
                                                                            </p>
                                                                            <div id="tableQuestoesToggle"
                                                                                class="table-responsive">
                                                                                <table class=" table table-hover"
                                                                                    id="tableQuestoesAtividade">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th width="1%">Ordem</th>
                                                                                            <th width="22%">Enunciado
                                                                                            </th>
                                                                                            <th width="5%">Palavras
                                                                                                Chave</th>
                                                                                            <th width="5%">Subgrupo</th>
                                                                                            <th width="3%">Código BNCC
                                                                                            </th>
                                                                                            <th width="2%">Nível</th>
                                                                                            <th width="2%">Ações</th>

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
                                                         <button id="cadastrarAtividade" type="submit" class="btn btn-primary mr-2">Cadastrar</button>
                                                         <button id="cancelarAtividade" type="button" class="btn btn-secondary">Cancelar</button>
                                                  </div>
                                             </div>
                                        </form>

                                        <div id="cadastrarQuestao" class=" stretch-card">
                                         <div class="card">
                                                <div class="card-body">
                                                <h4 class="card-title">Questão</h4>
                                                <p class="card-description">
                                                        Cadastre a questão para a atividade.
                                                            </p>
                                                        <form id="formQuestoes">

                                                     <div class="form-group">
                                                     <div class="row">
                                                            <div class="col-md-4">
                                                                <label class="labelCadastroAtuacao">Subgrupo</label>
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
                                                                                                        </div>
                                                                                            <div class="row">
                                                                                                <div class="col-md-4">
                                                                                                    <div class="form-group">
                                                                                                        <label for="codigobncc">Código BNCC</label>
                                                                                                        <input type="hidden" name="opQuestao" id="opQuestao">
                                                                                                        <input type="hidden" name="queID" id="queID">
                                                                                                        <input type="text" style="width: auto" class="form-control" name="codigobncc" id="codigobncc" placeholder="Código BNCC">
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div class="col-md-4">
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

                                                                                                <div class="col-md-4">
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
                                                                                            <div class="form-group">
                                                                                                <label for="enunciado">Enunciado</label>
                                                                                                <textarea class="form-control" name="enunciado" id="enunciado" rows="7"></textarea>
                                                                                            </div>
                                                                                            <div class="form-group">
                                                                                                <label for="palavrasChave">Palavras chave</label>
                                                                                                <input type="text" class="form-control" name="palavrasChave" id="palavrasChave" placeholder="Palavras chave">
                                                                                            </div>
                                                                                            <div class="form-group">
                                                                                                <p class="card-title">
                                                                                                    Alternativas.
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
                                                                         <button id="submitQuestao" type="submit" class="btn btn-icon-text btn-primary mr-2"><i class="bi bi-check2-circle btn-icon-prepend"></i>Cadastrar</button>
                                                                    <button id="cancelarQuestao" type="button" class="btn btn-icon-text btn-secondary"><i class="bi bi-x-circle btn-icon-prepend"></i>Cancelar</button>
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
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nome</th>
                                                    <th>Observação</th>
                                                    <th>Data Início</th>
                                                    <th>Data Final</th>
                                                    <th>Tipo</th>
                                                    <th>Status</th>
                                                    <th>Ação</th>
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
                </div>
                <!--Modal Mais informação-->
                <div class="modal fade" id="modalInfoAtividade" tabindex="-1" aria-labelledby="modalInfoQuestao"
                    aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <p class="card-title">Informações Adicionais</p>
                                            <div class="table-responsive">
                                                <table class="table ">
                                                    <thead>
                                                        <tr>
                                                            <th>algo a mais</th>
                                                            <th>algo a mais</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>algo a mais</td>
                                                            <td>algo a mais</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="modalCancelar" type="button" class="btn btn-secondary">Cancelar</button>
                                <button id="modalConfirmar" type="button" class="btn btn-primary">Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>


                  <!-- Modal Excluir Atividade-->                                                          
                <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="modalDelete"
                    aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content">    
                            <form id="formDelete" >                
                            <div class="modal-header">
                            <h4 class="modal-title ml-auto">Deseja excluir o item selecionada?</h4>
                                <button type="button" id="buttonXmodal" class="close" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                                </button>    
                                <input type="hidden" name="idDeleteSelecionado" id="idDeleteSelecionado">     
                                <input type="hidden" name="tabelaSelecionada" id="tabelaSelecionada">               
                             </div>
                           
                            <div class="modal-footer">
                            <button id="modalCancelarAtividade" type="button" class="btn btn-secondary  mr-auto">Cancelar</button>
                            <button id="modalConfirmar"  type="submit"
                                             class="btn btn-primary">
                                            <i class="bi bi-x-circle btn-icon-prepend "></i>
                                            Excluir</button>                       
                            </div>  
                            </form>                       
                        </div>
                    </div>
                </div>

                <!-- Modal Questão-->
                <div class="modal fade" id="modalQuestao" tabindex="-1" aria-labelledby="modalQuestao"
                    aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                    
                        <div class="modal-content">
                        
                            <div class="modal-body">
                           
                                <div id="escolherQuestoess" class="expandable-table table-responsive">
                               
                                    <p>Sera mostrado o ID  de todas as linhas selecionadas</p>
                                    <pre id="visualizar-ids"></pre>
                                    <table class="table table-hover display" id="tableEscolherQuestoes">
                                        <thead>
                                            <tr>
                                                
                                                <th>Enunciado</th>
                                                <th>Código BNCC</th>
                                                <th>Tipo</th>
                                                <th>Ações</th>
                                                <th></th>
                                                
                                               
                                            </tr>
                                        </thead>
                                        <tbody id="tbodyModalAtividade">
                                       
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="btn-modalCancelarQuestao" type="button"
                                    class="btn btn-secondary">Cancelar</button>
                                <button id="btn-modalConfirmarQuestao" type="button"
                                    class="btn btn-primary">Confirmar</button>
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
                <!-- content-wrapper ends -->
                <!-- partial:../../partials/_footer.html -->
               
                <?php require_once '../partials/footer.php';?>
                
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
    <script src="../js/mainjs/atividades.js"></script>
    <script src="../js/mainjs/questoes.js"></script>
    

    

    <!-- endinject -->
</body>

</html>