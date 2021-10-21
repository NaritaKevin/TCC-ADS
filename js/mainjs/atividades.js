$(document).ready(function () {
    let buscaInicialQuestao = true;
    let buscaInicialAtividade = true;

    var opAtividade
    var opId

    init();

    function init() {

        $("#cadastrarAtividade").hide();
        $("#cadastroQuestoes").hide();
        $("#escolherQuestoes").hide();
        $("#data-inicial,#data-final").datetimepicker({
            timepicker: false, mask: true, format: 'd/m/Y',
        })

        //? Tabela de escolher questões
        tableEscolher = $('#tableEscolherQuestoes').DataTable({

            "select": {
                "style": 'multi'
            },
            "columnDefs": [
                {
                    //"orderable": true,
                    //"targets": [9]
                },
                {
                    'targets': 0,
                    'checkboxes': {
                      'selectRow': true
                    }
                }
            ],
            responsive: true,
            ajax: {
                "url": "../backend/BackAtividade/atividadeBack.php",
                "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                "data": { buscaInicialQuestao: buscaInicialQuestao }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                "dataSrc": ""
            },
            language: { // tradução em portgues da tabela
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
            columns: [
                //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o queID.
                { data: 'queID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                { data: 'queDescricao' },
                { data: 'queCodigoBncc' },
                { data: 'queStsTipo' },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        return `<button  type="button"
                            class="btn  btn-inverse-success btn-rounded btn-icon btn-edit-disciplina">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button"
                            class="btn btn-inverse-danger btn-rounded btn-icon btn-del-disciplina">
                            <i class="bi bi-trash"></i>
                        </button>`;
                    }
                },
            ]

            
        })


        tableAtividade = $('#tableAtividade').DataTable({
            
            responsive: true,
            ajax: {
                "url": "../backend/BackAtividade/atividadeBack.php",
                "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                "data": { buscaInicialAtividade: buscaInicialAtividade }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                "dataSrc": ""
            },
            language: { // tradução em portgues da tabela
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
            columns: [
                //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o queID.
                { data: 'atiID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                { data: 'atiDescricao' },
                { data: 'atiObservacao' },
                { data: 'atiDataInicio' },
                { data: 'atiDataFim' },
                { data: 'atiTipoID' },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        return `<button id="btn" type="button"
                        class="btn btn-inverse-primary btn-rounded btn-icon btn-info-questao ">
                        <i class="bi bi-info-lg"></i>
                    </button>
                    <button type="button"
                        class="btn btn-inverse-success btn-rounded btn-icon btn-editar-atividade">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button"
                        class="btn btn-inverse-danger btn-rounded btn-icon  btn-excluir-atividade">
                        <i class="bi bi-trash"></i>
                    </button>`;
                    }
                },
            ]

            
        })

    }
    //? Formulario de Cadastro de Atividade
    $('#formAtividades').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina
        var nome = $('#nome').val();
        var descricao = $('#descricao').val();
        var tipoopc = $("#tipoopc").val();
        var dataInicial = $("#data-inicial").val();
        var dataFinal = $("#data-final").val();

        var dataFormInicial
        var dataFormFinal
        function formatarData(data) {
            var dia = data.split("/")[0];
            var mes = data.split("/")[1];
            var ano = data.split("/")[2];
            

            return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
            // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
        }

        dataFormInicial = formatarData(dataInicial);
        dataFormFinal = formatarData(dataFinal);

        console.log(dataFormInicial);
        console.log(dataFormFinal);
        console.log(nome);
        console.log(descricao);
        console.log(tipoopc);

        $.ajax({
            url: '../backend/BackAtividade/atividadeBack.php',
            method: 'POST',
            data: {
                nome: nome,
                descricao: descricao,
                tioopc: tipoopc,
                dataFormInicial: dataFormInicial,
                dataFormFinal: dataFormFinal
            },
            dataType: 'json',
            success: function (data) {
                if (data.type == 'erro') {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })

                } else if (data.type == 'sucesso') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })

                    $("#btn-nova-atividade").click();//Simula um click manual no botao de cadastrar
                } else if (data.type == 'validacao') {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    //!fazer validação dos campos inserindo no html depois
                }
            }
        }).done(function (data) {
            //? tableAtividade.ajax.reload(null, false);
        });

    });

    

    //?Botao da tabela de editar atividade
$("#tbodyAtivdades").on("click", ".btn-edit-subgrupo", function () {
    toggleNovoSubgrupo()
    let dados = $(this).closest('tr').children("td").map(function () {
        return $(this).text();
    }).get();

    $("#subID").val(dados[0]);
    $("#subgrupo").val(dados[1]);
    $("#opSubgrupo").val("update");

    $("#tematicaopc option:contains(" + dados[2] + ")").attr("selected", true);//Pré seleciona opção no dropdown
    $(".filter-option-inner-inner").text(dados[2]);//Escreve a disciplina selecionada no botão do dropdown


});

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
        $('#nome, #data-final, #data-inicial, #tipoopc, #descricao').val("");
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