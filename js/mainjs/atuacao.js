$(document).ready(function () {

    init();

    function init() {
        $("#cadastrarDisciplina").hide();
        $("#cadastrarSubgrupo").hide();
        $("#cadastrarTematica").hide();
        $('#tableDisciplinas').DataTable({
            "language": {
                url: "../partials/dataTablept-br.json"
            },
            "lengthMenu": [[5, 15, 25, -1], [5, 15, 25, "All"]],
        });
        $('#tableSubgrupo').DataTable({
            "language": {
                url: "../partials/dataTablept-br.json"
            },
            "lengthMenu": [[5, 15, 25, -1], [5, 15, 25, "All"]],
        });
        $('#tableDisciplinasQuestoes').DataTable({
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

        });
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
    })
    $("#btn-cancelarDisciplina").click(function () {
        toggleNovaDisciplina();
    })
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
    //!

});









