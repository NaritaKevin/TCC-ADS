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
                { data: 'queNivel' },
                { data: 'queAnoID' },
                { data: 'queStsTipo' },
                { data: 'queStsRevisao' },
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




    i = 0;
    $(".form-group").on('click', "#adicionarQuestao", function () {
        letra = ["A)", "B)", "C)", "D)", "E)", "F)", "G)", "H)", "I)", "J)"];
        //A=0,B=1,C=2,D=3,E=4,F=5,G=6,H=7,I=8,J=9
        i < 0 ? $("#deletarQuestao").prop("disabled", true) : $("#deletarQuestao").prop("disabled", false);
        escolherSwitch(letra, i)
        i++;

    });

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
                                    <textarea class="form-control" id="alternativa${letraid}" rows="3"></textarea>
                                </div>
                            </div>
                        </li>`

            $("#alternativas").append(carregar);
        }
    }





});










