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
                        <a class="nav-link" href="../pages/atividades.html">
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
                                <li class="nav-item"> <a class="nav-link" href="../pages/questoes.html">Gerenciar
                                        Questões</a></li>
                                <li class="nav-item"> <a class="nav-link" href="../pages/atuacao.html">Area de
                                        atuação</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../pages/resultados.html">
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

                        <div id="tabelaResultados" class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Resultado das atividades</h4>
                                    <p class="card-description">

                                    </p>
                                    <div id="cadastrarQuestao" class=" stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">Questão</h4>
                                                <p class="card-description">
                                                    Cadastre a questão para a atividade.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                    <div id="tableResultadosToggle" class="expandable-table table-responsive">
                                        <table class="table table-hover" id="tableResultados">
                                            <thead>
                                                <tr>
                                                    <th>Atividade</th>
                                                    <th>Resultados</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>T1 - Trabalho semestral</td>
                                                    <td>
                                                        <button type="button"
                                                            class="btn btn-inverse-primary btn-rounded btn-icon btn-info-atividade ">
                                                            <i class="bi bi-clipboard-data"></i>
                                                        </button>

                                                    </td>


                                                </tr>
                                                <tr>
                                                    <td>P1 - Divisão celular</td>
                                                    <td> <button type="button"
                                                            class="btn btn-inverse-primary btn-rounded btn-icon btn-info-atividade ">
                                                            <i class="bi bi-clipboard-data"></i>
                                                        </button></td>


                                                </tr>
                                                <tr>
                                                    <td>Conjunto numérico: naturais e inteiros</td>
                                                    <td> <button type="button"
                                                            class="btn btn-inverse-primary btn-rounded btn-icon btn-info-atividade ">
                                                            <i class="bi bi-clipboard-data"></i>
                                                        </button></td>


                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

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

                                    <div id="tableTiposToggle" class="table-responsive">
                                        <table id="tableTipos" class="table table-striped table-hover ">
                                            <thead>
                                                <tr>
                                                    <th>Aluno</th>
                                                    <th>Desempenho</th>
                                                    <th>Acertos</th>
                                                    <th>Ver Atividade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Luan de Oliveira</td>
                                                    <td>
                                                        <div class="progress">
                                                            <div class="progress-bar bg-success" role="progressbar"
                                                                style="width: 50%" aria-valuenow="25" aria-valuemin="0"
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td>5/10</td>
                                                    <td>
                                                        <button type="button"
                                                            class="btn btn-inverse-primary btn-rounded btn-icon btn-info-aluno ">
                                                            <i class="bi bi-file-earmark-text"></i>
                                                        </button>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Paulo Rodrigues</td>
                                                    <td>
                                                        <div class="progress">
                                                            <div class="progress-bar bg-danger" role="progressbar"
                                                                style="width: 20%" aria-valuenow="25" aria-valuemin="0"
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td>2/10</td>
                                                    <td>
                                                        <button type="button"
                                                            class="btn btn-inverse-primary btn-rounded btn-icon btn-info-aluno ">
                                                            <i class="bi bi-file-earmark-text"></i>
                                                        </button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
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
        <script src="../js/dataTables.select.min.js"></script>
        <script src="../js/off-canvas.js"></script>
        <script src="../js/hoverable-collapse.js"></script>
        <script src="../js/template.js"></script>


        <!-- endinject -->
        <!-- Custom js for this page-->
        <script src="../js/mainjs/resultados.js"></script>
        <!-- End custom js for this page-->
</body>

</html>