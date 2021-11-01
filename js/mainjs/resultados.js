$(document).ready(function () {
    let buscaInicialAtividades = true;
    let buscaInicialAlunosResultados = true;


    init();

    function init() {
        $("#cadastrarQuestao").hide();
        $("#verResultados").hide();
        tableResultados = $('#tableResultados').DataTable({
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
                { data: 'claNome' },
                {
                    data: null, render: function (data, type, row) {

                        return ` <button type="button"
                        class="btn btn-inverse-primary btn-rounded btn-icon btn-info-atividade ">
                        <i class="bi bi-clipboard-data"></i>
                    </button>`;
                    }
                },
            ]

        });





    }

    function toggleNovaQuestao() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarQuestao').css('display') == 'none') {
            $("#btn-nova-questao").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableResultadosToggle").toggle("slow");
        } else {
            $("#btn-nova-questao").text('Adicionar questão').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableResultadosToggle").toggle("slow");
        }
        $("#cadastrarQuestao").toggle("slow");
    }

    //!  Botão Modal info atividade e cancelar
    $("#tbodyResultadosAluno").on("click", ".btn-info-aluno", function () {
        $('#modalAluno').modal('show')
    });
    $("#modalCancelar").click(function () {
        $('#modalAluno').modal('hide')
    })
    //!
    //! Botão Mostrar resultados dos alunos
    $("#tbodyResultados").on("click", ".btn-info-atividade", function () {

        $("#tabelaResultados").toggle("slow");
        $("#verResultados").toggle("slow");

        if ($.fn.dataTable.isDataTable('#tableResultadosAluno')) {
            $('#tableResultadosAluno').DataTable().destroy();
            console.log("entrou")
        }




        let dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        tableResultadosAluno = $('#tableResultadosAluno').DataTable({
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
                { data: 'pesNome' },
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

                        return `  <button type="button"
                                    class="btn btn-inverse-primary btn-rounded btn-icon btn-info-aluno ">
                                    <i class="bi bi-file-earmark-text"></i>
                                </button>`;
                    }
                },
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }
            ]

        });
        // $('#tableResultadosAluno').removeAttr('style');
        // tableResultadosAluno.fnDraw();
        // tableResultadosAluno.ajax.reload(null, false);

    })
    $("#btn-voltar-resultados").click(function () {
        $("#tabelaResultados").toggle("slow");
        $("#verResultados").toggle("slow");
    })
    //! 

    function format(d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="width:100%;">' +
            '<tr class="expanded-row">' +
            '<td colspan="8" class="row-bg"><div><div class="d-flex justify-content-between"><div class="cell-hilighted"><div class="d-flex mb-2"><div class="mr-2 min-width-cell"><p>Policy start date</p><h6>25/04/2020</h6></div><div class="min-width-cell"><p>Policy end date</p><h6>24/04/2021</h6></div></div><div class="d-flex"><div class="mr-2 min-width-cell"><p>Sum insured</p><h5>$26,000</h5></div><div class="min-width-cell"><p>Premium</p><h5>$1200</h5></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Quote no.</p><h6>Incs234</h6></div><div class="mr-2"><p>Vehicle Reg. No.</p><h6>KL-65-A-7004</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Policy number</p><h6>Incsq123456</h6></div><div class="mr-2"><p>Policy number</p><h6>Incsq123456</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-3 d-flex"><div class="highlighted-alpha"> A</div><div><p>Agent / Broker</p><h6>Abcd Enterprices</h6></div></div><div class="mr-2 d-flex"> <img src="../../images/faces/face5.jpg" alt="profile"/><div><p>Policy holder Name & ID Number</p><h6>Phillip Harris / 1234567</h6></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Branch</p><h6>Koramangala, Bangalore</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Channel</p><h6>Online</h6></div></div></div></div></td>'
        '</tr>' +
            '</table>';
    }


    $('#tableResultadosAluno tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tableResultadosAluno.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });





    // $('#tableResultados').on('mouseenter', 'tbody tr', function () {
    //     var rowData = tableResultados.row(this).data();
    //     //console.log(rowData)
    // });
});