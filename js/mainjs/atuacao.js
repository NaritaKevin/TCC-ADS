$(document).ready(function () {
    let buscaInicialDisciplina = true;
    let buscaInicialTematica = true;
    let buscaInicialSubgrupo = true;
    init();

    function init() {

        $("#btn-cancelar-disciplina").hide();
        $("#btn-cancelar-tematica").hide();
        $("#alterarTematica").hide();
        $("#cadastrarDisciplina").hide();
        $("#cadastrarSubgrupo").hide();
        $("#cadastrarTematica").hide();
        tableDisciplina = $('#tableDisciplinas').DataTable({
            responsive: true,
            ajax: {
                "url": "../backend/processar.php",
                "method": 'POST',
                "data": { buscaInicialDisciplina: buscaInicialDisciplina },
                "dataSrc": ""
            },
            language: {
                url: "../partials/dataTablept-br.json"
            },
            lengthMenu: [[5, 15, 25, -1], [5, 15, 25, "Todos"]],
            columns: [
                { data: 'disID' },
                { data: 'disDescricao' },
                {
                    data: null, render: function (data, type, row) {

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
        });

        tableTematica = $('#tableTematica').DataTable({

            ajax: {
                "url": "../backend/processar.php",
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
                { data: 'temDescricao' },
                { data: 'disDescricao' },
                {
                    data: null, render: function (data, type, row) {

                        return `<button  type="button"
                                class="btn  btn-inverse-success btn-rounded btn-icon btn-edit-tematica">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button"
                                class="btn btn-inverse-danger btn-rounded btn-icon btn-del-tematica">
                                <i class="bi bi-trash"></i>
                            </button>`;
                    }
                },
            ]
        });

        tableSubgrupo = $('#tableSubgrupo').DataTable({
            ajax: {
                "url": "../backend/processar.php",
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
                { data: 'subDescricao' },
                { data: 'temDescricao' },
                { data: 'disDescricao' },
                {
                    data: null, render: function (data, type, row) {

                        return `<button  type="button"
                                class="btn  btn-inverse-success btn-rounded btn-icon btn-edit-subgrupo">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button"
                                class="btn btn-inverse-danger btn-rounded btn-icon btn-del-subgrupo">
                                <i class="bi bi-trash"></i>
                            </button>`;
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
            url: '../backend/processar.php',
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
            $("#btn-nova-disciplina").text('Adicionar disciplina').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableDisciplinaToggle").toggle("slow");
        }
        $("#cadastrarDisciplina").toggle("slow");
    }

    //? Botao cadastrar disciplina
    $("#btn-nova-disciplina").click(function () {
        toggleNovaDisciplina();//Mostra ou esconde tabela
        $('#opDisciplina,#disciplina,#disID').val("");//Limpa os campos
    })


    //? Botao editar da tabela de disciplina
    $("#tbodyDisciplina").on("click", ".btn-edit-disciplina", function () {
        toggleNovaDisciplina()//Mostra ou esconde tabela
        let dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();
        $("#disID").val(dados[0]);//Insere ID no formulario para alterar
        $("#disciplina").val(dados[1]);//Insere disciplina selecionada
        $("#opDisciplina").val("update");//Informa update para atualizar no backend
    })

    //? Botao excluir da tabela de disciplina
    $("#tbodyDisciplina").on("click", ".btn-del-disciplina", function () {
        let dadosDisciplina = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#idDeleteSelecionado").val(dadosDisciplina[0]);//Insere o ID no modal de excluir
        $("#tabelaSelecionada").val("disciplina");//Insere a tabela no modal de excluir
        $('#modalDelete').modal('show')//Mostra modal

        $(this).closest('tr').addClass("selecionado");

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
            url: '../backend/processar.php',
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
            $("#btn-novo-subgrupo").text('Adicionar subgrupo').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableSubgrupoToggle").toggle("slow");
        }
        $("#cadastrarSubgrupo").toggle("slow");
    }
    //? Botao cadastrar subgrupo
    $("#btn-novo-subgrupo").click(function () {
        toggleNovoSubgrupo();
        $("#opSubgrupo").val("");
        $("#subgrupo").val("");
    })

    //?Botao da tabela de editar subgrupo
    $("#tbodySubgrupo").on("click", ".btn-edit-subgrupo", function () {
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

    //?Botao da tabela que deleta subgrupo
    $("#tbodySubgrupo").on("click", ".btn-del-subgrupo", function () {
        limparSelecionado();
        let dadosSubgrupo = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#idDeleteSelecionado").val(dadosSubgrupo[0])
        $("#tabelaSelecionada").val("subgrupo");
        $('#modalDelete').modal('show')

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
            url: '../backend/processar.php',
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
            $("#btn-novo-tematica").text('Adicionar tematica').prepend(adicionarIcon).removeClass("btn-secondary").addClass("btn-primary");
            $("#tableTematicaToggle").toggle("slow");
        }
        $("#cadastrarTematica").toggle("slow");
    }
    //?Botao para abrir/fechar formulario de cadastro do tematica
    $("#btn-novo-tematica").click(function () {
        toggleNovaTematica();
        $('#opTematica,#tematica,#temID').val("");//Limpa os campos

    })

    //? Botao editar da tabela de tematica
    $("#tbodyTematica").on("click", ".btn-edit-tematica", function () {
        toggleNovaTematica()//Mostra ou esconde tabela
        let dados = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#temID").val(dados[0]);//Insere ID no formulario para alterar
        $("#tematica").val(dados[1]);//Insere disciplina selecionada
        $("#opTematica").val("update");//Informa update para atualizar no backend

        $("#disciplinaopc option:contains(" + dados[2] + ")").attr("selected", true);//Pré seleciona opção no dropdown
        $(".filter-option-inner-inner").text(dados[2]);//Escreve a disciplina selecionada no botão do dropdown

    })

    //? Botao excluir da tabela de tematica
    $("#tbodyTematica").on("click", ".btn-del-tematica", function () {
        limparSelecionado();
        let dadosTematica = $(this).closest('tr').children("td").map(function () {
            return $(this).text();
        }).get();

        $("#idDeleteSelecionado").val(dadosTematica[0]);//Insere o ID no modal de excluir
        $("#tabelaSelecionada").val("tematica");//Insere a tabela no modal de excluir
        $('#modalDelete').modal('show')//Mostra modal

        $(this).closest('tr').addClass("selecionado");


        // tableTematica.row($(this).parents('tr')).remove().draw();
    });

    // window.history.pushState(null, null, window.location.pathname);



    //! FIM TEMATICA


    //? Modal cancelar
    $("#modalCancelar").click(function () {
        $('#modalDelete').modal('hide')
        $("#idDeleteSelecionado,#tabelaSelecionad").val("")
        //limparSelecionado();
    });


    //? Modal excluir
    $('#formDelete').submit(function (e) {
        e.preventDefault();//evita de dar reload na pagina

        var idDeleteSelecionado = $('#idDeleteSelecionado').val();
        var tabelaSelecionada = $('#tabelaSelecionada').val();

        $.ajax({
            url: '../backend/processar.php',
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
                    $('#tableDisciplinas tr').each(function () {
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
        // Get paging information
        var infoTem = tableTematica.page.info();
        // Number of deleted rows
        var numDeletedTem = 1;
        // Calculate number of pages after deleting rows
        var numPagesAfterTem = Math.ceil((infoTem.recordsDisplay - numDeletedTem) / infoTem.length);
        // If number of pages after deleting rows is less than total number of pages
        // and the last page is displayed
        if (numPagesAfterTem < infoTem.pages && infoTem.page === (infoTem.pages - 1)) {
            // Go to previous page using zero-based index
            tableTematica.page(numPagesAfterTem - 1);
        }
        // Reload table
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









