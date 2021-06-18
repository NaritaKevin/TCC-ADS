$(document).ready(function () {

    init();

    function init() {
        $("#cadastroTipo").hide();
        $("#cadastrarAtividade").hide();
        $('#tableAtividade').DataTable({
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
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
        });
        $('#tableTipos').DataTable({
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
            "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]]
        });
        $.datetimepicker.setLocale('pt-BR');

    }


    $("#btn-novo-tipo").click(function () {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastroTipo').css('display') == 'none') {
            $("#btn-novo-tipo").text('Cancelar').prepend(cancelarIcon);
            $("#tableTiposToggle").toggle("slow");
        } else {
            $("#btn-novo-tipo").text('Novo tipo').prepend(adicionarIcon);
            $("#tableTiposToggle").toggle("slow");
        }
        $("#cadastroTipo").toggle("slow");
    })
    $("#btn-nova-atividade").click(function () {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarAtividade').css('display') == 'none') {
            $("#btn-nova-atividade").text('Cancelar').prepend(cancelarIcon);
            $("#tableAtividadesToggle").toggle("slow");
        } else {
            $("#btn-nova-atividade").text('Novo tipo').prepend(adicionarIcon);
            $("#tableAtividadesToggle").toggle("slow");
        }
        $("#cadastrarAtividade").toggle("slow");
    })








    $("#data-inicial,#data-final").datetimepicker({
        timepicker: false, mask: true, format: 'd/m/Y',
    })
    $("#btn-add-atividades").click(function () {
        console.log($("#data-inicial").val())
    })

});