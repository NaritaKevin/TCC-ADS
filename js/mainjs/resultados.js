$(document).ready(function () {
    let buscaInicialAtividades = true;
    let buscaInicialAlunosResultados = true;
    let buscaGrafico = true;

    init();

    function init() {

        $("#verResultados").hide();
        $("#verGraficos").hide();
        $("#verAtividadeAluno").hide();
        tableResultados = $('#tableResultados').DataTable({
            columnDefs: [
                { "orderable": false, "targets": 6 }
            ],
            ajax: {
                "url": "../backend/resultados/resultadosBack.php",
                "method": 'POST',
                "data": { buscaInicialAtividades: buscaInicialAtividades },
                "dataSrc": ""
            },
            language: {
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]],
            columns: [
                { data: 'atiID' },
                {
                    data: null, render: function (data, type, row) {

                        let descricao = data.atiDescricao.slice(0, 200);
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
                        let dataini = data.atiDataInicio.slice(0, 10);
                        let horaini = data.atiDataInicio.slice(11, 19);
                        dataini = dataini.split('-').reverse().join('/');
                        return `<span style="padding-bottom:5px">${dataini}</span><br><br><span>${horaini}</span>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        let datafim = data.atiDataFim.slice(0, 10);
                        let horafim = data.atiDataFim.slice(11, 19);
                        datafim = datafim.split('-').reverse().join('/');
                        return `<span style="padding-bottom:5px">${datafim}</span><br><br><span>${horafim}</span>`;
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.tipDescricao == "Trabalho") {
                            return `<label class="badge badge-primary" >${data.tipDescricao}</label>`;
                        } else if (data.tipDescricao == "Fórum") {
                            return `<label class="badge badge-warning" style="background-color: #435ee3">${data.tipDescricao}</label>`;
                        } else if (data.tipDescricao == "Redação") {
                            return `<label class="badge badge-info">${data.tipDescricao}</label>`;
                        } else {
                            return `<label class="badge badge-info" style="background-color: #98BDFF">${data.tipDescricao}</label>`;
                        }
                    }
                },
                { data: 'claNome' },
                {
                    data: null, render: function (data, type, row) {

                        return `<div class="text-center"><button type="button"
                        class="btn btn-inverse-primary btn-rounded btn-icon btn-info-atividade ">
                        <i class="bi bi-people-fill"></i>
                    </button>
                    <button type="button"
                        class="btn btn-inverse-primary btn-rounded btn-icon btn-info-grafico ">
                        <i class="bi bi-clipboard-data"></i>
                    </button> </div> `;
                    }
                },
            ]

        });


    }

    $('#enunciadoQuestao').on('click', '.form-check-label input:checkbox', function () {
        // $('.form-check-label input:checkbox').not(this).prop('checked', false);
        return false;
    });
    //!  Botão Modal info atividade e cancelar
    $("#tbodyResultadosAluno").on("click", ".btn-info-aluno", function () {
        dadosAluno = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        let idAluno = dadosAluno[0].match(/\d+/g);
        idAluno = idAluno.join("")
        $("#verResultados").toggle("slow")
        $("#verAtividadeAluno").fadeToggle("slow");

        $.ajax({
            url: '../backend/resultados/resultadosBack.php',
            method: 'POST',
            data: { atiIDResultados: dados[0], idAluno: idAluno },
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

                    for (let i = 0; i < data[0].length; i++) {

                        let stsCorreta = "";


                        if (flag != data[0][i].atiqOrdemQuestao) {

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


                        if (data[0][i].altStsCorreta == "Correta") {

                            if (0 in respostaCorreta) {
                                respostaCorreta.push(` ${data[0][i].altLetra})`);
                            } else {
                                respostaCorreta.push(`${data[0][i].altLetra})`);
                            }
                        }

                        if (data[0][i].altLetra == "A") {
                            questao = `  <h4 class="text-primary font-weight-bold">Questão ${data[0][i].atiqOrdemQuestao}</h4>
                                            <p class="display-5 pt-2">${data[0][i].queDescricao}</p>
                                            <div class="list-wrapper pt-1" id="questao${data[0][i].atiqOrdemQuestao}" style="overflow: auto;">
                                                <ul>
                                                `;
                            let alternativa = ` <li>
                                                    <div class="form-check form-check-flat">
                                                        <label class="form-check-label  font-weight-bold ">
                                                            <input class="checkbox" id="${data[0][i].atiqOrdemQuestao}${data[0][i].altLetra}" ${stsCorreta}  type="checkbox">
                                                        ${data[0][i].altLetra}) ${data[0][i].altDescricao}
                                                        <i class="input-helper"></i></label>
                                                    </div>
                                                </li>`;
                            questao = questao.concat(alternativa);
                        } else if (data[0][i].altLetra != "A") {

                            let alternativa = ` <li>
                                                    <div class="form-check form-check-flat">
                                                        <label class="form-check-label  font-weight-bold ">
                                                            <input class="checkbox" id="${data[0][i].atiqOrdemQuestao}${data[0][i].altLetra}" ${stsCorreta}  type="checkbox">
                                                        ${data[0][i].altLetra}) ${data[0][i].altDescricao}
                                                        <i class="input-helper"></i></label>
                                                    </div>
                                                </li>`;
                            questao = questao.concat(alternativa);
                        }

                        flag = data[0][i].atiqOrdemQuestao

                        if (data[0][i + 1] == undefined) {
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
                    timer: 2000
                })

            },
        }).done(function (data) {
            let num = dadosAluno[0].replace(/[^0-9]/g, "").length

            let nomeAluno = dadosAluno[0].substring(num);
            console.log(dadosAluno)

            $("#tituloResAluno").html(` <h4 style="text-transform: none;" class="card-title">Atividade do aluno(a): <span class="text-primary">${nomeAluno}</span><small class="text-primary" id="classe"><strong> - ${dadosAluno[4]} </strong></small></h4>`);
            for (let i = 0; i < data[1].length; i++) {
                if (data[1][i].resResposta == "Sim" && data[1][i].altStsCorreta == "Correta" && data[1][i].resAltEscolhida == data[1][i].altLetra && data[1][i].resStsResposta == "Respondido") {
                    $(`#${data[1][i].atiqOrdemQuestao}${data[1][i].altLetra}`).prop('checked', true).parent().parent().addClass("form-check-success")
                    $(`#${data[1][i].atiqOrdemQuestao}${data[1][i].altLetra}`).parent().addClass("text-success")
                }
                if (data[1][i].resResposta == "Não" && data[1][i].altStsCorreta == "Incorreta" && data[1][i].resAltEscolhida == data[1][i].altLetra && data[1][i].resStsResposta == "Respondido") {
                    $(`#${data[1][i].atiqOrdemQuestao}${data[1][i].altLetra}`).prop('checked', true).parent().parent().addClass("form-check-danger");
                    $(`#${data[1][i].atiqOrdemQuestao}${data[1][i].altLetra}`).parent().addClass("text-danger")
                }
            }
        });

    });

    //! dar reload no css da página
    // refreshCSS();
    // refreshCSS = () => {
    //     let links = document.getElementsByTagName('link');
    //     for (let i = 0; i < links.length; i++) {
    //         if (links[i].getAttribute('rel') == 'stylesheet') {
    //             let href = links[i].getAttribute('href')
    //                 .split('?')[0];

    //             let newHref = href + '?version='
    //                 + new Date().getMilliseconds();

    //             links[i].setAttribute('href', newHref);
    //         }
    //     }
    // }
    //!


    //! Botão Mostrar resultados dos alunos
    $("#tbodyResultados").on("click", ".btn-info-atividade", function () {

        $("#tabelaResultados").toggle("slow");
        $("#verResultados").toggle("slow");

        if ($.fn.dataTable.isDataTable('#tableResultadosAluno')) {
            $('#tableResultadosAluno').DataTable().destroy();

        }

        dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();


        tableResultadosAluno = $('#tableResultadosAluno').DataTable({
            columnDefs: [
                { "orderable": false, "targets": 5 }
            ],
            responsive: true,
            destroy: true,
            ajax: {
                url: "../backend/resultados/resultadosBack.php",
                method: 'POST',
                cache: false,
                "data": {
                    buscaInicialAlunosResultados: buscaInicialAlunosResultados,
                    idAtividade: dados[0]
                },
                "dataSrc": ""
            },
            language: {
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]],
            columns: [
                {
                    data: null, render: function (data, type, row) {

                        return `<span><div hidden>${data.usuID}</div>${data.pesNome}</span>`;

                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        let cor = "";


                        let acertos = data.Acertos;
                        let totalQuestoes = data.TotalQuestoes;

                        let aux = 10 / totalQuestoes;
                        let valor1 = 10 * (aux * (totalQuestoes - acertos));
                        let valorFinal = 100 - valor1;


                        if (valorFinal == 100) {
                            cor = "bg-primary";
                        } else if (valorFinal >= 50) {
                            cor = "bg-success";
                        } else if (valorFinal < 50) {
                            cor = "bg-danger";
                        }


                        return `  <div class="progress">
                                    <div class="progress-bar ${cor}" role="progressbar"
                                        style="width: ${valorFinal}%" aria-valuenow="${valorFinal}" aria-valuemin="0"
                                        aria-valuemax="100"></div>
                                </div>`;

                    }
                },
                {
                    data: null, render: function (data, type, row) {


                        let acertos = data.Acertos;
                        let totalQuestoes = data.TotalQuestoes;

                        return `<span>${acertos}/${totalQuestoes}</span>`;

                    }
                },
                {
                    data: null, render: function (data, type, row) {

                        return `<span>${data.usuPontuacao}</span>`;

                    }
                },
                {
                    data: null, render: function (data, type, row) {

                        let data_americana = data.usuDataRealizacao;
                        let data_brasileira = data_americana.split('-').reverse().join('/');

                        return data_brasileira;

                    }
                },

                {
                    data: null, render: function (data, type, row) {

                        return `  <div class="text-center"><button type="button"
                                    class="btn btn-inverse-primary btn-rounded btn-icon btn-info-aluno ">
                                    <i class="bi bi-file-earmark-text"></i>
                                </button> </div>`;
                    }
                },

            ]

        });
        // $('#tableResultadosAluno').removeAttr('style');
        // tableResultadosAluno.fnDraw();
        // tableResultadosAluno.ajax.reload(null, false);

    })

    $("#modalCancelar").click(function () {
        $('#modalAluno').modal('hide')
    })
    $("#btn-voltar-verAtividadeAluno").click(function () {
        $("#verAtividadeAluno").toggle("slow")
        $("#verResultados").toggle("slow");
    })


    $("#btn-voltar-resultados").click(function () {
        $("#tabelaResultados").toggle("slow");
        $("#verResultados").fadeToggle("slow");
    })

    $("#btn-voltar-graficos").click(function () {
        $("#verGraficos").toggle("slow")
        $("#tabelaResultados").toggle("slow")
    })




    $("#tbodyResultados").on("click", ".btn-info-grafico", function () {
        let dadosAtividade = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        $('#cover-spin').show();
        $("#verGraficos").toggle("slow")
        $("#tabelaResultados").toggle("slow")

        setTimeout(function () { ajaxGrafico() }, 1000);

        function ajaxGrafico() {
            $.ajax({
                url: '../backend/resultados/resultadosBack.php',
                method: 'POST',
                data: { atividadeID: dadosAtividade[0] },
                dataType: 'json',
                success: function (data) {
                    console.log(data)
                    if (data.type == 'buscaVazia') {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: data.text,
                            showConfirmButton: false,
                            timer: 3000
                        })
                    } else {
                        let questao = [];
                        let acertos = [];
                        let erros = [];
                        let porcErros = [];
                        let porcAcertos = [];
                        let enunciadoAtiv = "";
                        let classe = "";
                        for (let i = 0; i < data.length; i++) {
                            questao.push(`Questão ${data[i].atiqOrdemQuestao}`);
                            acertos.push(data[i].acertos);
                            if (data[i].claNome != null) {
                                classe = data[0].claNome
                            }
                            if (data[i].atividade != null) {
                                enunciadoAtiv = data[i].atividade
                            }
                            if (data[i].erros == 0 || data[i].erros == null) {
                                erros.push(0)
                            } else {
                                erros.push(data[i].erros)
                            }
                            if (data[i].acertos == null) {
                                porcAcertos.push(0)
                            } else {
                                porcAcertos.push(Math.round(((data[i].acertos * 100) / data[i].totalAlunos + Number.EPSILON) * 100) / 100)
                            }
                            if (data[i].erros == null) {
                                porcErros.push(0)
                            } else {
                                porcErros.push(Math.round(((data[i].erros * 100) / data[i].totalAlunos + Number.EPSILON) * 100) / 100)
                            }

                        }

                        acertos.push(0);

                        $("#titulo").html(` <h4 id="titleDiv" class="card-title">Graficos da atividade: <span class="text-primary">${enunciadoAtiv}</span><small class="text-primary" id="classe"><strong> - ${classe}</strong></small></h4>`);


                        if (window.qtdeAcertoQuestoes instanceof Chart) {
                            window.qtdeAcertoQuestoes.destroy();
                        }
                        if (window.porcAcertoQuestoes instanceof Chart) {
                            window.porcAcertoQuestoes.destroy();
                        }

                        console.log(questao);
                        console.log('--------------')
                        console.log(acertos);
                        if ($("#grafico1").length) {
                            var qtdeQuestoesCanvas = $("#grafico1").get(0).getContext("2d");
                            qtdeAcertoQuestoes = new Chart(qtdeQuestoesCanvas, {
                                type: 'bar',
                                data: {
                                    labels: questao,
                                    datasets: [{
                                        label: 'Acertos',
                                        data: acertos,
                                        backgroundColor: '#4B49AC'
                                    },
                                    {
                                        label: 'Erros',
                                        data: erros,
                                        backgroundColor: '#98BDFF'
                                    }
                                    ]
                                },
                                options: {
                                    title: {
                                        display: true,
                                        text: 'Quantidade de acertos e erros nas questões',
                                        fontSize: 20,
                                    },
                                    cornerRadius: 5,
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    layout: {
                                        padding: {
                                            left: 0,
                                            right: 0,
                                            top: 20,
                                            bottom: 0
                                        }
                                    },

                                    // scales: {
                                    //     yAxes: [{
                                    //         display: true,

                                    //         gridLines: {
                                    //             display: true,
                                    //             drawBorder: false,
                                    //             color: "#F2F2F2"
                                    //         },
                                    //         ticks: {
                                    //             display: true,
                                    //             min: 0,
                                    //             max: 3,
                                    //             callback: function (value, index, values) {
                                    //                 return value;
                                    //                 // return value + '$';
                                    //             },
                                    //             autoSkip: true,
                                    //             maxTicksLimit: 10,
                                    //             fontColor: "#6C7383"
                                    //         }
                                    //     }],
                                    //     xAxes: [{
                                    //         stacked: false,
                                    //         ticks: {
                                    //             beginAtZero: true,
                                    //             fontColor: "#6C7383"
                                    //         },
                                    //         gridLines: {
                                    //             color: "rgba(0, 0, 0, 0)",
                                    //             display: false
                                    //         },
                                    //         barPercentage: 1
                                    //     }]
                                    // },
                                    legend: {
                                        display: true
                                    },
                                    elements: {
                                        point: {
                                            radius: 0
                                        }
                                    },

                                },

                            });
                        }
                        if ($("#grafico2").length) {
                            var qtdeQuestoesCanvas = $("#grafico2").get(0).getContext("2d");
                            porcAcertoQuestoes = new Chart(qtdeQuestoesCanvas, {
                                type: 'bar',
                                data: {
                                    labels: questao,
                                    datasets: [{
                                        label: 'Acertos',
                                        data: porcAcertos,
                                        backgroundColor: '#4B49AC'
                                    },
                                    {
                                        label: 'Erros',
                                        data: porcErros,
                                        backgroundColor: '#98BDFF'
                                    }
                                    ]
                                },
                                options: {
                                    title: {
                                        display: true,
                                        text: 'Porcentagem de acertos e erros nas questões',
                                        fontSize: 20,
                                    },
                                    cornerRadius: 5,
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    layout: {
                                        padding: {
                                            left: 0,
                                            right: 0,
                                            top: 20,
                                            bottom: 0
                                        }
                                    },

                                    scales: {
                                        yAxes: [{
                                            display: true,

                                            // gridLines: {
                                            //     display: true,
                                            //     drawBorder: false,
                                            //     color: "#F2F2F2"
                                            // },
                                            ticks: {
                                                display: true,
                                                // min: 0,
                                                // max: 3,
                                                callback: function (value, index, values) {
                                                    // return value;
                                                    return value + '%';
                                                },
                                                autoSkip: true,
                                                // maxTicksLimit: 10,
                                                fontColor: "#6C7383"
                                            }
                                        }],
                                        // xAxes: [{
                                        //     stacked: false,
                                        //     ticks: {
                                        //         beginAtZero: true,
                                        //         fontColor: "#6C7383"
                                        //     },
                                        //     gridLines: {
                                        //         color: "rgba(0, 0, 0, 0)",
                                        //         display: false
                                        //     },
                                        //     barPercentage: 1
                                        // }]
                                    },
                                    legend: {
                                        display: true
                                    },
                                    elements: {
                                        point: {
                                            radius: 0
                                        }
                                    },

                                },

                            });
                        }

                        setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 500);
                    }


                },
                error: function (data) {

                    if (data.type == 'erro') {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Ocorreu um erro ao buscar os gráficos!",
                            showConfirmButton: false,
                            timer: 2000
                        })

                    }
                },
            }).done(function (data) {


            });
        }

    })


    // $('#tableResultados').on('mouseenter', 'tbody tr', function () {
    //     var rowData = tableResultados.row(this).data();
    //     //console.log(rowData)
    // });




});