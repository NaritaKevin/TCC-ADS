<?php
session_start();
$conn = new mysqli("localhost", "root", "", "pedagogy");
 
if ($conn->connect_errno) {
    die("Conexão falhou: " . $conn->connect_error);
    
}
 
$sqlDis = "SELECT *  FROM disciplinas ";
$sqlTem = "SELECT * FROM tematicas t JOIN disciplinas d ON t.temDisciplinaID = d.disID ";
$sqlSub = "SELECT * FROM subgrupos s JOIN tematicas t ON s.subTematicaID = t.temID JOIN disciplinas d ON t.temDisciplinaID = d.disID ";

$resultDis = $conn->query($sqlDis);
$resultTem = $conn->query($sqlTem);
$resultSub = $conn->query($sqlSub);

$arr_disciplina = [];
$arr_tematica = [];
$arr_subgrupo = [];

if ($resultDis->num_rows > 0) {
    $arr_disciplina = $resultDis->fetch_all(MYSQLI_ASSOC);
}

if ($resultTem->num_rows > 0) {
    $arr_tematica = $resultTem->fetch_all(MYSQLI_ASSOC);
}

if ($resultSub->num_rows > 0) {
    $arr_subgrupo = $resultSub->fetch_all(MYSQLI_ASSOC);
}

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
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/index.html">
                            <i class="icon-grid menu-icon"></i>
                            <span class="menu-title">Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../pages/atividades.php">
                            <i class="bi bi-file-earmark-text menu-icon"></i>
                            <span class="menu-title">Atividades</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#gerencQuestoes" aria-expanded="false"
                            aria-controls="gerencQuestoes">
                            <i class="bi bi-question-lg menu-icon"></i>
                            <span class="menu-title">Questões</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="gerencQuestoes">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="../pages/questoes.php">Gerenciar
                                        Questões</a></li>
                                <li class="nav-item"> <a class="nav-link" href="../pages/atuacao.php">Area de
                                        atuação</a></li>
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="../pages/resultados.php">
                            <i class="bi bi-file-earmark-bar-graph menu-icon"></i>
                            <span class="menu-title">Resultados</span>
                        </a>
                    </li>




                </ul>
            </nav>
            <!-- Corpo da página-->
            <div class="main-panel">
                <div class="content-wrapper">
                    
                    <div class="row">
                                       
                        <!--Disciplina-->
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Tabela de disciplinas</h4>
                                   
                                    <p class="card-description">
                                    <button type="button" id="btn-cancelar-disciplina"
                                            class="btn btn-secondary btn-icon-text">
                                            <i class="bi bi-x-circle btn-icon-prepend"></i>
                                            Cancelar
                                        </button>
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
                                                <form method="post" action="../backend/cadDisciplina.php" >
                                                    <div class="form-group">                                                 
                                                        <label for="disciplina">Disciplina</label>
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
                                    <div id="alterarDisciplina" class=" stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">Alterar Disciplina</h4>
                                                <p class="card-description">
                                                     Altere a disciplina selecionada.
                                                </p>
                                                <form method="post" action="../backend/altDisciplina.php" >
                                                    <div class="form-group">
                                                    <input type="hidden" name="idDisciplina" id="idDisciplina">
                                                        <label for="disciplina">Disciplina</label>
                                                        <input type="text" name="disDescricao" class="form-control" id="disDescricao"
                                                            placeholder="Matemática">
                                                    </div>
                                                    <button id="btn-alterarDisciplina" type="submit"
                                                        class="btn btn-primary mr-2">
                                                        <i class="bi bi-check2-circle btn-icon-prepend"></i>
                                                        Alterar</button>
                                                        
                                                   <!--  <button id="btn-cancelarDisciplina" type="button"
                                                        class="btn btn-secondary">Cancelar</button> -->
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tableDisciplinaToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover table-striped" id="tableDisciplinas">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Disciplina</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <?php if(!empty($arr_disciplina)) { ?>
                                                        <?php foreach($arr_disciplina as $disciplina) { 
                                                            ?>
                                                            
                                                            <tr>
                                                                <td><?php echo $disciplina['disID']; ?></td>
                                                                <td><?php echo $disciplina['disDescricao']; ?></td> 
                                                                <td>                                                               
                                                                    <button type="button"
                                                                        class="btn btn-inverse-success btn-rounded btn-icon btn-edit-disciplina">
                                                                        <i class="bi bi-pencil"></i>
                                                                    </button>
                                                                    <button type="button"
                                                                        class="btn btn-inverse-danger btn-rounded btn-icon btn-del-disciplina">
                                                                        <i class="bi bi-trash"></i>
                                                                    </button>
                                                                </td>                                                      
                                                            </tr>
                                                        <?php } ?>
                                                    <?php } ?>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--Tematica-->
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Tabela de tematicas</h4>
                                    <p class="card-description">
                                    <button type="button" id="btn-cancelar-tematica"
                                            class="btn btn-secondary btn-icon-text">
                                            <i class="bi bi-x-circle btn-icon-prepend"></i>
                                            Cancelar
                                        </button>
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
                                                <form method="post" action="../backend/cadTematica.php">
                                                    <div class="form-group" >
                                                        <label class="labelCadastroAtuacao">Disciplina</label>
                                                        <select class="selectpicker show-tick" name="disciplinaopc"data-width="fit"
                                                            data-live-search="true">
                                                            <option disabled selected>Disciplina</option>
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
                                                        <input type="text" class="form-control" name="tematica" id="cadastroTematica"
                                                            placeholder="Operações Matemáticas">
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
                                    <div id="alterarTematica" class=" stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">Alterar Temática</h4>
                                                <p class="card-description">
                                                    Altere a temática selecionada.
                                                </p>
                                                <form method="post" action="../backend/altTematica.php">
                                                    <div class="form-group" >
                                                    <input type="hidden" name="idTematica" id="idTematica">
                                                        <label class="labelCadastroAtuacao">Disciplina</label>
                                                        <select class="selectpicker show-tick" name="disciplinaopcalt"data-width="fit"
                                                            data-live-search="true">
                                                            <option disabled selected>Disciplina</option>
                                                            <?php if(!empty($arr_disciplina)) { ?>
                                                                <?php foreach($arr_disciplina as $disciplina) { 
                                                                    ?>        
                                                                    <option value="<?php echo $disciplina['disID']; ?>"><?php echo $disciplina['disDescricao']; ?></option>                                                                                                                                                                                                                                                                    
                                                                <?php } ?>
                                                            <?php } ?>                                                                                                                   
                                                        </select>                                                      
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="alterarTematica">Temática</label>
                                                        <input type="text" class="form-control" name="temDescricao" id="temDescricao"
                                                            placeholder="Operações Matemáticas">
                                                    </div>
                                                    <button id="btn-alterarTematica" type="submit"
                                                        class="btn btn-primary mr-2"> 
                                                        <i class="bi bi-check2-circle btn-icon-prepend"></i>
                                                        Alterar</button>
                                                   <!--  <button id="btn-cancelarTematica" type="button"
                                                        class="btn btn-secondary">Cancelar</button> -->
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="tableTematicaToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover table-striped" id="tableTematica">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Temática</th>
                                                    <th>Disciplina</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <?php if(!empty($arr_tematica)) { ?>
                                                        <?php foreach($arr_tematica as $tematica) {?>                                                          
                                                            <tr>
                                                                <td><?php echo $tematica['temID']; ?></td>
                                                                <td><?php echo $tematica['temDescricao']; ?></td>
                                                                <td><?php echo $tematica['disDescricao']; ?></td> 
                                                                <td>                                                                 
                                                                    <button type="button"
                                                                        class="btn btn-inverse-success btn-rounded btn-icon btn-edit-tematica">
                                                                        <i class="bi bi-pencil"></i>
                                                                    </button>
                                                                    <button type="button"
                                                                        class="btn btn-inverse-danger btn-rounded btn-icon btn-del-tematica">
                                                                        <i class="bi bi-trash"></i>
                                                                    </button>
                                                                </td>                                                      
                                                            </tr>
                                                        <?php } ?>
                                                    <?php } ?>
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
                                                <form method="post" action="../backend/cadastro.php">
                                                    <div class="form-group">
                                                        <label class="labelCadastroAtuacao">Temática</label>
                                                        <select class="selectpicker show-tick" data-width="fit"
                                                            data-live-search="true">
                                                            <option disabled selected>Temática</option>
                                                            <option>Geometria</option>
                                                            <option>Anatomia</option>
                                                        </select>
                                                        <div class="badge badge-outline-secondary  text-secondary">Outlined</div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="subgrupo">Subgrupo</label>
                                                        <input type="text" class="form-control" id="subgrupo"
                                                            placeholder="Geometria">
                                                    </div>
                                                    <button id="btn-cadastrarSubgrupo" type="submit"
                                                        class="btn btn-primary mr-2"> 
                                                        <i class="bi bi-check2-circle btn-icon-prepend"></i>
                                                        Cadastrar</button>
                                                    <button id="btn-cancelarSubgrupo" type="button"
                                                        class="btn btn-secondary">Cancelar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="tableSubgrupoToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover table-striped" id="tableSubgrupo">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Subgrupo</th>
                                                    <th>Temática</th>
                                                    <th>Discplina</th>
                                                    <th>Ações</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                            <?php if(!empty($arr_subgrupo)) { ?>
                                                        <?php foreach($arr_subgrupo as $subgrupo) {?>                                                          
                                                            <tr>
                                                                <td><?php echo $subgrupo['subID']; ?></td>
                                                                <td><?php echo $subgrupo['subDescricao']; ?></td>
                                                                <td><?php echo $subgrupo['temDescricao']; ?></td>
                                                                <td><?php echo $subgrupo['disDescricao']; ?></td>  
                                                                <td>                                                                
                                                                    <button type="button"
                                                                        class="btn btn-inverse-success btn-rounded btn-icon btn-edit-subgrupo">
                                                                        <i class="bi bi-pencil"></i>
                                                                    </button>
                                                                    <button id="btn-delete-disciplina" type="button"
                                                                        class="btn btn-inverse-danger btn-rounded btn-icon btn-del-subgrupo">
                                                                        <i class="bi bi-trash"></i>
                                                                    </button>
                                                                </td>                                   
                                                            </tr>
                                                        <?php } ?>
                                                    <?php } ?>
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
                        <form method="post" action="../backend/delDisciplina.php" >
                            <div class="modal-header">
                            <h4 class="modal-title ml-auto">Deseja excluir a disciplina selecionada?</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                                </button>
                               
                                    <div class="form-group">
                                    <input type="hidden" name="idDisciplinaDel" id="idDisciplinaDel">                                                     
                                    </div>                                                                                              
                                  
                             </div>
                           
                            <div class="modal-footer">
                            <button id="modalCancelar" type="button" class="btn btn-secondary  mr-auto">Cancelar</button>
                            <button id="modalConfirmar" type="submit"
                                             class="btn btn-primary">
                                            <i class="bi bi-x-circle btn-icon-prepend "></i>
                                                Excluir</button>                       
                            </div>
                            </form>   
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="modalDelete2" tabindex="-1" aria-labelledby="modalDelete2"
                    aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content">
                        <form method="post" action="../backend/delTematica.php" >
                            <div class="modal-header">
                            <h4 class="modal-title ml-auto">Deseja excluir a tematica selecionada?</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                                </button>
                               
                                    <div class="form-group">
                                    <input type="hidden" name="idTematicaDel" id="idTematicaDel">                                                     
                                    </div>                                                                                              
                                  
                             </div>
                           
                            <div class="modal-footer">
                            <button id="modalCancelar2" type="button" class="btn btn-secondary  mr-auto">Cancelar</button>
                            <button id="modalConfirmar2" type="submit"
                                             class="btn btn-primary">
                                            <i class="bi bi-x-circle btn-icon-prepend "></i>
                                                Excluir</button>                       
                            </div>
                            </form>   
                        </div>
                    </div>
                </div>


                <footer class="footer">
                    <div class="d-sm-flex justify-content-center justify-content-sm-between">
                        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.
                            Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin
                                template</a> from BootstrapDash. All rights reserved.</span>
                        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Criado com muito <i
                                class="ti-heart text-danger ml-1"></i></span>
                    </div>
                </footer>
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
       

        <?php 
        if(isset($_SESSION['msg'])){
            echo $_SESSION['msg'];
            unset($_SESSION['msg']);
        }
        ?>


</body>

</html>