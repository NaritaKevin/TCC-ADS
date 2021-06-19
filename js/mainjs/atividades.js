$(document).ready(function () {

    init();

    function init() {
        $("#cadastroTipo").hide();
        $("#cadastrarAtividade").hide();
        $("#cadastroQuestoes").hide();

        $("#data-inicial,#data-final").datetimepicker({
            timepicker: false, mask: true, format: 'd/m/Y',
        })
        $('#tableAtividade').DataTable({
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
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
        });
        $('#tableTipos').DataTable({
            "columnDefs": [
                { "orderable": false, "targets": 2 }
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
            "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]]
        });
        $('#tableQuestoes').DataTable({
            "ordering": false,
            "bFilter": false,
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
        jqueryuiinit();
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
    });

    $("#btn-nova-atividade").click(function () {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarAtividade').css('display') == 'none') {
            $("#btn-nova-atividade").text('Cancelar').prepend(cancelarIcon);
            $("#tableAtividadesToggle").toggle("slow");
        } else {
            $("#btn-nova-atividade").text('Nova atividade').prepend(adicionarIcon);
            $("#tableAtividadesToggle").toggle("slow");
        }
        $("#cadastrarAtividade").toggle("slow");

    });
    $("#btn-nova-questao").click(function () {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastroQuestoes').css('display') == 'none') {
            $("#btn-nova-questao").text('Cancelar').prepend(cancelarIcon);
            $("#tableQuestoesToggle").toggle("slow");
        } else {
            $("#btn-nova-questao").text('Nova questão').prepend(adicionarIcon);
            $("#tableQuestoesToggle").toggle("slow");
        }
        $("#cadastroQuestoes").toggle("slow");

    });




    function jqueryuiinit() {

        var fixHelperModified = function (e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function (index) {
                $(this).width($originals.eq(index).width())
            });
            return $helper;
        },
            updateIndex = function (e, ui) {
                $('td.index', ui.item.parent()).each(function (i) {
                    $(this).html(i + 1);
                });
                $('input[type=text]', ui.item.parent()).each(function (i) {
                    $(this).val(i + 1);
                });
            };

        $("#tableQuestoes tbody").sortable({
            helper: fixHelperModified,
            stop: updateIndex
        }).disableSelection();

        $("tbody").sortable({
            distance: 5,
            delay: 100,
            opacity: 0.6,
            cursor: 'move',
            update: function () { }
        });

    }

    $('.collapse').on('show.bs.collapse', function () {
        $('.collapse.in').collapse('hide');
    });

});