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
        var dateToday = new Date();

        $("#data-inicial,#data-final").datetimepicker({
            mask: true,
            step: 30,
            format: 'd/m/Y H:i',
            minDate: dateToday,
        })

        $.datetimepicker.setLocale('pt-BR');
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
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
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
                    data: null, render: function (data, type, row) {
                        let dataini = data.atiDataInicio.slice(0, 10);
                        let horaini = data.atiDataInicio.slice(11, 16);
                        dataini = dataini.split('-').reverse().join('/');
                        return `<span style="padding-bottom:5px">${dataini}</span><br><br><span>${horaini}</span>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        let datafim = data.atiDataFim.slice(0, 10);
                        let horafim = data.atiDataFim.slice(11, 16);
                        datafim = datafim.split('-').reverse().join('/');
                        return `<span style="padding-bottom:5px">${datafim}</span><br><br><span>${horafim}</span>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.tipDescricao == "Trabalho") {
                            return `<label class="badge badge-primary" >${data.tipDescricao}</label>`;
                        } else if (data.tipDescricao == "Fórum") {
                            return `<label class="badge badge-info" style="background-color: #435ee3">${data.tipDescricao}</label>`;
                        } else if (data.tipDescricao == "Redação") {
                            return `<label class="badge badge-info">${data.tipDescricao}</label>`;
                        } else {
                            return `<label class="badge badge-info" style="background-color: #98BDFF">${data.tipDescricao}</label>`;
                        }
                    }
                },

                {
                    data: null, render: function (data, type, row) {
                        if (data.atiStatus == "Pública") {
                            return `<label class="badge badge-info">${data.atiStatus}</label>`;
                        } else {
                            return `<label class="badge badge-warning">${data.atiStatus}</label>`;
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
                        </button> `;
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

        $('#cover-spin').show();
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
                                return ` <input type="text"  style="padding: 0.4rem 0.4rem;" class="form-control inputnota" value="${data.atiqPontuacao}" />`;
                            }
                        },
                        {
                            data: null, render: function (data, type, row) {
                                //let descricao = data.quePalavrasChave.slice(0, 50);
                                return `<span style=" max-width: 200px;
                                min-width: 100px;
                                display: block;
                                overflow-wrap: break-word;
                                white-space: break-spaces;">${data.subDescricao}</span>`;

                            }
                        },
                        { data: 'queCodigoBncc' },
                        {
                            data: null, render: function (data, type, row) {
                                if (data.queStsTipo == "Publica" || data.queStsTipo == "Pública") {
                                    return `<label class="badge badge-info">${data.queStsTipo}</label>`;
                                } else if (data.queStsTipo == "Privada professor") {
                                    return `<label class="badge badge-primary">${data.queStsTipo}</label>`;
                                } else if (data.queStsTipo == "Privada escola") {
                                    return `<label class="badge badge-info" style="background-color: #435ee3">${data.queStsTipo}</label>`;
                                } else {
                                    return `<label class="badge badge-info" style="background-color: #98BDFF">${data.queStsTipo}</label>`;
                                }
                            }
                        },
                        {
                            data: null, render: function (data, type, row) {
                                if (data.nivDescricao == "Fácil") {
                                    return `<label class="badge badge-success">${data.nivDescricao}</label>`;
                                } else if (data.nivDescricao == "Intermediário") {
                                    return `<label class="badge badge-warning">${data.nivDescricao}</label>`;
                                } else {
                                    return `<label class="badge badge-danger">${data.nivDescricao}</label>`;
                                }
                            }
                        },
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
                setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 500);
            });
        }
        $('#modalQuestao').modal('hide');

    })

    $(document).on('keyup', '.inputnota', function (e) {
        let lastValid = $(".inputnota").val();
        var validNumber = new RegExp(/^\d*\.?\d*$/);
        var newValue = $(this).val();
        if (validNumber.test(newValue)) {
            lastValid = newValue;
        } else { $(this).val(lastValid); }

    });

    //? Formulario de Cadastro de Atividade
    $('#formAtividades').submit(function (e) {
        $('#cover-spin').show();
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



        var dataFormInicial = "";
        var dataFormFinal = "";
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

        let dataini = dataInicial.slice(0, 10);
        let horaini = dataInicial.slice(11, 19);
        let datafim = dataFinal.slice(0, 10);
        let horafim = dataFinal.slice(11, 19)

        dataini = formatarData(dataini) + " ";
        datafim = formatarData(datafim) + " ";
        dataFormInicial = dataFormInicial.concat(dataini, horaini)
        dataFormFinal = dataFormFinal.concat(datafim, horafim)


        if (questoesID.length == 0) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Por favor, selecione as Questões",
                showConfirmButton: false,
                timer: 2000
            })

        } else {

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
                    StsQuestoes: stsQuestoes,
                    stsReinicio: stsReinicio,
                    stsNavegacao: stsNavegacao,
                    stsRespostas: stsRespostas,
                    stsAlternativas: stsAlternativas,
                },
                dataType: 'json',
                success: function (data) {
                    setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 200);

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
                    setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 500);
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
        $('#cover-spin').show();

        $("#cardTableTitle").toggle("slow");
        $("#cardTitle").text("Alterar de atividade");
        $("#cardDesc").text("Altere a atividade selecionada.");
        $("#btn-cadastrarAtividade span").text(" Salvar");
        toggleNovaAtividade()

        let dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        opId = dados[0];
        novaAtividade = false;
        opAtividade = "update";
        atualizar = "update2";


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

                        return `<span style=" max-width: 600px;
                        min-width: 300px;
                        display: block;
                        overflow-wrap: break-word;
                        white-space: break-spaces;">${descricao}</span>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        return ` <input type="text"  style="padding: 0.4rem 0.4rem;" class="form-control inputnota" value="${data.atiqPontuacao}" />`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        //let descricao = data.quePalavrasChave.slice(0, 50);
                        return `<span style=" max-width: 200px;
                        min-width: 100px;
                        display: block;
                        overflow-wrap: break-word;
                        white-space: break-spaces;">${data.subDescricao}</span>`;

                    }
                },
                { data: 'queCodigoBncc' },
                {
                    data: null, render: function (data, type, row) {
                        if (data.queStsTipo == "Publica" || data.queStsTipo == "Pública") {
                            return `<label class="badge badge-info">${data.queStsTipo}</label>`;
                        } else if (data.queStsTipo == "Privada professor") {
                            return `<label class="badge badge-primary">${data.queStsTipo}</label>`;
                        } else if (data.queStsTipo == "Privada escola") {
                            return `<label class="badge badge-info" style="background-color: #435ee3">${data.queStsTipo}</label>`;
                        } else {
                            return `<label class="badge badge-info" style="background-color: #98BDFF">${data.queStsTipo}</label>`;
                        }
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.nivDescricao == "Fácil") {
                            return `<label class="badge badge-success">${data.nivDescricao}</label>`;
                        } else if (data.nivDescricao == "Intermediário") {
                            return `<label class="badge badge-warning">${data.nivDescricao}</label>`;
                        } else {
                            return `<label class="badge badge-danger">${data.nivDescricao}</label>`;
                        }
                    }
                },
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
                    let stsAti;
                    let stsQue;
                    let stsAlt;
                    let stsResp;
                    let stsNave;
                    let stsReini;

                    data.atiStatus == "Pública" ? stsAti = 2 : stsAti = 1;
                    data.atiStsQuestoes == "Ordenada" ? stsQue = 2 : stsQue = 1;
                    data.atiStsAlternativas == "Ordenada" ? stsAlt = 2 : stsAlt = 1;
                    data.atiStsRespostas == "Final da Atividade" ? stsResp = 2 : stsResp = 1;
                    data.atiStsNavegacao == "Não" ? stsNave = 2 : stsNave = 1;
                    data.atiStsReinicio == "Não" ? stsReini = 2 : stsReini = 1;

                    let dataini = data.atiDataInicio.slice(0, 10);
                    let horaini = data.atiDataInicio.slice(11, 16);
                    let datafim = data.atiDataFim.slice(0, 10);
                    let horafim = data.atiDataFim.slice(11, 16);
                    let dataInicial = "";
                    let dataFinal = "";
                    dataini = dataini.split('-').reverse().join('/') + " ";
                    datafim = datafim.split('-').reverse().join('/') + " ";

                    dataInicial = dataInicial.concat(dataini, horaini)
                    dataFinal = dataFinal.concat(datafim, horafim)

                    $("#nome").val(data.atiDescricao);
                    $("#descricao").val(data.atiObservacao);
                    $("#data-inicial").val(dataInicial);
                    $("#data-final").val(dataFinal);

                    $("#tipoopc").val(data.atiTipoID);
                    $("#tipoopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(data.tipDescricao);

                    $("#classe").val(data.claCodigo);
                    $("#classe").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(data.claNome);

                    $('#status').val(stsAti);
                    $("#status").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(data.atiStatus);

                    $("#stsQuestoes").val(stsQue);
                    $("#stsQuestoes").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(data.atiStsQuestoes);

                    $("#stsAlternativas").val(stsAlt);
                    $("#stsAlternativas").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(data.atiStsAlternativas);

                    $("#stsRespostas").val(stsResp);
                    $("#stsRespostas").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(data.atiStsRespostas);


                    $("#stsNavegacao").val(stsNave);
                    $("#stsNavegacao").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(data.atiStsNavegacao);

                    $("#stsReinicio").val(stsReini);
                    $("#stsReinicio").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(data.atiStsReinicio);

                }
            }
        }).done(function (e) {
            setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 500);
        })
    });




    //! Esconder/mostrar cadastrar atividade
    $("#btn-nova-atividade").click(function () {


        $("#cardTableTitle").toggle("slow")
        $("#cardTitle").text("Cadastrar Atividade");
        $("#cardDesc").text("Informe os dados da atividade a ser cadastrada.");
        $("#btn-cadastrarAtividade span").text(" Cadastrar");

        toggleNovaAtividade()

        $('#formAtividades')[0].reset();

        $("#tipoopc").val(1).selectpicker("refresh");
        $("#classe").val(1).selectpicker("refresh");
        $('#status').val(1).selectpicker("refresh");
        $("#stsQuestoes").val(1).selectpicker("refresh");
        $("#stsAlternativas").val(1).selectpicker("refresh");
        $("#stsRespostas").val(1).selectpicker("refresh");
        $("#stsNavegacao").val(1).selectpicker("refresh");
        $("#stsReinicio").val(1).selectpicker("refresh");

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

                            return `<span style=" max-width: 600px;
                            min-width: 300px;
                            display: block;
                            overflow-wrap: break-word;
                            white-space: break-spaces;">${descricao}</span>`;
                        }
                    },
                    {
                        data: null, render: function (data, type, row) {
                            return ` <input type="text"  style="padding: 0.4rem 0.4rem;" class="form-control inputnota" value="${data.atiqPontuacao}" />`;
                        }
                    },
                    {
                        data: null, render: function (data, type, row) {
                            //let descricao = data.quePalavrasChave.slice(0, 50);
                            return `<span style=" max-width: 200px;
                            min-width: 100px;
                            display: block;
                            overflow-wrap: break-word;
                            white-space: break-spaces;">${data.subDescricao}</span>`;

                        }
                    },
                    { data: 'queCodigoBncc' },
                    {
                        data: null, render: function (data, type, row) {
                            if (data.queStsTipo == "Publica" || data.queStsTipo == "Pública") {
                                return `<label class="badge badge-info">${data.queStsTipo}</label>`;
                            } else if (data.queStsTipo == "Privada professor") {
                                return `<label class="badge badge-primary">${data.queStsTipo}</label>`;
                            } else if (data.queStsTipo == "Privada escola") {
                                return `<label class="badge badge-info" style="background-color: #435ee3">${data.queStsTipo}</label>`;
                            } else {
                                return `<label class="badge badge-info" style="background-color: #98BDFF">${data.queStsTipo}</label>`;
                            }
                        }
                    },
                    {
                        data: null, render: function (data, type, row) {
                            if (data.nivDescricao == "Fácil") {
                                return `<label class="badge badge-success">${data.nivDescricao}</label>`;
                            } else if (data.nivDescricao == "Intermediário") {
                                return `<label class="badge badge-warning">${data.nivDescricao}</label>`;
                            } else {
                                return `<label class="badge badge-danger">${data.nivDescricao}</label>`;
                            }
                        }
                    },
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
        novaAtividade = false;

    })
    $("#modalQuestao").on('show.bs.modal', function () {
        $('#cover-spin').show();
    });
    //!  BOTÃO DE ESCOLHER AS QUESTÕES
    $('#modalQuestao').on('shown.bs.modal', function () {

        function tableModal() {
            arr_questoes = "";
            Selecionadas = "";

            if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
                questoesID = tableEscolhidas.columns(1).data().eq(0).sort()
                if (questoesID.length > 0) {
                    // showSpinner();
                    if ($.fn.dataTable.isDataTable('#tableEscolherQuestoes')) {
                        $('#tableEscolherQuestoes').DataTable().destroy();
                    }
                    arr_questoes = questoesID.join(',');
                    console.log(arr_questoes);

                    //? Tabela de escolher questões DO MODAL
                    tableEscolher = $('#tableEscolherQuestoes').DataTable({
                        responsive: true,
                        searchPanes: {
                            viewTotal: true,
                            initCollapsed: true
                        },
                        dom: 'Plfrtip',
                        language: {
                            searchPanes: {
                                count: '{total} found',
                                countFiltered: '{shown} / {total}',
                            }
                        },
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
                        "lengthChange": false,
                        // lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
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

                                    return `<span style=" max-width: 600px;
                                    min-width: 500px;
                                    display: block;
                                    overflow-wrap: break-word;
                                    white-space: break-spaces;">${descricao}</span>`;

                                }
                            },
                            {
                                data: null, render: function (data, type, row) {
                                    //let descricao = data.quePalavrasChave.slice(0, 50);
                                    return `<span style=" max-width: 200px;
                                    min-width: 100px;
                                    display: block;
                                    overflow-wrap: break-word;
                                    white-space: break-spaces;">${data.subDescricao}</span>`;

                                }
                            },
                            { data: 'queCodigoBncc' },
                            {
                                data: null, render: function (data, type, row) {
                                    let descricao;
                                    if (data.anoDescricao == "Ensino Fundamental") {
                                        descricao = data.anoDescricao.slice(0, 11);
                                        descricao = descricao + ".";
                                    } else if (data.anoDescricao == "Ensino Médio") {
                                        descricao = data.anoDescricao.slice(0, 10);
                                        descricao = descricao + ".";
                                    }

                                    return `<span>${descricao} - ${data.anoEtapa}</span>`
                                }
                            },
                            {
                                data: null, render: function (data, type, row) {
                                    if (data.nivDescricao == "Fácil") {
                                        return `<label class="badge badge-success">${data.nivDescricao}</label>`;
                                    } else if (data.nivDescricao == "Intermediário") {
                                        return `<label class="badge badge-warning">${data.nivDescricao}</label>`;
                                    } else {
                                        return `<label class="badge badge-danger">${data.nivDescricao}</label>`;
                                    }
                                }
                            },
                            {
                                data: null, render: function (data, type, row) {
                                    if (data.queStsTipo == "Publica" || data.queStsTipo == "Pública") {
                                        return `<label class="badge badge-info">${data.queStsTipo}</label>`;
                                    } else if (data.queStsTipo == "Privada professor") {
                                        return `<label class="badge badge-primary">${data.queStsTipo}</label>`;
                                    } else if (data.queStsTipo == "Privada escola") {
                                        return `<label class="badge badge-info" style="background-color: #435ee3">${data.queStsTipo}</label>`;
                                    } else {
                                        return `<label class="badge badge-info" style="background-color: #98BDFF">${data.queStsTipo}</label>`;
                                    }
                                }
                            },

                        ], initComplete: function () {
                            this.api().columns.adjust();

                        }
                    })
                } else if (cadastrarAtividade = true) {

                    criarNovaTabelaQuestoes();
                }
            } else {

                criarNovaTabelaQuestoes();
            }
        }

        $.when(tableModal()).then(function () {
            // hideSpinner()
            setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 500);

        })
    })
    function hideSpinner() {
        document.getElementById('spinner')
            .style.display = 'none';
    }
    function showSpinner() {
        document.getElementById('spinner')
            .style.display = 'initial';
    }
    // $("#btn-modal-escolher").on("click", function () {

    //     $('#modalQuestao').modal('show')

    //     setTimeout(function () {


    //     }, 1000);

    //     arr_questoes = "";
    //     Selecionadas = "";

    //     if ($.fn.dataTable.isDataTable('#tableQuestoesAtividade')) {
    //         questoesID = tableEscolhidas.columns(1).data().eq(0).sort()

    //         if (questoesID.length > 0) {

    //             if ($.fn.dataTable.isDataTable('#tableEscolherQuestoes')) {
    //                 $('#tableEscolherQuestoes').DataTable().destroy();
    //             }

    //             arr_questoes = questoesID.join(',');
    //             console.log(arr_questoes);

    //             //? Tabela de escolher questões DO MODAL
    //             tableEscolher = $('#tableEscolherQuestoes').DataTable({
    //                 responsive: true,
    //                 destroy: true,
    //                 "select": {
    //                     "style": 'multi'
    //                 },
    //                 "columnDefs": [
    //                     {
    //                         'targets': 0,
    //                         'checkboxes': {
    //                             'selectRow': true
    //                         },
    //                         "orderable": false,
    //                     }
    //                 ],
    //                 ajax: {
    //                     "url": "../backend/BackAtividade/atividadeBack.php",
    //                     "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
    //                     "data": { arr_questoes: arr_questoes, buscaInicialEscolher: buscaInicialEscolher }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atividadeBack.php sirva para buscar os dados da tabela
    //                     "dataSrc": ""
    //                 },
    //                 language: { // tradução em portgues da tabela
    //                     url: "../partials/dataTablept-br.json"
    //                 },
    //                 lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
    //                 columns: [
    //                     { data: 'queID' },
    //                     { data: 'queID' },
    //                     {
    //                         data: null, render: function (data, type, row) {
    //                             let descricao = data.queDescricao.slice(0, 200);
    //                             let tamanho = descricao.length;
    //                             if (tamanho >= 200) {
    //                                 descricao = descricao + "..."
    //                             }

    //                             return `<span style=" max-width: 600px;
    //                             min-width: 500px;
    //                             display: block;
    //                             overflow-wrap: break-word;
    //                             white-space: break-spaces;">${descricao}</span>`;

    //                         }
    //                     },
    //                     {
    //                         data: null, render: function (data, type, row) {
    //                             //let descricao = data.quePalavrasChave.slice(0, 50);
    //                             return `<span style=" max-width: 200px;
    //                             min-width: 100px;
    //                             display: block;
    //                             overflow-wrap: break-word;
    //                             white-space: break-spaces;">${data.subDescricao}</span>`;

    //                         }
    //                     },
    //                     { data: 'queCodigoBncc' },
    //                     {
    //                         data: null, render: function (data, type, row) {
    //                             let descricao;
    //                             if (data.anoDescricao == "Ensino Fundamental") {
    //                                 descricao = data.anoDescricao.slice(0, 11);
    //                                 descricao = descricao + ".";
    //                             } else if (data.anoDescricao == "Ensino Médio") {
    //                                 descricao = data.anoDescricao.slice(0, 10);
    //                                 descricao = descricao + ".";
    //                             }

    //                             return `<span>${descricao} - ${data.anoEtapa}</span>`
    //                         }
    //                     },
    //                     {
    //                         data: null, render: function (data, type, row) {
    //                             if (data.nivDescricao == "Fácil") {
    //                                 return `<label class="badge badge-success">${data.nivDescricao}</label>`;
    //                             } else if (data.nivDescricao == "Intermediário") {
    //                                 return `<label class="badge badge-warning">${data.nivDescricao}</label>`;
    //                             } else {
    //                                 return `<label class="badge badge-danger">${data.nivDescricao}</label>`;
    //                             }
    //                         }
    //                     },
    //                     {
    //                         data: null, render: function (data, type, row) {
    //                             if (data.queStsTipo == "Publica" || data.queStsTipo == "Pública") {
    //                                 return `<label class="badge badge-info">${data.queStsTipo}</label>`;
    //                             } else if (data.queStsTipo == "Privada professor") {
    //                                 return `<label class="badge badge-primary">${data.queStsTipo}</label>`;
    //                             } else if (data.queStsTipo == "Privada escola") {
    //                                 return `<label class="badge badge-info" style="background-color: #435ee3">${data.queStsTipo}</label>`;
    //                             } else {
    //                                 return `<label class="badge badge-info" style="background-color: #98BDFF">${data.queStsTipo}</label>`;
    //                             }
    //                         }
    //                     },

    //                 ], initComplete: function () {
    //                     this.api().columns.adjust()
    //                 }


    //             })

    //         } else if (cadastrarAtividade = true) {
    //             criarNovaTabelaQuestoes();
    //         }
    //     } else {
    //         criarNovaTabelaQuestoes();
    //     }



    //! BOTAO DE ADICIONAR QUESTAO DIRETO EM ATIVIDADES
    $("#adicionarQuestoes").click(function () {
        $("#tableQuestoesSelecionadas").toggle("slow");
        $("#cadastrarQuestao").toggle("slow");
        $("#botoesAtividade").toggle();

    })

    //! Modal Excluir Atividade
    $("#tbodyAtivdades").on("click", ".btn-excluir-atividade", function () {

        let dadosAtividade = $(this).closest('tr').children("td").map(function () { // função .map é utilizado para pegar todos os dados contidos na linha onde o botão editar foi pressionado, como ID, DESCRICAO E ETC.
            return $(this).text();
        }).get();
        opDelete = "delete"
        opidDelete = dadosAtividade[0];

        Swal.fire({
            title: 'Deseja excluir a atividade?',
            text: "Você não poderá reverter esta ação!",
            icon: 'question',
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#4B49AC',
            cancelButtonText: 'Não',
            confirmButtonText: 'Excluir!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '../backend/BackAtividade/atividadeBack.php',
                    method: 'POST',
                    data: {
                        opID: opidDelete,
                        opAtividade: opDelete,
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
                    tableAtividade.ajax.reload(null, false);
                })
            }
        })
    });



    //! modal Cancelar Exclusão Atividade
    $("#modalCancelarAtividade").click(function () {
        $('#modalDelete').modal('hide')
    })



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
            searchPanes: {
                viewTotal: true,
                initCollapsed: true,
                dtOpts: {
                    select: {
                        style: 'multi'
                    }
                }
            },
            dom: 'Plfrtip',
            language: {
                searchPanes: {
                    count: '{total} found',
                    countFiltered: '{shown} / {total}',

                }
            },
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
            "lengthChange": false,
            // lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
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
                {
                    data: null, render: function (data, type, row) {
                        //let descricao = data.quePalavrasChave.slice(0, 50);
                        return `<span style=" max-width: 200px;
                        min-width: 100px;
                        display: block;
                        overflow-wrap: break-word;
                        white-space: break-spaces;">${data.subDescricao}</span>`;

                    }
                },
                { data: 'queCodigoBncc' },
                {
                    data: null, render: function (data, type, row) {
                        let descricao;
                        if (data.anoDescricao == "Ensino Fundamental") {
                            descricao = data.anoDescricao.slice(0, 11);
                            descricao = descricao + ".";
                        } else if (data.anoDescricao == "Ensino Médio") {
                            descricao = data.anoDescricao.slice(0, 10);
                            descricao = descricao + ".";
                        }

                        return `<span>${descricao} - ${data.anoEtapa}</span>`
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.nivDescricao == "Fácil") {
                            return `<label class="badge badge-success">${data.nivDescricao}</label>`;
                        } else if (data.nivDescricao == "Intermediário") {
                            return `<label class="badge badge-warning">${data.nivDescricao}</label>`;
                        } else {
                            return `<label class="badge badge-danger">${data.nivDescricao}</label>`;
                        }
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.queStsTipo == "Publica" || data.queStsTipo == "Pública") {
                            return `<label class="badge badge-info">${data.queStsTipo}</label>`;
                        } else if (data.queStsTipo == "Privada professor") {
                            return `<label class="badge badge-primary">${data.queStsTipo}</label>`;
                        } else if (data.queStsTipo == "Privada escola") {
                            return `<label class="badge badge-info" style="background-color: #435ee3">${data.queStsTipo}</label>`;
                        } else {
                            return `<label class="badge badge-info" style="background-color: #98BDFF">${data.queStsTipo}</label>`;
                        }
                    }
                },

            ], initComplete: function () {
                this.api().columns.adjust();

            }


        })
    }

    //! ************************************************************************************************************************************************************

    // $('#enunciadoQuestao').on('click', '.form-check-label input:checkbox', function () {
    //     $('.form-check-label input:checkbox').not(this).prop('checked', false);

    // });
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
                            let pontos = "";
                            data[i].atiqPontuacao == 1 ? pontos = `${data[i].atiqPontuacao} Ponto` : pontos = `${data[i].atiqPontuacao} Pontos`;
                            questao = `  <h4 class="text-primary font-weight-bold">Questão ${data[i].atiqOrdemQuestao}<small class="text-primary" id="classe"><strong> - ${pontos}.</strong></small></h4>
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
            let dataini = idAtividade[3].slice(0, 10);
            let horaini = idAtividade[3].slice(10, 15);
            let datafim = idAtividade[4].slice(0, 10);
            let horafim = idAtividade[4].slice(10, 15);

            $("#tituloAtividade").html(` <h4 style="text-transform: none;" class="card-title">Atividade: <span class="text-primary">${idAtividade[1]}</span><small class="text-primary" id="classe"><strong> - <i class="bi bi-calendar-check"></i> ${dataini} <i class="bi bi-clock" style="padding-left: 0.3rem;padding-right: 0.3rem;"></i> ${horaini} • <i class="bi bi-calendar-x-fill" style="padding-left: 0.3rem"></i> ${datafim} <i class="bi bi-clock-fill" style="padding-left: 0.3rem"></i> ${horafim}</strong></small></h4>`);

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
                                            <p class="card-text" style="font-size: 0.875rem;">${d.atiStsQuestoes}</p>
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
                                        <p class="card-text" style="font-size: 0.875rem;">${d.atiStsAlternativas}</p>
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
                                        <p class="card-text" style="font-size: 0.875rem;">${d.atiStsRespostas}</p>
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
                                        <p class="card-text" style="font-size: 0.875rem;">${d.atiStsNavegacao}</p>
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
                                        <p class="card-text" style="font-size: 0.875rem;">${d.atiStsReinicio}</p>
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
                    row.child(format3(data)).show();
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
    // $('#tableQuestoesAtividade').on('row-reorder.dt', function (dragEvent, data, nodes) {
    //     console.log('row #' +
    //         data[0].node._DT_RowIndex +
    //         ' moved from pos ' +
    //         data[0].oldPosition +
    //         ' to pos ' +
    //         data[0].newPosition + "\n" +
    //         'row #' +
    //         data[1].node._DT_RowIndex +
    //         ' changed position from ' +
    //         data[1].oldPosition +
    //         ' to ' +
    //         data[1].newPosition
    //     );

    // });

});