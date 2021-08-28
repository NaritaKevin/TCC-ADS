<?php

require_once '../backend/disciplina.php';
require_once '../backend/tematica.php';
require_once '../backend/subgrupo.php';
$p = new Disciplina("pedagogy","localhost","root","");
$t = new Tematica("pedagogy","localhost","root","");
$s = new Subgrupo("pedagogy","localhost","root","");
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

    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="../css/vertical-layout-light/style.css">
    <!-- endinject -->
    <link rel="shortcut icon" href="../images/logo-mini.svg" />

<style>
    .dropdown-item.active, .dropdown-item:active{
        background-color: #6664bd ;
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
                    
                        <!--Disciplina-->
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Tabela de disciplinas</h4>
                                   
                                    <p class="card-description">                                
                                        <button type="button" id="btn-nova-disciplina"
                                            class="btn btn-primary btn-icon-text">
                                            <i class="bi bi-plus-circle btn-icon-prepend"></i>
                                            Cadastrar Disciplina
                                        </button>
                                    </p>
                                  
                                    <div id="cadastrarDisciplina" class=" stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">Cadastrar Disciplina</h4>
                                                <p class="card-description">
                                                    Cadastre uma disciplina para as questões.
                                                </p>
                                                <form id="formDisciplina" >
                                                    <div class="form-group">                                                 
                                                        <label for="disciplina">Disciplina</label>
                                                        <input type="hidden" name="opDisciplina" id="opDisciplina">
                                                        <input type="hidden" name="disID" id="disID">
                                                        <input type="text" name="disciplina" class="form-control" id="disciplina"
                                                       
                                                        placeholder="Matemática">
                                                    </div>
                                                    <button id="btn-cadastrarDisciplina" type="submit"                                        
                                                        class="btn btn-primary mr-2">
                                                        <i class="bi bi-check2-circle btn-icon-prepend"></i>
                                                        Cadastrar</button>
                                                        
                                                   <!--  <button id="btn-cancelarDisciplina" type="button"
                                                        class="btn btn-secondary">Cancelar</button> -->
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div id="tableDisciplinaToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover table-striped" style="width: 100%" id="tableDisciplinas">
                                            <thead>
                                                <tr>
                                                    <th width="5%">ID</th>
                                                    <th>Disciplina</th>
                                                    <th width="10%">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyDisciplina">
                                               

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--Tematica-->
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Tabela de tematicas</h4>
                                    <p class="card-description">                                  
                                        <button type="button" id="btn-novo-tematica"
                                            class="btn btn-primary btn-icon-text">
                                            <i class="bi bi-plus-circle btn-icon-prepend"></i>
                                            Cadastrar tematica
                                        </button>
                                    </p>
                                    <div id="cadastrarTematica" class=" stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">Cadastrar Temática</h4>
                                                <p class="card-description">
                                                    Cadastre uma temática para os subgrupos.
                                                </p>
                                                <form id="formTematica" >
                                                    <div class="form-group" >
                                                        <label class="labelCadastroAtuacao">Disciplina</label>
                                                        <select class="selectpicker show-tick" name="disciplinaopc" id="disciplinaopc" data-width="fit"
                                                            data-live-search="true">
                                                            <?php  $arr_disciplina = $p->buscarDados() ?>
                                    
                                                            <?php if(!empty($arr_disciplina)) { ?>
                                                                <?php foreach($arr_disciplina as $disciplina) { 
                                                                    ?>        
                                                                    <option value="<?php echo $disciplina['disID']; ?>"><?php echo $disciplina['disDescricao']; ?></option>                                                                                                                                                                                                                                                                    
                                                                <?php } ?>
                                                            <?php } ?>                                                                                                                   
                                                        </select>                                                      
                                                    </div>
                                                    <div class="form-group">
                                                    <label for="cadastroTematica">Temática</label>
                                                    <input type="text" class="form-control" name="tematica" id="tematica" placeholder="Operações Matemáticas">
                                                        <input type="hidden" name="opTematica" id="opTematica">
                                                        <input type="hidden" name="temID" id="temID">
                                                    </div>
                                                    <button id="btn-cadastrarTematica" type="submit"
                                                        class="btn btn-primary mr-2"> 
                                                        <i class="bi bi-check2-circle btn-icon-prepend"></i>
                                                        Cadastrar</button>
                                                   <!--  <button id="btn-cancelarTematica" type="button"
                                                        class="btn btn-secondary">Cancelar</button> -->
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tableTematicaToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover table-striped" style="width: 100%" id="tableTematica">
                                            <thead>
                                                <tr>
                                                    <th width="5%">ID</th>
                                                    <th>Temática</th>
                                                    <th>Disciplina</th>
                                                    <th width="10%">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyTematica">

                                            </tbody>
                                           
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--Subgrupo-->
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Tabela de subgrupos</h4>
                                    <p class="card-description">
                                        <button type="button" id="btn-novo-subgrupo"
                                            class="btn btn-primary btn-icon-text">
                                            <i class="bi bi-plus-circle btn-icon-prepend"></i>
                                            Novo subgrupo
                                        </button>
                                    </p>
                                    <div id="cadastrarSubgrupo" class=" stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">Cadastro subgrupo</h4>
                                                <p class="card-description">
                                                    Cadastre um subgrupo para as disciplinas.
                                                </p>
                                                <form id="formSubrgrupo" >
                                                    <div class="form-group">
                                                        <label class="labelCadastroAtuacao">Temática</label>
                                                        <select  id="tematicaopc" class="selectpicker show-tick" name="tematicaopc" data-width="fit"
                                                            data-live-search="true">
                                                            <?php  $arr_tematica = $t->BuscarTematica() ?>
                                                            <?php if(!empty($arr_tematica)) { ?>
                                                                <?php foreach($arr_tematica as $tematicaop) { 
                                                                    ?>        
                                                                    <option value="<?php echo $tematicaop['temID']; ?>"><?php echo $tematicaop['temDescricao']; ?></option>                                                                                                                                                                                                                                                                    
                                                                <?php } ?>
                                                            <?php } ?>
                                                        </select>
                                                       
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="subgrupo">Subgrupo</label>
                                                        <input type="hidden" name="opSubgrupo" id="opSubgrupo">
                                                        <input type="hidden" name="subID" id="subID">
                                                        <input type="text" class="form-control" name="subgrupo" id="subgrupo"
                                                            placeholder="Geometria">
                                                    </div>
                                                    <button id="btn-cadastrarSubgrupo" type="submit"
                                                        class="btn btn-primary mr-2"> 
                                                        <i class="bi bi-check2-circle btn-icon-prepend"></i>
                                                        Cadastrar</button>
                                                    
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="tableSubgrupoToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover table-striped" style="width: 100%" id="tableSubgrupo">
                                            <thead>
                                                <tr>
                                                    <th width="5%">ID</th>
                                                    <th>Subgrupo</th>
                                                    <th>Temática</th>
                                                    <th>Discplina</th>
                                                    <th width="10%">Ações</th>

                                                </tr>
                                            </thead>
                                            <tbody id="tbodySubgrupo">
                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
               

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
                            <button id="modalCancelar" type="button" class="btn btn-secondary  mr-auto">Cancelar</button>
                            <button id="modalConfirmar"  type="submit"
                                             class="btn btn-primary">
                                            <i class="bi bi-x-circle btn-icon-prepend "></i>
                                            Excluir</button>                       
                            </div>  
                            </form>                       
                        </div>
                    </div>
                </div>


               <?php require_once '../partials/footer.php';?>
            </div>

        </div>

    </div>
    < <!-- plugins:js -->
        <script src="../vendors/js/vendor.bundle.base.js"></script>
        <!-- endinject -->

        <!-- inject:js -->
        <script src="../vendors/datatables.net/jquery.dataTables.js"></script>
        <script src="../vendors/datatables.net-bs4/dataTables.bootstrap4.js"></script>
        <script src="../js/off-canvas.js"></script>
        <script src="../js/hoverable-collapse.js"></script>
        <script src="../js/template.js"></script>
        <script src="../js/settings.js"></script>
        <script src="../vendors/bootstrapselect/bootstrap-select.min.js"></script>
        <script src="../js/sweetAlert.js"></script>


        <!-- endinject -->
        <!-- Custom js for this page-->
        <script src="../js/mainjs/atuacao.js"></script>
        <!-- End custom js for this page-->
      



</body>

</html>