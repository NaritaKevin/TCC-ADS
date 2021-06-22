$(document).ready(function () {

    init();

    function init() {

        $("#cadastrarAtividade").hide();
        $("#cadastroQuestoes").hide();
        $("#escolherQuestoes").hide();
        $("#data-inicial,#data-final").datetimepicker({
            timepicker: false, mask: true, format: 'd/m/Y',
        })


        jqueryuiinit();
        $.datetimepicker.setLocale('pt-BR');

    }

    //? Tabela de atividades
    $('#tableAtividade').DataTable({
        "columnDefs": [
            { "orderable": false, "targets": 7 }
        ],
        "language": {
            url: "../partials/dataTablept-br.json"
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    });

    $('#tableQuestoesAtividade').DataTable({
        "ordering": false,
        "Filter": false,
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": [1, 2, 3, 4, 5]
        }],
        "language": {
            url: "../partials/dataTablept-br.json"
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],

    });

    //? Tabela de escolher questões
    $('#tableEscolherQuestoes').DataTable({
        "select": {
            "style": 'multi'
        },
        "columnDefs": [
            {
                "orderable": false,
                "targets": [9]
            },
            {
                'targets': 0,
                'checkboxes': {
                    'selectRow': true
                }

            }
        ],
        "language": {
            url: "../partials/dataTablept-br.json"
        },
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],

    });
    //?

    function toggleNovaAtividade() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;
        if ($('#cadastrarAtividade').css('display') == 'none') {
            $("#btn-nova-atividade").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableAtividadesToggle").toggle("slow");
        } else {
            $("#btn-nova-atividade").text('Nova atividade').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableAtividadesToggle").toggle("slow");
        }
        $("#cadastrarAtividade").toggle("slow");
    }

    //! Esconder/mostrar cadastrar atividade
    $("#btn-nova-atividade").click(function () {
        toggleNovaAtividade()
    });
    $("#cancelarAtividade").click(function () {
        toggleNovaAtividade()
    })
    //!
    //!  Modal esconder/mostrar
    $("#btn-modal-escolher").on("click", function () {
        $('#modalQuestao').modal('show')
    });
    $("#btn-modalCancelarQuestao").click(function () {
        $('#modalQuestao').modal('hide')
    });
    //! Modal informação
    $(".btn-info-questao").on("click", function () {
        $('#modalInfoAtividade').modal('show')
    });
    $("#modalCancelar").click(function () {
        $('#modalInfoAtividade').modal('hide')
    })
    //!
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

        $("#tableQuestoesAtividade #tbodyQuestoesAtividade").sortable({
            helper: fixHelperModified,
            stop: updateIndex
        }).disableSelection();

        $("#tbodyQuestoesAtividade").sortable({
            distance: 5,
            delay: 100,
            opacity: 0.6,
            cursor: 'move',
            update: function () { }
        });

    }



});