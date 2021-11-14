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

        .list-wrapper ul li {
        font-size: 0.9375rem;
        padding: 0.2rem 1.4rem;
        border: none;
        margin-bottom: 0.812rem;
        border-radius: 7px;
        }
        .list-wrapper ul li .form-check, .list-wrapper ul li .form-check .form-check-label, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-name, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user .u-designation, .email-wrapper .mail-list-container .mail-list .content .sender-name, .email-wrapper .message-body .attachments-sections ul li .details p.file-name, .settings-panel .chat-list .list .info p {
      
            white-space: normal;
        }
        /* .card .card-title {
            text-transform: none;
        } */
       
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

                        <div id="tabelaResultados" class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Acompanhe os resultados das atividades</h4>
                                    <p class="card-description">

                                    </p>
                                 
                                    <div id="tableResultadosToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover" id="tableResultados">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Atividade</th>
                                                    <th>Data Inicial</th>
                                                    <th>Data Final</th>
                                                    <th>Tipo</th>
                                                    <th>Classe</th>
                                                    <th>Resultados</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyResultados">
                                        
                                               
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="verGraficos" class="row">
                                        <div class="col-md-12 grid-margin stretch-card">
                                            <div class="card">
                                                <div class="card-body">
                                                    
                                                    <div id="titulo">
                                                        
                                                    </div>
                                                    <button type="button" id="btn-voltar-graficos"
                                                        class="btn btn-secondary btn-icon-text">
                                                        <i class="bi bi-arrow-left-circle btn-icon-prepend"></i>
                                                        Voltar
                                                    </button>
                                                    <p class="card-description"></p>

                                                
                                                    <div class="table-responsive">
                                                        <canvas id="grafico1"  class="table"></canvas>
                                                    </div>
                                                    <div class="table-responsive">
                                                        <canvas id="grafico2"  class="table"></canvas>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <!--Tabela de atividades-->
                                    </div>
                    <div id="verResultados" class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Resultado dos Alunos</h4>
                                    <button type="button" id="btn-voltar-resultados"
                                        class="btn btn-secondary btn-icon-text">
                                        <i class="bi bi-arrow-left-circle btn-icon-prepend"></i>
                                        Voltar
                                    </button>
                                    <p class="card-description">

                                    </p>

                                    <div id="tableAlunosToggle" class="table-responsive">
                                        <table id="tableResultadosAluno" class="table display expandable-table table-striped table-hover" >
                                            <thead>
                                                <tr>
                                                    <th>Aluno(a)</th>
                                                    <th>Desempenho</th>
                                                    <th>Acertos</th>
                                                    <th>Pontuação</th>
                                                    <th>Data de conclusão</th>
                                                    <th width="2%">Ver Atividade</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyResultadosAluno">
                                               
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <!--Tabela de atividades-->
                    </div>
                    

                    <div id="verAtividadeAluno" class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div id="tituloResAluno">

                                    </div>
                                   
                                    <button type="button" id="btn-voltar-verAtividadeAluno"
                                        class="btn btn-secondary btn-icon-text">
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
                        <!--Tabela de atividades-->
                    </div>
                  




                </div>

                <div class="modal fade" id="modalAluno" tabindex="-1" aria-labelledby="modalAluno" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-body">


                            </div>
                            <div class="modal-footer">
                                <button id="modalCancelar" type="button" class="btn btn-secondary">Cancelar</button>
                                <button id="modalConfirmar" type="button" class="btn btn-primary">Confirmar</button>
                            </div>
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
        <script src="../js/dataTables.select.min.js"></script>
        <script src="../js/off-canvas.js"></script>
        <script src="../js/hoverable-collapse.js"></script>
        <script src="../js/template.js"></script>
        <script src="../js/sweetAlert.js"></script>
        <script src="../js/settings.js"></script>
        <script src="../vendors/chart.js/Chart.min.js"></script>

        <!-- endinject -->
        <!-- Custom js for this page-->
        <script src="../js/mainjs/resultados.js"></script>
        <!-- <script src="../js/dashboard.js"></script> -->
        <script src="../js/Chart.roundedBarCharts.js"></script>
        <!-- End custom js for this page-->
</body>

</html>