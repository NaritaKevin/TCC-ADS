tableDisciplina = $('#tableDisciplinas').DataTable({ // DataTable esta sendo usado para configurar a tabela, como linguagem
            responsive: true,
            ajax: {
                "url": "../backend/processar.php",
                "method": 'POST',
                "data": { buscaInicialDisciplina: buscaInicialDisciplina }, // as variaves bucasInicial.... possuem o valor para que no arquivo processar.php sirva 
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
                { data: 'disID' }, // o valor contido na variavel data, é o que sera buscado no banco de dados 
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