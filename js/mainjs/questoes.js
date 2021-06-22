$(document).ready(function () {

    init();

    function init() {
        $("#cadastrarQuestao").hide();
        tableQuestoes = $('#tableQuestoes').DataTable({
            "columnDefs": [
                { "orderable": false, "targets": 9 }
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
            $("#tableQuestoesToggle").toggle("slow");
        } else {
            $("#btn-nova-questao").text('Adicionar questão').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableQuestoesToggle").toggle("slow");
        }
        $("#cadastrarQuestao").toggle("slow");
    }

    //!  Modal info e cancelar
    $(".btn-info-questao").on("click", function () {
        $('#modalInfoQuestao').modal('show')
    });
    $("#modalCancelar").click(function () {
        $('#modalInfoQuestao').modal('hide')
    })
    //!
    //! Esconder/mostrar cadastrar questao
    $("#btn-nova-questao").click(function () {
        toggleNovaQuestao();
    })
    $("#cancelarQuestao").click(function () {
        toggleNovaQuestao();
    })
    //!
    //! Opção das alternativas
    $(".toggleAlternativa").click(function () {
        $(this).text() == "Incorreta" ? $(this).text("Correta").removeClass("btn-danger").addClass("btn-success") :
            $(this).text("Incorreta").removeClass("btn-success").addClass("btn-danger");
    })
    //!
    $('#tableQuestoes').on('mouseenter', 'tbody tr', function () {
        var rowData = tableQuestoes.row(this).data();

    });
});