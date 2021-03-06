$(document).ready(function () {
    let buscaInicialDisciplina = true;
    let buscaInicialTematica = true;
    let buscaInicialSubgrupo = true;



    init();
    function init() {
        $('[data-toggle="tooltip"]').tooltip()
        $("#btn-cancelar-disciplina").hide();
        $("#btn-cancelar-tematica").hide();
        $("#alterarTematica").hide();
        $("#cadastrarDisciplina").hide();
        $("#cadastrarSubgrupo").hide();
        $("#cadastrarTematica").hide();


        tableDisciplina = $('#tableDisciplinas').DataTable({
            "columnDefs": [
                { "orderable": false, "targets": 2 } // esta linha retira a ordenação das colunas, pois não ha sentido ordenar os botões 
            ],
            responsive: true,
            ajax: {
                "url": "../backend/atuacaoBack.php",
                "method": 'POST', // metodo utilizado para passar os valores das variavesi data para o backend.
                "data": { buscaInicialDisciplina: buscaInicialDisciplina }, // as variaves bucasInicial.... possuem o valor true  para que no arquivo atuacaoBack.php sirva para buscar os dados da tabela
                "dataSrc": ""
            },
            language: { // tradução em portgues da tabela
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]], // configuração de quantidade de registros a serem mostrados, 5....15 ou todos 
            columns: [
                //aqui dentro sera configurado o conteudo de cada coluna utilizando as variaveis data
                //importante - os valores contidos em data não a relação com os nomes dos cabeçalhos da tabela.

                // as tabelas são lidas por indices: 0,1,2,3, de acordo com o tanto de colunas - Neste caso o indice 0 sera o disID.
                { data: 'disID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados, no caso o ID
                { data: 'disDescricao' },
                {
                    data: null, render: function (data, type, row) { // renderizar a exibição dos botões 

                        return `<div class="text-center">
                        <button  type="button"
                                class="btn  btn-inverse-success btn-rounded btn-icon btn-edit-disciplina" data-toggle="tooltip" data-placement="top" title="Alterar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button"
                                class="btn btn-inverse-danger btn-rounded btn-icon btn-del-disciplina" data-toggle="tooltip" data-placement="top" title="Excluir">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>`;
                    }
                },
            ]
        })

        tableTematica = $('#tableTematica').DataTable({
            responsive: true,
            columnDefs: [
                { "orderable": false, "targets": 3 } // esta linha retira a ordenação das colunas, pois não ha sentido ordenar os botões 
            ],
            ajax: {
                "url": "../backend/atuacaoBack.php",
                "method": 'POST',
                "data": { buscaInicialTematica: buscaInicialTematica },
                "dataSrc": ""
            },
            language: {
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]],
            columns: [
                { data: 'temID' },
                { data: 'disDescricao' },
                { data: 'temDescricao' },
                {
                    data: null, render: function (data, type, row) {

                        return `<div class="text-center">
                        <button  type="button"
                                class="btn  btn-inverse-success btn-rounded btn-icon btn-edit-tematica" data-toggle="tooltip" data-placement="top" title="Alterar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button"
                                class="btn btn-inverse-danger btn-rounded btn-icon btn-del-tematica" data-toggle="tooltip" data-placement="top" title="Excluir">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>`;
                    }
                },
            ]
        });

        tableSubgrupo = $('#tableSubgrupo').DataTable({
            responsive: true,
            columnDefs: [
                { "orderable": false, "targets": 4 } // esta linha retira a ordenação das colunas, pois não ha sentido ordenar os botões 
            ],
            ajax: {
                "url": "../backend/atuacaoBack.php",
                "method": 'POST',
                "data": { buscaInicialSubgrupo: buscaInicialSubgrupo },
                "dataSrc": ""
            },
            language: {
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]],
            columns: [
                { data: 'subID' },
                { data: 'disDescricao' },
                { data: 'temDescricao' },
                { data: 'subDescricao' },
                {
                    data: null, render: function (data, type, row) {

                        return `<div class="text-center">
                        <button  type="button"
                                class="btn  btn-inverse-success btn-rounded btn-icon btn-edit-subgrupo" data-toggle="tooltip" data-placement="top" title="Alterar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button"
                                class="btn btn-inverse-danger btn-rounded btn-icon btn-del-subgrupo" data-toggle="tooltip" data-placement="top" title="Excluir">
                                <i class="bi bi-trash"></i>
                            </button>
                                </div>`;
                    }
                },
            ]
        });

    }


    //! Area de js para DISCIPLINA
    //? Botao do formulario de cadastrar/alterar DISCIPLINA
    $('#formDisciplina').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina
        var opDisciplina = $('#opDisciplina').val();
        var disciplina = $('#disciplina').val();
        var disID = $("#disID").val();

        $.ajax({
            url: '../backend/atuacaoBack.php',
            method: 'POST',
            data: {
                disciplina: disciplina,
                disID: disID,
                opDisciplina: opDisciplina
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

                    $("#btn-nova-disciplina").click();//Simula um click manual no botao de cadastrar
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

            tableDisciplina.ajax.reload(null, false);
            tableTematica.ajax.reload(null, false);
            tableSubgrupo.ajax.reload(null, false);
        });
        return false;
    });

    //? Esconder e mostra o formulario de cadastro/alteração de disciplina
    function toggleNovaDisciplina() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarDisciplina').css('display') == 'none') {
            $("#btn-nova-disciplina").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableDisciplinaToggle").toggle("slow");

        } else {
            $("#btn-nova-disciplina").text('Nova Disciplina').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableDisciplinaToggle").toggle("slow");
        }
        $("#cadastrarDisciplina").toggle("slow");
    }

    //? Botao cadastrar disciplina
    $("#btn-nova-disciplina").click(function () {
        $("#titleDisciplina").toggle("slow")

        $("#cardTitleDisc").text("Cadastrar Disciplina");
        $("#cardDescDisc").text("Cadastre disciplinas para as temáticas.");
        $("#btn-cadastrarDisciplina span").text("Cadastrar");
        toggleNovaDisciplina();//Mostra ou esconde tabela
        $('#opDisciplina,#disciplina,#disID').val("");//Limpa os campos
    })


    //? Botao editar da tabela de disciplina
    $("#tbodyDisciplina").on("click", ".btn-edit-disciplina", function () {
        $('#cover-spin').show();
        $("#cardTitleDisc").text("Alterar Disciplina");
        $("#cardDescDisc").text("Altera a disciplina selecionada.");
        $("#btn-cadastrarDisciplina span").text("Salvar");

        toggleNovaDisciplina()//Mostra ou esconde tabela
        //children: 
        let dados = $(this).closest('tr').children("td").map(function () { // função .map é utilizado para pegar todos os dados contidos na linha onde o botão editar foi pressionado, como ID, DESCRICAO E ETC.
            return $(this).text();
        }).get();
        $("#disID").val(dados[0]);//Insere ID no formulario para alterar
        $("#disciplina").val(dados[1]);//Insere disciplina selecionada
        $("#opDisciplina").val("update");//Informa update para atualizar no backend
        setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 340);
    })

    //? Botao excluir da tabela de disciplina
    $("#tbodyDisciplina").on("click", ".btn-del-disciplina", function () {
        let dadosDisciplina = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        swalExcluir("disciplina", dadosDisciplina[0], "a disciplina");


        $(this).closest('tr').addClass("selecionado"); // nesta linha esta adicionando a classe "selecionado" na tag <tr></tr> mais proxima do botão clicado.

    });
    //! FIM DISCIPLINA



    //! Area de js para SUBGRUPO


    $('#formSubrgrupo').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina
        var tematicaopc = $('#tematicaopc option:selected').val();
        var opSubgrupo = $('#opSubgrupo').val(); // se é update 
        var subgrupo = $('#subgrupo').val(); // subrgupo selecionado para alterar
        var subID = $("#subID").val();

        $.ajax({
            url: '../backend/atuacaoBack.php',
            method: 'POST',
            data: {
                subgrupo: subgrupo,
                subID: subID,
                opSubgrupo: opSubgrupo,
                tematicaopc: tematicaopc
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

                    $("#btn-novo-subgrupo").click();//Simula um click manual no botao de cadastrar
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

            tableDisciplina.ajax.reload(null, false);
            tableTematica.ajax.reload(null, false);
            tableSubgrupo.ajax.reload(null, false);
        });
        return false;
    });

    //?Esconder e mostrar o formulario de cadastro/alteração de subgrupo
    function toggleNovoSubgrupo() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarSubgrupo').css('display') == 'none') {
            $("#btn-novo-subgrupo").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableSubgrupoToggle").toggle("slow");
        } else {
            $("#btn-novo-subgrupo").text('Novo Subgrupo').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableSubgrupoToggle").toggle("slow");
        }
        $("#cadastrarSubgrupo").toggle("slow");
    }
    //? Botao cadastrar subgrupo
    $("#btn-novo-subgrupo").click(function () {
        $("#titleSubgrupo").toggle("slow")
        $("#cardTitleSub").text("Cadastrar Subgrupo");
        $("#cardDescSub").text("Cadastre temáticas para os subgrupos.");
        $("#btn-cadastrarSubgrupo span").text("Cadastrar");

        toggleNovoSubgrupo();
        $("#opSubgrupo").val("");
        $("#subgrupo").val("");


        let buscarTematica = true;
        $.ajax({
            url: '../backend/atuacaoBack.php',
            method: 'POST',
            data: {
                buscarTematica: buscarTematica
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
                    $('#tematicaopc').html("");
                    for (let i = 0; i < data.length; i++) {
                        let option = `<option data-subtext=" - ${data[i].disDescricao}" value="${data[i].temID}">${data[i].temDescricao}</option>`;

                        $('#tematicaopc').append(option);
                    }
                }
            }
        }).done(function (data) {

            $('#tematicaopc').selectpicker('refresh');
        });
    })

    //?Botao da tabela de editar subgrupo
    $("#tbodySubgrupo").on("click", ".btn-edit-subgrupo", function () {
        $('#cover-spin').show();
        $("#titleSubgrupo").toggle("slow")
        $("#cardTitleSub").text("Alterar Subgrupo");
        $("#cardDescSub").text("Altere o subgrupo selecionado.");
        $("#btn-cadastrarSubgrupo span").text("Salvar");

        toggleNovoSubgrupo()
        let dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#subID").val(dados[0]);
        $("#subgrupo").val(dados[3]);
        $("#opSubgrupo").val("update");


        let buscarTematica = true;
        $.ajax({
            url: '../backend/atuacaoBack.php',
            method: 'POST',
            data: {
                buscarTematica: buscarTematica
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
                    $('#tematicaopc').html("");
                    for (let i = 0; i < data.length; i++) {
                        let option = `<option data-subtext=" - ${data[i].disDescricao}" value="${data[i].temID}">${data[i].temDescricao}</option>`;

                        $('#tematicaopc').append(option);
                    }
                }
            }
        }).done(function (data) {
            $('#tematicaopc').selectpicker('refresh');
            $("#tematicaopc option:contains(" + dados[2] + ")").attr("selected", true);
            $(".filter-option-inner-inner").text(dados[2]).append(`<small class="text-muted"> - ${dados[1]}</small>`);
            setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 340);
        });
    });

    //?Botao da tabela que deleta subgrupo
    $("#tbodySubgrupo").on("click", ".btn-del-subgrupo", function () {
        limparSelecionado();
        let dadosSubgrupo = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        swalExcluir("subgrupo", dadosSubgrupo[0], "o subgrupo");

        $(this).closest('tr').addClass("selecionado");

    });
    //! FIM SUBGRUPO


    //! Area de js para tematica
    //? Botao do formulario de cadastrar/alterar TEMATICA
    $('#formTematica').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina

        var disciplinaopc = $('#disciplinaopc option:selected').val();
        var opTematica = $('#opTematica').val();
        var tematica = $('#tematica').val();
        var temID = $("#temID").val();

        $.ajax({
            url: '../backend/atuacaoBack.php',
            method: 'POST',
            data: {
                tematica: tematica,
                temID: temID,
                opTematica: opTematica,
                disciplinaopc: disciplinaopc
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

                    $("#btn-novo-tematica").click();//Simula um click manual no botao de cadastrar
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

            tableDisciplina.ajax.reload(null, false);
            tableTematica.ajax.reload(null, false);
            tableSubgrupo.ajax.reload(null, false);
        });
        return false;
    });
    //Esconder e mostrar o formulario de cadastro/alteração de tematica
    function toggleNovaTematica() {
        let adicionarIcon = `<i class="bi bi-plus-circle btn-icon-prepend"></i>`;
        let cancelarIcon = `<i class="bi bi-x-circle btn-icon-prepend"></i>`;

        if ($('#cadastrarTematica').css('display') == 'none') {
            $("#btn-novo-tematica").text('Cancelar').prepend(cancelarIcon).removeClass("btn-primary").addClass("btn-secondary");
            $("#tableTematicaToggle").toggle("slow");
        } else {
            $("#btn-novo-tematica").text('Nova Temática').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableTematicaToggle").toggle("slow");
        }
        $("#cadastrarTematica").toggle("slow");
    }
    //?Botao para abrir/fechar formulario de cadastro do tematica
    $("#btn-novo-tematica").click(function () {
        $("#titleTematica").toggle("slow")
        $("#cardTitleTem").text("Cadastrar Temática");
        $("#cardDescTem").text("Cadastre temáticas para os subgrupos.");
        $("#btn-cadastrarTematica span").text("Cadastrar");
        toggleNovaTematica();
        $('#opTematica,#tematica,#temID').val("");//Limpa os campos

        let buscarDisciplina = true;
        $.ajax({
            url: '../backend/atuacaoBack.php',
            method: 'POST',
            data: {
                buscarDisciplina: buscarDisciplina
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
                    $('#disciplinaopc').html("");
                    for (let i = 0; i < data.length; i++) {
                        let option = `<option value="${data[i].disID}">${data[i].disDescricao}</option>`;

                        $('#disciplinaopc').append(option);
                    }
                }
            }
        }).done(function (data) {

            $('#disciplinaopc').selectpicker('refresh');
        });

    })

    //? Botao editar da tabela de tematica
    $("#tbodyTematica").on("click", ".btn-edit-tematica", function () {
        $('#cover-spin').show();
        $("#titleTematica").toggle("slow")
        toggleNovaTematica()
        $("#cardTitleTem").text("Alterar Temática");
        $("#cardDescTem").text("Altere a temática selecionada");
        $("#btn-cadastrarTematica span").text("Salvar");



        let dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#temID").val(dados[0]);//Insere ID no formulario para alterar
        $("#tematica").val(dados[2]);//Insere disciplina selecionada
        $("#opTematica").val("update");//Informa update para atualizar no backend


        let buscarDisciplina = true;
        $.ajax({
            url: '../backend/atuacaoBack.php',
            method: 'POST',
            data: {
                buscarDisciplina: buscarDisciplina
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
                    $('#disciplinaopc').html("");
                    for (let i = 0; i < data.length; i++) {
                        let option = `<option value="${data[i].disID}">${data[i].disDescricao}</option>`;

                        $('#disciplinaopc').append(option);
                    }
                }
            }
        }).done(function (data) {

            $('#disciplinaopc').selectpicker('refresh');
            $("#disciplinaopc option:contains(" + dados[1] + ")").attr("selected", true);
            $(".filter-option-inner-inner").text(dados[1])

            setTimeout(function () { $('#cover-spin').fadeToggle("slow"); }, 340);

        });


    })

    //? Botao excluir da tabela de tematica
    $("#tbodyTematica").on("click", ".btn-del-tematica", function () {
        limparSelecionado();
        let dadosTematica = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        swalExcluir("tematica", dadosTematica[0], "a tematica");

        $(this).closest('tr').addClass("selecionado");

    });

    // window.history.pushState(null, null, window.location.pathname);


    //! FIM TEMATICA


    //? Modal cancelar
    $("#modalCancelar").click(function () {
        $('#modalDelete').modal('hide')
        $("#idDeleteSelecionado,#tabelaSelecionad").val("")
        //limparSelecionado();
    });


    function swalExcluir(tabela, id, texto) {
        Swal.fire({
            title: `Deseja excluir ${texto}?`,
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
                    url: '../backend/atuacaoBack.php',
                    method: 'POST',
                    data: {
                        idDeleteSelecionado: id,
                        tabelaSelecionada: tabela
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
                    }, error: function (data) {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Existem registros vinculados!",
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                }).done(function (data) {
                    atualizarTabelas();
                });
            }
        })
    }

    function limparSelecionado() {
        $('#tableDisciplinas tr').each(function () {
            if ($(this).hasClass("selecionado")) {
                $(this).removeClass("selecionado");
            }
        });
        $('#tableTematica tr').each(function () {
            if ($(this).hasClass("selecionado")) {
                $(this).removeClass("selecionado");
            }
        });
        $('#tableSubgrupo tr').each(function () {
            if ($(this).hasClass("selecionado")) {
                $(this).removeClass("selecionado");
            }
        });
    }


    function atualizarTabelas() {
        //* Get paging information
        var infoTem = tableTematica.page.info();
        //* Number of deleted rows
        var numDeletedTem = 1;
        //* Calculate number of pages after deleting rows
        var numPagesAfterTem = Math.ceil((infoTem.recordsDisplay - numDeletedTem) / infoTem.length);
        //* If number of pages after deleting rows is less than total number of pages
        //* and the last page is displayed
        if (numPagesAfterTem < infoTem.pages && infoTem.page === (infoTem.pages - 1)) {
            //* Go to previous page using zero-based index
            tableTematica.page(numPagesAfterTem - 1);
        }
        //* Reload table
        tableTematica.ajax.reload(null, false);


        var infoDis = tableDisciplina.page.info();
        var numDeletedDis = 1;
        var numPagesAfterDis = Math.ceil((infoDis.recordsDisplay - numDeletedDis) / infoDis.length);
        if (numPagesAfterDis < infoDis.pages && infoDis.page === (infoDis.pages - 1)) {

            tableDisciplina.page(numPagesAfterDis - 1);
        }
        tableDisciplina.ajax.reload(null, false);

        var infoSub = tableSubgrupo.page.info();
        var numDeletedSub = 1;
        var numPagesAfterSub = Math.ceil((infoSub.recordsDisplay - numDeletedSub) / infoSub.length);
        if (numPagesAfterSub < infoSub.pages && infoSub.page === (infoSub.pages - 1)) {

            tableSubgrupo.page(numPagesAfterSub - 1);
        }

        tableSubgrupo.ajax.reload(null, false);
    }



});









