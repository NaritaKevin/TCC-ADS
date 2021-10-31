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

                        // let descricao = data.atiDescricao.slice(0, 200);
                        // let tamanho = descricao.length;
                        // if (tamanho >= 200) {
                        //     descricao = descricao + "..."
                        // }

                        return `  <div class="progress">
                                    <div class="progress-bar bg-success" role="progressbar"
                                        style="width: 50%" aria-valuenow="25" aria-valuemin="0"
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
    $('#tableResultados').on('mouseenter', 'tbody tr', function () {
        var rowData = tableResultados.row(this).data();
        //console.log(rowData)
    });
});