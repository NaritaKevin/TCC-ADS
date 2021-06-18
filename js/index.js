$(document).ready(function () {

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

});