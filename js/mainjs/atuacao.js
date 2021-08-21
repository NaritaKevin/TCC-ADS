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


    }


    //! Area de js para disciplina
    //Esconder e mostrar o formulario de cadastro/alteração de tematica
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
    //Botao para abrir/fechar formulario de cadastro da  disciplina
    $("#btn-nova-disciplina").click(function () {
        toggleNovaDisciplina();
        window.history.pushState(null, null, window.location.pathname);
        $("#opDisciplina").val("");
        $("#disciplina").val("");
    })
    /*   $("#btn-cancelarDisciplina").click(function () {
          toggleNovaDisciplina();
      }) */

    //Botao editar da tabela de disciplina
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
    //botao excluir da tabela de disciplina
    $(".btn-del-disciplina").on("click", function () {
        $('#modalDelete').modal('show')
    });


    //! FIM DISCIPLINA


    //! Area de js para subgrupo
    //Esconder e mostrar o formulario de cadastro/alteração de tematica
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
    //Botao para abrir/fechar formulario de cadastro do subgrupo
    $("#btn-novo-subgrupo").click(function () {
        toggleNovoSubgrupo();
        window.history.pushState(null, null, window.location.pathname);
        $("#opSubgrupo").val("");
        $("#subgrupo").val("");
    })
    /*  $("#btn-cancelarSubgrupo").click(function () {
         toggleNovoSubgrupo();
     }) */

    //Botao da tabela de editar subgrupo
    $(".btn-edit-subgrupo").click(function () {
        toggleNovoSubgrupo()
        var data = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        var hiddenInput = $(this).closest('tr').find('input[type="hidden"]').val();

        $("#subgrupo").val(data[1]);
        $("#opSubgrupo").val("update");
        $("#subID").val(hiddenInput);


    });

    //Botao da tabela que deleta subgrupo
    $(".btn-del-subgrupo").on("click", function () {
        $('#modalDelete').modal('show')

    });

    //Botao cadastrar subgrupo do formulario
    $("#btn-cadastrarSubgrupo").on("click", function () {
        window.history.pushState(null, null, window.location.pathname);
    })

    //! FIM SUBGRUPO


    //! Area de js para tematica
    //Esconder e mostrar o formulario de cadastro/alteração de tematica
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
    //Botao para abrir/fechar formulario de cadastro do tematica
    $("#btn-novo-tematica").click(function () {
        toggleNovaTematica();
        window.history.pushState(null, null, window.location.pathname);
        $("#opTematica").val("");
        $("#tematica").val("");
    })
    /* 
        $("#btn-cancelarTematica").click(function () {
            toggleNovaTematica();
        })
     */

    //Botao da tabela de editar tematica
    $(".btn-edit-tematica").click(function () {
        toggleNovaTematica();
        var data = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        var hiddenInput = $(this).closest('tr').find('input[type="hidden"]').val();


        $("#tematica").val(data[1]);
        $("#opTematica").val("update");
        $("#temID").val(hiddenInput);


    });

    //Botao da tabela que deleta tematica
    $(".btn-del-tematica").on("click", function () {
        $('#modalDelete').modal('show')

    });

    //Botao cadastrar tematica do formulario
    $("#btn-cadastrarTematica").on("click", function () {
        window.history.pushState(null, null, window.location.pathname);
    })


    //! FIM TEMATICA


    //? Modal cancelar
    $("#modalCancelar").click(function () {
        $('#modalDelete').modal('hide')
        window.history.pushState(null, null, window.location.pathname);
    });





});









