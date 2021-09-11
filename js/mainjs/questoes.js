$(document).ready(function () {
    let buscaInicialQuestao = true;
    init();

    function init() {
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
                { data: 'queDescricao' },
                { data: 'quePalavrasChave' },
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
                        if (data.queStsTipo == "Publica") {
                            return `<label class="badge badge-info">${data.queStsTipo}</label>`;
                        } else {
                            return `<label class="badge badge-warning">${data.queStsTipo}</label>`;
                        }
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.queStsRevisao == "Revisada") {
                            return `<label class="badge badge-success">${data.queStsRevisao}</label>`;
                        } else {
                            return `<label class="badge badge-danger">${data.queStsRevisao}</label>`;
                        }
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        return ` <button type="button"
                                    class="btn btn-inverse-primary btn-rounded btn-icon btn-info-questao">
                                    <i class="bi bi-info-lg"></i>
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
        $("#deletarQuestao").prop("disabled", true)



    }
    //! Formulário de cadastro de Questões
    $('#formQuestoes').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina
        var subgrupoopc = $('#subgrupoopc').val();
        var nivelopc = $('#nivelopc').val();
        var codigobncc = $("#codigobncc").val();
        var enunciado = $("#enunciado").val();
        var palavrasChave = $("#palavrasChave").val();
        var data = {
            subgrupoopc: subgrupoopc,
            nivelopc: nivelopc,
            codigobncc: codigobncc,
            enunciado: enunciado,
            palavrasChave: palavrasChave
        };

        $('li textarea').each(function () {

            let alternativa = $(this).attr("id"); //* Pega o id da alternativa
            let textoAlternativa = $(this).val();//* Pega o enuncado da alternativa
            let status = $(this).closest("div").children().children(".toggleAlternativa").text();//* Pega o status de Correta ou Incorreta da alternativa

            data[alternativa] = alternativa //? Insere um novo valor no objeto alternativaA : alternativaA

            alternativa = alternativa.concat("texto");//* Muda o nome alternativaA para alternativaAtexto
            data[alternativa] = textoAlternativa//? Insere um novo valor no objeto AlternativaAtexto : textoAlternativa

            alternativa = alternativa.replace("texto", "status");//* Muda o nome alternativaAtexto para alternativaAstatus
            data[alternativa] = status//? Insere um novo valor no objeto AlternativaAstatus : status
            // Object.assign(data, { keys[i]: alternativa });

        });
        //console.log("Objeto data: ", data)

        $.ajax({
            url: '../backend/questoesBack.php',
            method: 'POST',
            data: data,
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

                    $("#btn-nova-disciplina").click();//Simula um click manual no botao de cadastrar
                } else if (data.type == 'validacao') {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: data.text,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }
        }).done(function (data) {
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
    $("#cadastrarQuestao").on("click", ".toggleAlternativa", function () {
        $(this).text() == "Incorreta" ? $(this).text("Correta").removeClass("btn-danger").addClass("btn-success") :
            $(this).text("Incorreta").removeClass("btn-success").addClass("btn-danger");

    });
    //!



    //! Botão de adicionar alternativas
    i = 0;
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
            console.log(i);
            letraid = letraid.replace(')', '')
            console.log(letraid);
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
                let disciplina = `<label class="labelCadastroAtuacao">Temática</label>  <div class="btn btn-inverse-primary btn-fw" style="cursor: default">${data.disDescricao}</div>`
                let tematica = `<label class="labelCadastroAtuacao">Disciplina</label>  <div class="btn btn-inverse-primary btn-fw" style="cursor: default">${data.temDescricao}</div>`
                $("#temSelecionado").html(tematica);
                $("#disSelecionado").html(disciplina);
            }

        })
    })



});










