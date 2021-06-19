$(document).ready(function () {

    init();

    function init() {
        /* $("#data-inicial").datetimepicker({
             timepicker: false, mask: true, format: 'd/m/Y',
         })*/
        $("#cadastrarQuestao").hide();
        $('#tableQuestoes').DataTable({
            "columnDefs": [
                { "orderable": false, "targets": 7 }
            ],
            "language": {
                "decimal": "",
                "emptyTable": "Não há dados na tabela",
                "info": "Mostrando _START_ de _END_. Total: _TOTAL_ entradas",
                "infoEmpty": "Mostrando 0 para 0 de 0 entradas.",
                "infoFiltered": "(filtrado  _MAX_ entradas totais)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ entradas por página",
                "loadingRecords": "Carregando...",
                "processing": "Processando...",
                "search": "Procurar:",
                "zeroRecords": "Nenhum registro correspondente encontrado",
                "paginate": {
                    "first": "Primeiro",
                    "last": "Último",
                    "next": "Próximo",
                    "previous": "Anterior"
                },
            },
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],

        });



    }




    $("#btn-nova-questao").click(function () {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarQuestao').css('display') == 'none') {
            $("#btn-nova-questao").text('Cancelar').prepend(cancelarIcon);
            $("#tableQuestoesToggle").toggle("slow");
        } else {
            $("#btn-nova-questao").text('Adicionar questão').prepend(adicionarIcon);
            $("#tableQuestoesToggle").toggle("slow");
        }
        $("#cadastrarQuestao").toggle("slow");
    })



});