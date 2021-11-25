$(document).ready(function () {
    let buscaInicialQuestao = true;
    let buscaInicialAtividade = true;
    let buscaInicialQuestõesEditar = true;
    let buscaInicialNada = true;
    let buscaInicialEscolher = true;
    let buscarSelecionadas = true;

    var opAtividade
    var opId

    var opDelete
    var opidDelete
    var queSel = [];

    let buscaInicialQuestoesSelecionadas = true;
    var queIDdelete
    var arrayDelete = []
    var questoesID
    var atualizar
    var IDatividade
    var arr_questoes = "";
    var Selecionadas = "";
    var novaAtividade = false;


    init();

    function init() {

        $("#cadastrarAtividade").hide();
        $("#cadastroQuestoes").hide();
        $("#escolherQuestoes").hide();
        $("#cadastrarQuestao").hide();
        $("#verAtividade").hide();

        $("#data-inicial,#data-final").datetimepicker({
            timepicker: true, mask: true, format: 'd/m/Y H:i'
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
            "columnDefs": [

                {
                    searchable: false,
                    orderable: false,
                    targets: [8]
                },

            ],
            columns: [
                //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o queID.
                { data: 'atiID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                { data: 'atiDescricao' },
                { data: 'atiObservacao' },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        let data_americana = data.atiDataInicio;
                        let data_brasileira = data_americana.split('-').reverse().join('/');
                        return data_brasileira;
                    }
                },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        let data_americana = data.atiDataFim;
                        let data_brasileira = data_americana.split('-').reverse().join('/');

                        return data_brasileira;
                    }
                },
                { data: 'tipDescricao' },

                {
                    data: null, render: function (data, type, row) {
                        if (data.atiStatus == "Pública") {
                            return `<label class="badge badge-success">${data.atiStatus}</label>`;

                        } else {
                            return `<label class="badge badge-danger">${data.atiStatus}</label>`;
                        }
                    }
                },
                { data: 'claNome' },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        if (data.atiPostado == "Sim") {
                            return `<button id="btn" type="button"
                            class="btn btn-inverse-primary btn-rounded btn-icon btn-ver-atividade ">
                            <i class="bi bi-file-earmark-text"></i>
                        </button>                      
                        <button type="button"
                            class="btn btn-inverse-danger btn-rounded btn-icon  btn-excluir-atividade">
                            <i class="bi bi-trash"></i>
                        </button>
                       
                        `;
                        } else {
                            return `<div class="text-center"><button id="btn" type="button"
                            class="btn btn-inverse-primary btn-rounded btn-icon btn-ver-atividade ">
                            <i class="bi bi-file-earmark-text"></i>
                        </button>
                        <button type="button"
                            class="btn btn-inverse-success btn-rounded btn-icon btn-editar-atividade">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button"
                            class="btn btn-inverse-danger btn-rounded btn-icon  btn-excluir-atividade">
                            <i class="bi bi-trash"></i>
                        </button>
                        <button type="button"
                        class="btn btn-inverse-primary btn-rounded btn-icon  btn-postar-atividade">
                        <i class="bi bi-send"></i>
                    </button></div>
                        `;
                        }


                    }
                },
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }
            ], createdRow: function (row, data, dataIndex) {
                if (data.atiPostado == "Sim")
                    $(row).addClass('table-primary');
            }


        })

    }
    $("#tbodyAtivdades").on("click", ".btn-postar-atividade", function () {
        let dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        Swal.fire({
            title: 'Deseja postar a atividade?',
            text: "Você não poderá reverter esta ação!",
            icon: 'question',
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#4B49AC',
            cancelButtonText: 'Não',
            confirmButtonText: 'Postar!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '../backend/BackAtividade/atividadeBack.php',
                    method: 'POST',
                    data: {
                        idAtividade: dados[0],
                        atiPostadoo: 'Sim',
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.type == 'sucesso') {
                            tableAtividade.ajax.reload(null, false);
                            Swal.fire({
                                title: 'Postada!',
                                text: data.text,
                                icon: 'success',
                                confirmButtonColor: '#4B49AC',
                            })
                        } else if (data.type == 'erro') {
                            Swal.fire({
                                title: 'Algo deu errado!',
                                text: data.text,
                                icon: 'error',
                                confirmButtonColor: '#4B49AC',
                            })
                        }
                    }, error: function (data) {
                        Swal.fire({
                            title: 'Algo deu errado!',
                            text: data.text,
                            icon: 'error',
                            confirmButtonColor: '#4B49AC',
                        })
                    }
                })
            }
        })
    })


    //? BOTAO DE CONFIMAR ESCOLHA QUESTÕES

    $('#btn-modalConfirmarQuestao').click(function (e) {
        buscaInicialQuestoesSelecionadas = true;
        var rowsel = tableEscolher.column(0).checkboxes.selected();



        if (rowsel.length > 0) {
            queSel = rowsel.join(",");

            if (arr_questoes != "") {
                Selecionadas = arr_questoes.concat(",");
            }

            Selecionadas = Selecionadas.concat(queSel);


            let queSelecionadas;
            $.ajax({
                url: '../backend/BackAtividade/atividadeBack.php',
                method: 'POST',
                data: {
                    selecionadas: Selecionadas,
                    buscarSelecionadas: buscarSelecionadas,
                },
                dataType: 'json',
                success: function (data) {

                    let count = 0;
                    queSelecionadas = data.map(function () {
                        return Object.assign(data[count++], { atiqOrdemQuestao: `${count}`, atiqPontuacao: `${0}` });

                    })

                }, error: function (data) {
                    alert("erro")
                }
            }).done(function (data) {

                if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
                    $('#tableQuestoesAtividade').DataTable().destroy();
                }
                //? TABELA DE QUESÕES JA ESCOLHIDAS
                tableEscolhidas = $('#tableQuestoesAtividade').DataTable({
                    destroy: true,
                    responsive: true,
                    responsive: true,
                    "columnDefs": [
                        {
                            "targets": [1],
                            "visible": false,
                            "searchable": false
                        },
                        {
                            orderable: false,
                            targets: [3]
                        }

                    ],
                    data: queSelecionadas,
                    language: {
                        url: "../partials/dataTablept-br.json"
                    },
                    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
                    columns: [

                        { data: 'atiqOrdemQuestao' },
                        { data: 'queID' },
                        {
                            data: null, render: function (data, type, row) {
                                let descricao = data.queDescricao.slice(0, 200);
                                let tamanho = descricao.length;
                                if (tamanho >= 200) {
                                    descricao = descricao + "..."
                                }

                                return `<span style=" max-width: 600px;
                                min-width: 300px;
                                display: block;
                                overflow-wrap: break-word;
                                white-space: break-spaces;">${descricao}</span>`;

                            }
                        },
                        {
                            data: null, render: function (data, type, row) {


                                return ` <input type="number" min="0" style="padding: 0.4rem 0.4rem;" class="form-control" value="${data.atiqPontuacao}" />`;
                                // return `<div>${data.atiqPontuacao}</div>`;

                            }
                        },
                        { data: 'subDescricao' },
                        { data: 'queCodigoBncc' },
                        { data: 'queStsTipo' },
                        { data: 'nivDescricao' },
                        {
                            data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                                return `
                            <button type="button"
                                class="btn btn-inverse-danger btn-rounded btn-icon btn-del-questaoEscolhida">
                                <i class="bi bi-trash"></i>
                            </button>`;
                            }
                        },
                    ], rowReorder: {
                        dataSrc: 'atiqOrdemQuestao'
                    },

                })

            });




        }





        $('#modalQuestao').modal('hide');
        e.preventDefault();


    })


    //? Formulario de Cadastro de Atividade
    $('#formAtividades').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina
        var nome = $('#nome').val();
        var descricao = $('#descricao').val();
        var tipoopc = $('#tipoopc option:selected').val();
        var dataInicial = $("#data-inicial").val();
        var dataFinal = $("#data-final").val();
        var status = $("#status option:selected").val();
        var classe = $("#classe").val();
        var stsQuestoes = $("#stsQuestoes option:selected").val();
        var stsAlternativas = $("#stsAlternativas option:selected").val();
        var stsRespostas = $("#stsRespostas option:selected").val();
        var stsNavegacao = $("#stsNavegacao option:selected").val();
        var stsReinicio = $("#stsReinicio option:selected").val();



        var dataFormInicial;
        var dataFormFinal;
        var questoesID = [];
        var ordem = [];
        var questaoSel = [];
        var opcao = atualizar;
        IDatividade = opId;


        function formatarData(data) {
            var dia = data.split("/")[0];
            var mes = data.split("/")[1];
            var ano = data.split("/")[2];
            return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
            // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
        }

        if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
            // questoesID = tableEscolhidas.columns(1).data().eq(0).sort()
            // ordem = tableEscolhidas.columns(0).data().eq(0).sort()
            questoesID = tableEscolhidas.column(1, { order: 'current' }).data();
            ordem = tableEscolhidas.column(0, { order: 'current' }).data();
            for (let i = 0; i < questoesID.length; i++) {
                let pont = tableEscolhidas.cell(i, 3).nodes().to$().find('input').val();
                questaoSel.push({ queIDSelecionado: `${questoesID[i]}`, atiqOrdemQuestao: `${ordem[i]}`, atiqPontuacao: `${pont}` })
            }
        }


        if (questoesID.length == 0) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Por favor, selecione as Questões",
                showConfirmButton: false,
                timer: 2000
            })

        } else {

            dataFormInicial = formatarData(dataInicial);
            dataFormFinal = formatarData(dataFinal);

            $.ajax({
                url: '../backend/BackAtividade/atividadeBack.php',
                method: 'POST',
                data: {
                    nome: nome,
                    descricao: descricao,
                    tipoopc: tipoopc,
                    dataFormInicial: dataFormInicial,
                    dataFormFinal: dataFormFinal,
                    status: status,
                    questaoSel: questaoSel,
                    opAtividade: opcao,
                    IDatividade: IDatividade,
                    turma: classe,
                    StsQuestoes: stsQuestoes

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
                    }
                }, error: function (data) {
                    alert("erro")
                }
            }).done(function (data) {
                tableAtividade.ajax.reload(null, false);
                atualizar = "";
            });

        }



    });



    //? ******************* EDITAR ATIVIDAE ********************
    $("#tbodyAtivdades").on("click", ".btn-editar-atividade", function () {
        $("#cardTableTitle").toggle("slow");
        $("#cardTitle").text("Alterar de atividade");
        $("#cardDesc").text("Altere a atividade selecionada.");
        $("#cadastrarAtividade span").text(" Salvar");
        toggleNovaAtividade()

        let dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        opId = dados[0];
        novaAtividade = false;
        opAtividade = "update";
        atualizar = "update2";
        $("#descricao").val(dados[2]);
        $("#data-inicial").val(dados[3]);
        $("#data-final").val(dados[4]);
        $("#status").val(dados[6])



        //? TABELA DE QUESÕES JA ESCOLHIDAS
        tableEscolhidas = $('#tableQuestoesAtividade').DataTable({
            destroy: true,
            responsive: true,
            responsive: true,
            "columnDefs": [
                {
                    "targets": [1],
                    "visible": false,
                    "searchable": false
                },
                {
                    orderable: false,
                    targets: [3]
                }

            ],
            ajax: {
                "url": "../backend/BackAtividade/atividadeBack.php",
                "method": 'POST',
                "data": { opID: opId, buscaInicialQuestõesEditar: buscaInicialQuestõesEditar },
                "dataSrc": ""
            },
            language: {
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
            columns: [

                { data: 'atiqOrdemQuestao' },
                { data: 'queID' },
                {
                    data: null, render: function (data, type, row) {
                        let descricao = data.queDescricao.slice(0, 200);
                        let tamanho = descricao.length;
                        if (tamanho >= 200) {
                            descricao = descricao + "..."
                        }

                        return `<span style=" max-width: 500px;
                        min-width: 200px;
                        display: block;
                        overflow-wrap: break-word;
                        white-space: break-spaces;">${descricao}</span>`;

                    }
                },
                {
                    data: null, render: function (data, type, row) {


                        return ` <input type="number" min="0" style="padding: 0.4rem 0.4rem;" class="form-control" value="${data.atiqPontuacao}" />`;
                    }
                },
                { data: 'subDescricao' },
                { data: 'queCodigoBncc' },
                { data: 'queStsTipo' },
                { data: 'nivDescricao' },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        return `
                    <button type="button"
                        class="btn btn-inverse-danger btn-rounded btn-icon btn-del-questaoEscolhida">
                        <i class="bi bi-trash"></i>
                    </button>`;
                    }
                },
            ], rowReorder: {
                dataSrc: 'atiqOrdemQuestao'
            },


        })


        if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
            questoesID = tableEscolhidas.columns(1).data().eq(0).sort()

        }

        let arrayID = [];

        for (var i = 0; i < questoesID.length; i++) {
            arrayID.push(questoesID[i]);
        }

        $.ajax({
            url: '../backend/BackAtividade/atividadeBack.php',
            method: 'POST',
            data: {
                opID: opId,
                opAtividade: opAtividade,

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

                } else {

                    $("#nome").val(data.atiDescricao);
                    $("#tipoopc").val(data.atiTipoID);
                    console.log(data.atiStsQuestoes);
                    if (data.atiStatus == "Pública") {
                        $("#status").val(2);
                        $("#status").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Pública");
                    } else {
                        $("#status").val(1);
                        $("#status").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Privada");
                    }

                    if (data.atiStsQuestoes == "Na ordem") {
                        $("#StsQuestoes").val(2);
                        $("#StsQuestoes").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Na ordem");
                    } else {
                        $("#StsQuestoes").val(1);
                        $("#StsQuestoes").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Aleatoria");
                    }
                    $("#tipoopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(dados[5]);
                    $("#classe").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(dados[7]);

                }
            }
        })
    });




    //! Esconder/mostrar cadastrar atividade
    $("#btn-nova-atividade").click(function () {

        $("#cardTableTitle").toggle("slow")
        $("#cardTitle").text("Cadastrar Atividade");
        $("#cardDesc").text("Informe os dados da atividade a ser cadastrada.");
        $("#cadastrarAtividade span").text(" Cadastrar");

        toggleNovaAtividade()
        $('#nome, #data-final, #data-inicial, #descricao').val("");
        $("#tipoopc").val(1);
        $("#status").val(1);
        $("#classe").val(1);

        if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
            $('#tableQuestoesAtividade').DataTable().destroy();
            tableEscolhidas = $('#tableQuestoesAtividade').DataTable({
                destroy: true,
                responsive: true,
                "columnDefs": [
                    {
                        "targets": [1],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        orderable: false,
                        targets: [3]
                    }
                ],
                ajax: {
                    "url": "../backend/BackAtividade/atividadeBack.php",
                    "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                    "data": { buscaInicialNada: buscaInicialNada }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                    "dataSrc": ""
                },
                language: { // tradução em portgues da tabela
                    url: "../partials/dataTablept-br.json"
                },
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
                columns: [

                    { data: 'atiqOrdemQuestao' },
                    { data: 'queID' },
                    {
                        data: null, render: function (data, type, row) {
                            let descricao = data.queDescricao.slice(0, 200);
                            let tamanho = descricao.length;
                            if (tamanho >= 200) {
                                descricao = descricao + "..."
                            }

                            return `<span style=" max-width: 500px;
                            min-width: 200px;
                            display: block;
                            overflow-wrap: break-word;
                            white-space: break-spaces;">${descricao}</span>`;

                        }
                    },
                    {
                        data: null, render: function (data, type, row) {


                            return ` <input type="number" min="0" style="padding: 0.4rem 0.4rem;" class="form-control" value="${data.atiqPontuacao}" />`;

                        }
                    },
                    { data: 'subDescricao' },
                    { data: 'queCodigoBncc' },
                    { data: 'queStsTipo' },
                    { data: 'nivDescricao' },
                    {
                        data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                            return `
                        <button type="button"
                            class="btn btn-inverse-danger btn-rounded btn-icon btn-del-questaoEscolhida">
                            <i class="bi bi-trash"></i>
                        </button>`;
                        }
                    },
                ], rowReorder: {
                    dataSrc: 'atiqOrdemQuestao'
                },


            })
        }

        novaAtividade = true;
    });
    $("#cancelarAtividade").click(function () {
        $("#cardTableTitle").toggle("slow");
        toggleNovaAtividade()
        $('#nome, #data-final, #data-inicial, #descricao').val("");

        $("#tipoopc").val(1);
        $("#status").val(1);
        $("#classe").val(1);

        novaAtividade = false;
    })

    //!  BOTÃO DE ESCOLHER AS QUESTÕES
    $("#btn-modal-escolher").on("click", function () {

        $('#modalQuestao').modal('show');

        arr_questoes = "";
        Selecionadas = "";

        if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
            questoesID = tableEscolhidas.columns(1).data().eq(0).sort()

            if (questoesID.length > 0) {

                if ($.fn.dataTable.isDataTable('#tableEscolherQuestoes')) {
                    $('#tableEscolherQuestoes').DataTable().destroy();
                }

                arr_questoes = questoesID.join(',');
                console.log(arr_questoes);

                //? Tabela de escolher questões DO MODAL
                tableEscolher = $('#tableEscolherQuestoes').DataTable({
                    responsive: true,
                    destroy: true,
                    "select": {
                        "style": 'multi'
                    },
                    "columnDefs": [
                        {
                            'targets': 0,
                            'checkboxes': {
                                'selectRow': true
                            },
                            "orderable": false,
                        }
                    ],
                    ajax: {
                        "url": "../backend/BackAtividade/atividadeBack.php",
                        "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                        "data": { arr_questoes: arr_questoes, buscaInicialEscolher: buscaInicialEscolher }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
                        "dataSrc": ""
                    },
                    language: { // tradução em portgues da tabela
                        url: "../partials/dataTablept-br.json"
                    },
                    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
                    columns: [
                        { data: 'queID' },
                        { data: 'queID' },
                        {
                            data: null, render: function (data, type, row) {
                                let descricao = data.queDescricao.slice(0, 200);
                                let tamanho = descricao.length;
                                if (tamanho >= 200) {
                                    descricao = descricao + "..."
                                }

                                return `<span style=" max-width: 500px;
                                min-width: 200px;
                                display: block;
                                overflow-wrap: break-word;
                                white-space: break-spaces;">${descricao}</span>`;

                            }
                        },
                        { data: 'subDescricao' },
                        { data: 'queCodigoBncc' },
                        { data: 'nivDescricao' },
                        { data: 'queStsTipo' },

                    ]


                })

            } else if (cadastrarAtividade = true) {
                criarNovaTabelaQuestoes();
            }
        } else {
            criarNovaTabelaQuestoes();
        }
    });



    //! BOTAO DE ADICIONAR QUESTAO DIRETO EM ATIVIDADES
    $("#adicionarQuestoes").click(function () {
        $("#tableQuestoesSelecionadas").toggle("slow");
        $("#cadastrarQuestao").toggle("slow");
        $("#botoesAtividade").toggle();

    })


    //! Modal Excluir Atividade
    $("#tbodyAtivdades").on("click", ".btn-excluir-atividade", function () {
        $('#modalDelete').modal('show');
        let dadosAtividade = $(this).closest('tr').children("td").map(function () { // função .map é utilizado para pegar todos os dados contidos na linha onde o botão editar foi pressionado, como ID, DESCRICAO E ETC.
            return $(this).text();
        }).get();

        opDelete = "delete"
        opidDelete = dadosAtividade[0];
    });


    $('#formDelete').submit(function (e) {
        e.preventDefault();
        console.log(opDelete);
        console.log(opidDelete);
        $.ajax({
            url: '../backend/BackAtividade/atividadeBack.php',
            method: 'POST',
            data: {
                opID: opidDelete,
                opAtividade: opDelete,
                //queIDdelete: arrayDelete
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
                } else if (data.type == 'validacao') {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }, error: function (data) {
                alert("erro")
            }
        }).done(function (data) {
            $("#modalDelete").modal('hide');
            tableAtividade.ajax.reload(null, false);
        })
    })



    //! modal Cancelar Exclusão Atividade
    $("#modalCancelarAtividade").click(function () {
        $('#modalDelete').modal('hide')
    })

    $("#btn-modalCancelarQuestao").click(function () {
        $('#modalQuestao').modal('hide')
    });
    //! Modal informação
    $(".btn-info-questao").on("click", function () {
        $('#modalInfoAtividade').modal('show')
    });
    $("#modalCancelar").click(function () {
        $('#modalDelete').modal('hide')
    })
    //!

    $('#tableQuestoesAtividade tbody').on('click', '.btn-del-questaoEscolhida', function () {
        tableEscolhidas
            .row($(this).parents('tr'))
            .remove()
            .draw();

        tableEscolhidas.on('order.dt search.dt', function () {
            tableEscolhidas.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

    });




    function criarNovaTabelaQuestoes() {
        if ($.fn.dataTable.isDataTable('#tableEscolherQuestoes')) {
            $('#tableEscolherQuestoes').DataTable().destroy();
        }
        tableEscolher = $('#tableEscolherQuestoes').DataTable({
            responsive: true,
            destroy: true,
            "select": {
                "style": 'multi'
            },
            "columnDefs": [

                {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    },
                    "orderable": false,
                }
            ],
            ajax: {
                "url": "../backend/BackAtividade/atividadeBack.php",
                "method": 'POST',
                "data": { buscaInicialQuestao: buscaInicialQuestao },
                "dataSrc": ""
            },
            language: { // tradução em portgues da tabela
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
            columns: [
                { data: 'queID' },
                { data: 'queID' },
                {
                    data: null, render: function (data, type, row) {
                        let descricao = data.queDescricao.slice(0, 200);
                        let tamanho = descricao.length;
                        if (tamanho >= 200) {
                            descricao = descricao + "..."
                        }

                        return `<span style=" max-width: 500px;
                        min-width: 200px;
                        display: block;
                        overflow-wrap: break-word;
                        white-space: break-spaces;">${descricao}</span>`;

                    }
                },
                { data: 'subDescricao' },
                { data: 'queCodigoBncc' },
                { data: 'nivDescricao' },
                { data: 'queStsTipo' },

            ]


        })
    }


    //! ************************************************************************************************************************************************************

    $('#enunciadoQuestao').on('click', '.form-check-label input:checkbox', function () {
        $('.form-check-label input:checkbox').not(this).prop('checked', false);

    });
    $("#btn-voltar-verAtividade").click(function () {
        $("#verAtividade").toggle("slow")
        $("#crudAtividade").toggle("slow");
    })


    $("#tbodyAtivdades").on("click", ".btn-ver-atividade", function () {
        let idAtividade = $(this).closest('tr').children("td").map(function () { // função .map é utilizado para pegar todos os dados contidos na linha onde o botão editar foi pressionado, como ID, DESCRICAO E ETC.
            return $(this).text();
        }).get();

        $("#crudAtividade").toggle("slow")
        $("#verAtividade").fadeToggle("slow");

        console.log(idAtividade[0])
        $.ajax({
            url: '../backend/backAtividade/atividadeBack.php',
            method: 'POST',
            data: { atiIDResultados: idAtividade[0] },
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
                } else if (data.type == 'buscaVazia') {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    $("#enunciadoQuestao").html("")
                    let flag = 1;
                    let questao
                    let questaoFinal = ` 
                                         </ul>
                                        </div>`;
                    let hr = " <hr/>"
                    let respostaCorreta = [];

                    for (let i = 0; i < data.length; i++) {

                        let stsCorreta = "";


                        if (flag != data[i].atiqOrdemQuestao) {

                            questao = questao.concat(questaoFinal);
                            if (respostaCorreta != "") {
                                questao = questao.concat(`<h5 class="font-weight-bold text-success">Resposta correta: ${respostaCorreta}</h5>`);
                                questao = questao.concat(hr);
                            } else {
                                questao = questao.concat(hr);
                            }

                            $("#enunciadoQuestao").append(questao);
                            questao = ``;
                            respostaCorreta = [];


                        }


                        if (data[i].altStsCorreta == "Correta") {

                            if (0 in respostaCorreta) {
                                respostaCorreta.push(` ${data[i].altLetra})`);
                            } else {
                                respostaCorreta.push(`${data[i].altLetra})`);
                            }
                        }

                        if (data[i].altLetra == "A") {
                            questao = `  <h4 class="text-primary font-weight-bold">Questão ${data[i].atiqOrdemQuestao}</h4>
                                            <p class="display-5 pt-2">${data[i].queDescricao}</p>
                                            <div class="list-wrapper pt-1" id="questao${data[i].atiqOrdemQuestao}" style="overflow: auto;">
                                                <ul>
                                                `;
                            let alternativa = ` <li>
                                                    <div class="form-check form-check-flat">
                                                        <label class="form-check-label  font-weight-bold ">
                                                            <input class="checkbox" id="${data[i].atiqOrdemQuestao}${data[i].altLetra}" ${stsCorreta}  type="checkbox">
                                                        ${data[i].altLetra}) ${data[i].altDescricao}
                                                        <i class="input-helper"></i></label>
                                                    </div>
                                                </li>`;
                            questao = questao.concat(alternativa);
                        } else if (data[i].altLetra != "A") {

                            let alternativa = ` <li>
                                                    <div class="form-check form-check-flat">
                                                        <label class="form-check-label  font-weight-bold ">
                                                            <input class="checkbox" id="${data[i].atiqOrdemQuestao}${data[i].altLetra}" ${stsCorreta}  type="checkbox">
                                                        ${data[i].altLetra}) ${data[i].altDescricao}
                                                        <i class="input-helper"></i></label>
                                                    </div>
                                                </li>`;
                            questao = questao.concat(alternativa);
                        }

                        flag = data[i].atiqOrdemQuestao

                        if (data[i + 1] == undefined) {
                            questao = questao.concat(questaoFinal);
                            if (respostaCorreta != "") {
                                questao = questao.concat(`<h5 class="font-weight-bold text-success">Resposta correta: ${respostaCorreta}</h5>`);
                                questao = questao.concat(hr);
                            } else {
                                questao = questao.concat(hr);
                            }

                            $("#enunciadoQuestao").append(questao);
                            questao = ``;
                            respostaCorreta = [];
                        }
                    }



                }


            },
            error: function (data) {

                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Ocorreu um erro ao montar a atividade para mostrar!",
                    showConfirmButton: false,
                    timer: 3000
                })

            },
        }).done(function (data) {


            $("#tituloAtividade").html(` <h4 style="text-transform: none;" class="card-title">Atividade: <span class="text-primary">${nomeAluno}</span><small class="text-primary" id="classe"><strong> - ${dadosAluno[4]} </strong></small></h4>`);

        });

    });

    //! ************************************************************************************************************************************************************
    function toggleNovaAtividade() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;
        if ($('#cadastrarAtividade').css('display') == 'none') {
            $("#btn-nova-atividade").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableAtividadesToggle").toggle("slow");
        } else {
            $("#btn-nova-atividade").text('Nova Atividade').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableAtividadesToggle").toggle("slow");
        }
        $("#cadastrarAtividade").toggle("slow");
    }
    function format2(d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="width:100%;">' +
            '<tr class="expanded-row">' +
            '<td colspan="8" class="row-bg"><div><div class="d-flex justify-content-between"><div class="cell-hilighted"><div class="d-flex mb-2"><div class="mr-2 min-width-cell"><p>Policy start date</p><h6>25/04/2020</h6></div><div class="min-width-cell"><p>Policy end date</p><h6>24/04/2021</h6></div></div><div class="d-flex"><div class="mr-2 min-width-cell"><p>Sum insured</p><h5>$26,000</h5></div><div class="min-width-cell"><p>Premium</p><h5>$1200</h5></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Quote no.</p><h6>Incs234</h6></div><div class="mr-2"><p>Vehicle Reg. No.</p><h6>KL-65-A-7004</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Policy number</p><h6>Incsq123456</h6></div><div class="mr-2"><p>Policy number</p><h6>Incsq123456</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-3 d-flex"><div class="highlighted-alpha"> A</div><div><p>Agent / Broker</p><h6>Abcd Enterprices</h6></div></div><div class="mr-2 d-flex"> <img src="../../images/faces/face5.jpg" alt="profile"/><div><p>Policy holder Name & ID Number</p><h6>Phillip Harris / 1234567</h6></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Branch</p><h6>Koramangala, Bangalore</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Channel</p><h6>Online</h6></div></div></div></div></td>'
        '</tr>' +
            '</table>';
    }
    function format3(d) {
        let exibQuestao = "";
        let exibAlt = "";
        let exibResp = "";
        let navegQuestao = "";
        let continuar = "";

        d.atiStsQuestoes == "Randômica" ? exibQuestao = "bi bi-shuffle" : exibQuestao = "bi bi-sort-alpha-down";
        d.atiStsAlternativas == "Randômica" ? exibAlt = "bi bi-shuffle" : exibAlt = "bi bi-sort-alpha-down";
        d.atiStsRespostas == "Final da Atividade" ? exibResp = "bi bi-box-arrow-right" : exibResp = "bi bi-box-arrow-left";
        d.atiStsNavegacao == "Sim" ? navegQuestao = "bi bi-hand-thumbs-up" : navegQuestao = "bi bi-hand-thumbs-down";
        d.atiStsReinicio == "Sim" ? continuar = "bi bi-hand-thumbs-up" : continuar = "bi bi-hand-thumbs-down";

        return `<table cellpadding="5" cellspacing="0" border="0" style="width:100%;">
            <tr class="expanded-row">
                <td colspan="8" class="row-bg">
                    <div>
                        <div class="d-flex justify-content-between">

                            <div class="expanded-table-normal-cell">
                                <div class="mr-2">
                                    <h6>Exibição das questões</h6>
                                    <div class="media">
                                        <i class="${exibQuestao} icon-sm text-info d-flex align-self-center mr-3"></i>
                                        <div class="media-body">
                                            <p class="card-text" style="font-size: 0.875rem;">Final da ativiade</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="expanded-table-normal-cell">
                                <div class="mr-2">
                                <h6>Exibição das alternativas</h6>
                                <div class="media">
                                    <i class="${exibAlt} icon-sm text-info d-flex align-self-center mr-3"></i>
                                    <div class="media-body">
                                        <p class="card-text" style="font-size: 0.875rem;">Final da ativiade</p>
                                    </div>
                                </div>
                                </div>

                            </div>

                            <div class="expanded-table-normal-cell">
                                <div class="mr-2">
                                <h6>Exibição das respostas</h6>
                                <div class="media">
                                    <i class="${exibResp} icon-sm text-info d-flex align-self-center mr-3"></i>
                                    <div class="media-body">
                                        <p class="card-text" style="font-size: 0.875rem;">Final da ativiade</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="expanded-table-normal-cell">
                                <div class="mr-2">
                                <h6>Navegar entre questões</h6>
                                <div class="media">
                                    <i class="${navegQuestao} icon-sm text-info d-flex align-self-center mr-3"></i>
                                    <div class="media-body">
                                        <p class="card-text" style="font-size: 0.875rem;">Final da ativiade</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="expanded-table-normal-cell">
                                <div class="mr-2">
                                <h6>Continuar atividade de onde parou</h6>
                                <div class="media">
                                    <i class="${continuar} icon-sm text-info d-flex align-self-center mr-3"></i>
                                    <div class="media-body">
                                        <p class="card-text" style="font-size: 0.875rem;">Final da ativiade</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>`
    }

    $('#tbodyAtivdades').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tableAtividade.row(tr);


        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();

            tr.removeClass('shown');
        } else {

            $.ajax({
                url: '../backend/BackAtividade/atividadeBack.php',
                method: 'POST',
                data: {
                    detailControlID: row.data().atiID,
                },
                dataType: 'json',
                success: function (data) {

                    // Open this row
                    // row.child(format3(data)).show();

                    tr.addClass('shown');

                }, error: function (data) {
                    alert("erro")
                }
            }).done(function (data) {

            });


        }
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

    // $('#tableQuestoesAtividade').on('row-reorder', function (e, diff, edit) {
    //     var result = 'Reorder started on row: ' + edit.triggerRow.data()[1] + '<br>';

    //     for (var i = 0, ien = diff.length; i < ien; i++) {
    //         var rowData = tableEscolhidas.row(diff[i].node).data();

    //         result += rowData[1] + ' updated to be in position ' +
    //             diff[i].newData + ' (was ' + diff[i].oldData + ')<br>';
    //     }
    //     console.log(result)
    // });
    $('#tableQuestoesAtividade').on('row-reorder.dt', function (dragEvent, data, nodes) {
        console.log('row #' +
            data[0].node._DT_RowIndex +
            ' moved from pos ' +
            data[0].oldPosition +
            ' to pos ' +
            data[0].newPosition + "\n" +
            'row #' +
            data[1].node._DT_RowIndex +
            ' changed position from ' +
            data[1].oldPosition +
            ' to ' +
            data[1].newPosition
        );

    });

});