$(document).ready(function () {

    init();

    function init() {
        $("#btn-cancelar-disciplina").hide();
        $("#btn-cancelar-tematica").hide();

        $("#alterarTematica").hide();
        $("#cadastrarDisciplina").hide();
        $("#cadastrarSubgrupo").hide();
        $("#cadastrarTematica").hide();
        $('#tableDisciplinas , #tableSubgrupo , #tableTematica').DataTable({
            "language": {
                url: "../partials/dataTablept-br.json"
            },
            "lengthMenu": [[5, 15, 25, -1], [5, 15, 25, "Todos"]],
        });

        /*  $('#tableDisciplinasQuestoes').DataTable({
             columnDefs: [{
                 orderable: false,
                 className: 'select-checkbox',
                 targets: 0
             }],
             select: {
                 style: 'single',
             },
             order: [[1, 'asc']],
             "language": {
                 url: "../partials/dataTablept-br.json"
             },
             "lengthMenu": [[5, 15, 25, -1], [5, 15, 25, "All"]],
 
         }); */
    }


    //! Esconder/mostrar cadastrar disciplina
    function toggleNovaDisciplina() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarDisciplina').css('display') == 'none') {
            $("#btn-nova-disciplina").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableDisciplinaToggle").toggle("slow");

        } else {
            $("#btn-nova-disciplina").text('Adicionar disciplina').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableDisciplinaToggle").toggle("slow");
        }
        $("#cadastrarDisciplina").toggle("slow");
    }
    $("#btn-nova-disciplina").click(function () {
        toggleNovaDisciplina();
        window.history.pushState(null, null, window.location.pathname);
        $("#opDisciplina").val("");
        $("#disciplina").val("");
    })
    /*   $("#btn-cancelarDisciplina").click(function () {
          toggleNovaDisciplina();
      }) */


    $(".btn-edit-disciplina").click(function () {
        toggleNovaDisciplina()
        var data = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        var hiddenInput = $(this).closest('tr').find('input[type="hidden"]').val();

        $("#disciplina").val(data[1]);
        $("#opDisciplina").val("update");
        $("#disID").val(hiddenInput);
    });

    $(".btn-del-disciplina").on("click", function () {
        $('#modalDelete').modal('show')
        var data = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#idDisciplinaDel").val(data[0]);

    });
    //? Modal cancelar
    $("#modalCancelar").click(function () {
        $('#modalDelete').modal('hide')
        window.history.pushState(null, null, window.location.pathname);
    });


    //!


    //! Esconder/mostrar cadastrar subgrupo
    function toggleNovoSubgrupo() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarSubgrupo').css('display') == 'none') {
            $("#btn-novo-subgrupo").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableSubgrupoToggle").toggle("slow");
        } else {
            $("#btn-novo-subgrupo").text('Adicionar subgrupo').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableSubgrupoToggle").toggle("slow");
        }
        $("#cadastrarSubgrupo").toggle("slow");
    }
    $("#btn-novo-subgrupo").click(function () {
        toggleNovoSubgrupo();
    })
    $("#btn-cancelarSubgrupo").click(function () {
        toggleNovoSubgrupo();
    })
    //!


    //! Esconder/mostrar cadastrar tematica
    function toggleNovaTematica() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarTematica').css('display') == 'none') {
            $("#btn-novo-tematica").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableTematicaToggle").toggle("slow");
        } else {
            $("#btn-novo-tematica").text('Adicionar tematica').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableTematicaToggle").toggle("slow");
        }
        $("#cadastrarTematica").toggle("slow");
    }
    $("#btn-novo-tematica").click(function () {
        toggleNovaTematica();
    })
    $("#btn-cancelarTematica").click(function () {
        toggleNovaTematica();
    })

    function toggleAlterarTematica() {

        if ($('#alterarTematica').css('display') == 'none') {
            $("#btn-cancelar-tematica").show();
            $("#btn-novo-tematica").hide();
            $("#tableTematicaToggle").toggle("slow");
        }
        $("#alterarTematica").toggle("slow");
    }

    $("#btn-cancelar-tematica").click(function () {
        $("#btn-cancelar-tematica").hide();
        $("#btn-novo-tematica").show();
        $('#alterarTematica').toggle("slow");
        $("#tableTematicaToggle").toggle("slow");
    });
    $(".btn-edit-tematica").click(function () {
        toggleAlterarTematica();

        var data = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        console.log(data)
        $("#idTematica").val(data[0]);
        $("#temDescricao").val(data[1]);


    });

    $(".btn-del-tematica").on("click", function () {
        $('#modalDelete2').modal('show')
        var data = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#idTematicaDel").val(data[0]);

    });
    $("#modalCancelar2").click(function () {
        $('#modalDelete2').modal('hide')
    });

    //!






});









