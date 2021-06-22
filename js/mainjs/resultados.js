$(document).ready(function () {

    init();

    function init() {
        $("#cadastrarQuestao").hide();
        $("#verResultados").hide();
        tableQuestoes = $('#tableResultados').DataTable({
            "columnDefs": [
                { "orderable": false, "targets": 1 }
            ],
            "language": {
                url: "../partials/dataTablept-br.json"
            },
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],

        });



    }

    function toggleNovaQuestao() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarQuestao').css('display') == 'none') {
            $("#btn-nova-questao").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableResultadosToggle").toggle("slow");
        } else {
            $("#btn-nova-questao").text('Adicionar questão').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableResultadosToggle").toggle("slow");
        }
        $("#cadastrarQuestao").toggle("slow");
    }

    //!  Botão Modal info atividade e cancelar
    $(".btn-info-aluno").on("click", function () {
        $('#modalAluno').modal('show')
    });
    $("#modalCancelar").click(function () {
        $('#modalAluno').modal('hide')
    })
    //!
    //! Botão Mostrar resultados dos alunos
    $(".btn-info-atividade").on("click", function () {
        $("#tabelaResultados").toggle("slow");
        $("#verResultados").toggle("slow");
    })
    $("#btn-voltar-resultados").click(function () {
        $("#tabelaResultados").toggle("slow");
        $("#verResultados").toggle("slow");
    })
    //! 
    $('#tableResultados').on('mouseenter', 'tbody tr', function () {
        var rowData = tableQuestoes.row(this).data();

    });
});