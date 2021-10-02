$(document).ready(function () {
    let buscaInicialQuestao = true;
    init();

    function init() {
        i = 0;
        $("#cadastrarQuestao").hide();
        tabelaQuestoes = $('#tableQuestoes').DataTable({
            "columnDefs": [
                { "orderable": false, "targets": 9 }
            ],
            responsive: true,
            ajax: {
                "url": "../backend/questoesBack.php",
                "method": 'POST',
                "data": { buscaInicialQuestao: buscaInicialQuestao },
                "dataSrc": ""
            },
            language: {
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]],
            columns: [
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
                        white-space: break-spaces;">${data.quePalavrasChave}</span>`;

                    }
                },
                { data: 'subDescricao' },
                { data: 'queCodigoBncc' },
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
                { data: 'queAnoID' },
                {
                    data: null, render: function (data, type, row) {
                        if (data.queStsTipo == "Publica" || data.queStsTipo == "Pública") {
                            return `<label class="badge badge-info">${data.queStsTipo}</label>`;
                        } else {
                            return `<label class="badge badge-warning">${data.queStsTipo}</label>`;
                        }
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.queStsRevisao == "Sim") {
                            return `<label class="badge badge-success">${data.queStsRevisao}</label>`;
                        } else {
                            return `<label class="badge badge-danger">${data.queStsRevisao}</label>`;
                        }
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        return ` <button type="button"
                                    class="btn btn-inverse-primary btn-rounded btn-icon btn-info-questao" >
                                    <i class="bi bi-ui-checks" style="font-size: 20px;margin-left: -3px;"></i>
                                </button>
                                <button  type="button"
                                    class="btn  btn-inverse-success btn-rounded btn-icon btn-edit-questao">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button type="button"
                                    class="btn btn-inverse-danger btn-rounded btn-icon btn-del-questao">
                                    <i class="bi bi-trash"></i>
                                </button>`;
                    }
                },
            ]


        });

    }
    //! Formulário de cadastro de Questões
    $('#formQuestoes').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina
        var subgrupoopc = $('#subgrupoopc').val();
        var nivelopc = $('#nivelopc').val();
        var codigobncc = $("#codigobncc").val();
        var enunciado = $("#enunciado").val();
        var palavrasChave = $("#palavrasChave").val();
        var statusopc = $("#statusopc option:selected").text();

        var data = {
            subgrupoopc: subgrupoopc,
            nivelopc: nivelopc,
            codigobncc: codigobncc,
            statusopc: statusopc,
            enunciado: enunciado,
            palavrasChave: palavrasChave
        };
        $('li textarea').each(function () {

            let alternativa = $(this).attr("id"); //* Pega o id da alternativa
            let textoAlternativa = $(this).val();//* Pega o enuncado da alternativa
            let status = $(this).closest("div").children().children(".toggleAlternativa").text();//* Pega o status de Correta ou Incorreta da alternativa


            data[alternativa] = alternativa.slice(alternativa.length - 1) //? Insere um novo valor no objeto alternativaA : alternativaA

            alternativa = alternativa.concat("texto");//* Muda o nome alternativaA para alternativaAtexto
            data[alternativa] = textoAlternativa//? Insere um novo valor no objeto AlternativaAtexto : textoAlternativa

            alternativa = alternativa.replace("texto", "status");//* Muda o nome alternativaAtexto para alternativaAstatus
            data[alternativa] = status//? Insere um novo valor no objeto AlternativaAstatus : status
            // Object.assign(data, { keys[i]: alternativa });

        });

        $.ajax({
            url: '../backend/questoesBack.php',
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function (data) {

                alert("entrou success")
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

                    $("#btn-nova-questao").click();//Simula um click manual no botao de cadastrar
                } else if (data.type == 'validacao') {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            },
            error: function (data) {
                if (data.type == 'erro') {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })

                }
            },
        }).done(function (data) {
            alert("entroudone")
            tabelaQuestoes.ajax.reload(null, false);
        });

        return false;
    });

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

    //?  Modal info e cancelar
    $(".main-panel").on("click", ".btn-info-questao", function () {
        let dadosQuestao = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();


        $.ajax({
            url: '../backend/questoesBack.php',
            method: 'POST',
            data: {
                idQuestaoSelecionada: dadosQuestao[0]
            },
            dataType: 'json',
            success: function (data) {
                let count = data.length;
                $("#alternativasModal").html("");
                for (x = 0; x < count; x++) {

                    mostrarAlternativa(data[x].altLetra, data[x].altDescricao, data[x].altStsCorreta);
                }
            },
            error: function (data) {
                if (data.type == 'erro') {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })

                }
            },
        }).done(function (data) {
            $('#modalInfoQuestao').modal('show');
        });
        $('#modalInfoQuestao').modal('show');
    });

    //? Modal Alternativas cancelar
    $("#modalCancelarAlt").click(function () {
        $('#modalInfoQuestao').modal('hide')
    });

    //? Modal Excluir cancelar
    $("#modalCancelar").click(function () {
        $('#modalDelete').modal('hide');
        $("#idDeleteSelecionado,#tabelaSelecionad").val("");
    });

    //! Esconder/mostrar cadastrar questao
    $("#btn-nova-questao").click(function () {
        toggleNovaQuestao();
        resetarFormulario();

    });
    $("#cancelarQuestao").click(function () {
        toggleNovaQuestao();
        resetarFormulario();
    });
    //!
    //! Botão Correta ou Incorreta das alternativas
    $("#cadastrarQuestao").on("click", ".toggleAlternativa", function () {
        $(this).text() == "Incorreta" ? $(this).text("Correta").removeClass("btn-danger").addClass("btn-success") :
            $(this).text("Incorreta").removeClass("btn-success").addClass("btn-danger");

    });
    //!

    //! Botão de excluir questão
    $("#tbodyQuestao").on("click", ".btn-del-questao", function () {
        limparSelecionado();
        let dadosQuestao = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#idDeleteSelecionado").val(dadosQuestao[0])
        $("#tabelaSelecionada").val("questoes");
        $('#modalDelete').modal('show')

        $(this).closest('tr').addClass("selecionado");
    });

    //? Botao editar da tabela de questão
    $("#tbodyQuestao").on("click", ".btn-edit-questao", function () {


        let dados = $(this).closest('tr').children("td").map(function () { // função .map é utilizado para pegar todos os dados contidos na linha onde o botão editar foi pressionado, como ID, DESCRICAO E ETC.
            return $(this).text();
        }).get();

        // $("#queID").val(dados[0]);
        let id = dados[0];
        $.ajax({
            url: '../backend/questoesBack.php',
            method: 'POST',
            data: {
                idEditQuestao: id,
                opQuestao: "update"
            },
            dataType: 'json',
            success: function (data) {

                carregarFormulario(data.queID, data.queDescricao, data.queCodigoBncc, data.quePalavrasChave, data.queStsTipo, data.StsRevisao, data.subID, data.nivID, data.subDescricao, data.temDescricao, data.disDescricao, data.nivDescricao,)
                //preencher as alternativas
                for (let i = 0; i < data[0].length; i++) {
                    $("#adicionarQuestao").click();
                    // console.log(data[0][i].altID);
                    // console.log(data[0][i].altLetra);
                    // console.log(data[0][i].altDescricao);
                    // console.log(data[0][i].altStsCorreta);
                    // console.log(data[0][i].altQuestaoID);

                    if (data[0][i].altStsCorreta == "Correta") {
                        $('#alternativas li#' + i).find('.toggleAlternativa').click();
                    }
                    $('#alternativas li#' + i).find('#alternativa' + data[0][i].altLetra).text(data[0][i].altDescricao);


                }



                toggleNovaQuestao()
            }, error: function (data) {
                if (data.type == 'erro') {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })

                }
            },
        });
    })

    //! Botão de adicionar alternativas
    $(".form-group").on('click', "#adicionarQuestao", function () {
        letra = ["A)", "B)", "C)", "D)", "E)", "F)", "G)", "H)", "I)", "J)", "K)", "L)", "M)", "N)", "O)", "P)"];
        //A=0,B=1,C=2,D=3,E=4,F=5,G=6,H=7,I=8,J=9,K=10,L=11,M=12,N=13,O=14,P=15
        i < 0 ? $("#deletarQuestao").prop("disabled", true) : $("#deletarQuestao").prop("disabled", false);
        escolherSwitch(letra, i)
        i++;
    });
    //! Botão de remover alternativas
    $(".form-group").on('click', "#deletarQuestao", function () {
        $('#alternativas').each(function () {
            let index = $(this).find(".list-group-item").last().attr("id")
            i = parseInt(index);
            $(this).find(".list-group-item").last().remove();
        });
        i == 0 ? $("#deletarQuestao").prop("disabled", true) : $("#deletarQuestao").prop("disabled", false);
    });

    function escolherSwitch(letra, i) {
        switch (i) {
            case 0: {
                carregarAlternativa(letra[0], i)
            }
                break;
            case 1: {
                carregarAlternativa(letra[1], i)
            }
                break;
            case 2: {
                carregarAlternativa(letra[2], i);
            }
                break;
            case 3: {
                carregarAlternativa(letra[3], i);
            }
                break;
            case 4: {
                carregarAlternativa(letra[4], i);
            }
                break;
            case 5: {
                carregarAlternativa(letra[5], i);
            }
                break;
            case 6: {
                carregarAlternativa(letra[6], i);
            }
                break;
            case 7: {
                carregarAlternativa(letra[7], i);
            }
                break;
            case 8: {
                carregarAlternativa(letra[8], i);
            }
                break;
            case 9: {
                carregarAlternativa(letra[9], i);
            }
                break;
            case 10: {
                carregarAlternativa(letra[10], i);
            }
                break;
            case 11: {
                carregarAlternativa(letra[11], i);
            }
                break;
            case 12: {
                carregarAlternativa(letra[12], i);
            }
                break;
            case 13: {
                carregarAlternativa(letra[13], i);
            }
                break;
            case 14: {
                carregarAlternativa(letra[14], i);
            }
                break;
            case 15: {
                carregarAlternativa(letra[15], i);
            }
                break;
        }

        function carregarAlternativa(data, i) {
            let letra = data;
            let letraid = data;

            letraid = letraid.replace(')', '')

            let carregar = `    <li  id="${i}" class="list-group-item">
                                <div class="form-group">
                                <div class="input-group">               
                                    <div id="botao-alternativa" class="input-group-prepend">
                                        <button type="button" class="btn btn-danger toggleAlternativa">Incorreta</button>
                                    </div>
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-primary ">${letra}</span>
                                    </div>
                                    <textarea class="form-control" id="alternativa${letraid}" name="alternativa${letraid}"rows="3"></textarea>
                                </div>
                            </div>
                        </li>`

            $("#alternativas").append(carregar);
        }
    }
    //! Select de subgrupo
    $("#cadastrarQuestao").on("change", "#subgrupoopc", function () {
        let opSelecionada = $(this).val();
        $.ajax({
            url: '../backend/questoesBack.php',
            method: 'POST',
            data: {
                opSelecionada: opSelecionada,
            },
            dataType: 'json',
            success: function (data) {
                // let disciplina = `<label class="labelCadastroAtuacao">Temática</label>  <div id="disDescricaoSelected" class="btn btn-inverse-secondary btn-fw subgrupoSelected">${data.disDescricao}</div>`

                // let tematica = `<label class="labelCadastroAtuacao">Disciplina</label>  <div id="temDescricaoSelected" class="btn btn-inverse-secondary btn-fw subgrupoSelected">${data.temDescricao}</div>`

                // $("#temSelecionado").html(tematica);
                // $("#disSelecionado").html(disciplina);
                $("#temDescricaoSelected").text(data.temDescricao);
                $("#disDescricaoSelected").text(data.disDescricao);

                $("#temSelecionado,#disSelecionado").show();
            }

        })
    })

    function resetarFormulario() {
        $('#subgrupoopc').val(0);
        $("#nivelopc,#statusopc").val(1);
        $("#nivelopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Fácil");
        $("#statusopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Pública");
        $("#subgrupoopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text("Escolha");
        $("#temSelecionado,#disSelecionado").hide();

        $("#codigobncc,#enunciado,#palavrasChave,#disDescricaoSelected,#disDescricaoSelected").val("");

        let count = $('#alternativas li').length;

        for (let x = 0; x < count; x++) {
            $("#" + x).remove();
        }
        i = 0;
    }
    function carregarFormulario(queID, enunciado, codigoBncc, palavrasChave, stsTipo, StsRevisao, subID, nivID, subgrupo, tematica, disciplina, nivel) {

        let opcTipo = "";
        if (stsTipo == "Pública" || stsTipo == "Publica") {
            opcTipo = 1;
        } else if (stsTipo == "Privada professor") {
            opcTipo = 2;
        } else if (stsTipo == "Privada grupo") {
            opcTipo = 3;
        } else if (stsTipo == "Privada escola") {
            opcTipo = 4;
        }


        $("#queID").val(queID);
        $("#opQuestao").val("update");

        $('#subgrupoopc').val(subID);
        $("#nivelopc").val(nivID);
        $("#statusopc").val(opcTipo);
        $("#nivelopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(nivel);
        $("#statusopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(stsTipo);
        $("#subgrupoopc").closest(".dropdown").find(".btn").children().children(".filter-option-inner").children(".filter-option-inner-inner").text(subgrupo);
        $("#disDescricaoSelected").text(disciplina);
        $("#temDescricaoSelected").text(tematica);
        $("#temSelecionado,#disSelecionado").show();
        $("#codigobncc").val(codigoBncc);
        $("#enunciado").val(enunciado);
        $("#palavrasChave").val(palavrasChave);


    }
    function limparSelecionado() {
        $('#tableQuestoes tr').each(function () {
            if ($(this).hasClass("selecionado")) {
                $(this).removeClass("selecionado");
            }
        });
    }
    //? Modal excluir
    $('#formDelete').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina

        var idDeleteSelecionado = $('#idDeleteSelecionado').val();
        var tabelaSelecionada = $('#tabelaSelecionada').val();

        $.ajax({
            url: '../backend/questoesBack.php',
            method: 'POST',
            data: {
                idDeleteSelecionado: idDeleteSelecionado,
                tabelaSelecionada: tabelaSelecionada
            },
            dataType: 'json',
            success: function (data) {
                if (data.type == 'excluido') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    $("#modalCancelar").click();//Simula um click manual no botao de cadastrar
                    $('#tableDisciplinas tr').each(function () { // 
                        tableTematica.row(".selected").remove()
                    });
                    $('#tableTematica tr').each(function () {
                        tableTematica.row(".selected").remove()
                    });
                    $('#tableSubgrupo tr').each(function () {
                        tableTematica.row(".selected").remove()
                    });

                }
            }
        }).done(function (data) {
            atualizarTabelas();
        });
        return false;
    });

    function atualizarTabelas() {
        //* Get paging information
        var infoQue = tabelaQuestoes.page.info();
        //* Number of deleted rows
        var numDeletedQue = 1;
        //* Calculate number of pages after deleting rows
        var numPagesAfterQue = Math.ceil((infoQue.recordsDisplay - numDeletedQue) / infoQue.length);
        //* If number of pages after deleting rows is less than total number of pages
        //* and the last page is displayed
        if (numPagesAfterQue < infoQue.pages && infoQue.page === (infoQue.pages - 1)) {
            //* Go to previous page using zero-based index
            tabelaQuestoes.page(numPagesAfterQue - 1);
        }
        //* Reload table
        tabelaQuestoes.ajax.reload(null, false);

    }

    function mostrarAlternativa(letra, descricao, statuss) {

        let iconeCorreto = `<i class="bi bi-check-lg" style="position: absolute;color: #57b657;"></i>`;

        let alternativaCorpo1 = `  <div class="alternativaGroup">
                                <div class="list-group-item list-group-item-action flex-column align-items-start" style="padding-bottom: 0.5rem !important;padding-top: 0.5rem !important">
                                    <div class="wrapperAlternativa" style="display: flex">

                                    
                                    <h5 class="mb-1 letraAlternativa" style="padding-right: 0.5rem">${letra})</h5>
                                    <p class="mb-1 textoAlternativa">${descricao}</p>
                                    </div>
                                
                                </div>
                                <div style="border-bottom: 1px solid #e3e3e3"></div>
                            </div>`;
        let alternativaCorpo2 = `  <div class="alternativaGroup">
                                    <div class="list-group-item list-group-item-action flex-column align-items-start" style="padding-bottom: 0.5rem !important;padding-top: 0.5rem !important">
                                        <div class="wrapperAlternativa" style="display: flex">

                                        <i class="bi bi-check-lg" style="position: absolute;color: #57b657;"></i>
                                        <h5 class="mb-1 letraAlternativa" style="padding-right: 0.5rem">${letra})</h5>
                                        <p class="mb-1 textoAlternativa text-success">${descricao}</p>
                                        </div>
                                    
                                    </div>
                                    <div style="border-bottom: 1px solid #e3e3e3"></div>
                                </div>`;


        if (statuss == "Correta") {
            $("#alternativasModal").append(alternativaCorpo2);
        } else {
            $("#alternativasModal").append(alternativaCorpo1);
        }
    }


});










