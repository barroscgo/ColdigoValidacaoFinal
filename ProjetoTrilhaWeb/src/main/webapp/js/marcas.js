COLDIGO.marca = new Object();

$(document).ready(function(){
	
	
	
	
	
	//Cadastra marcas no BD
	COLDIGO.marca.cadastro = function(){
		
		var marca = new Object();
		marca.nome = document.frmAddMarca.marca.value
		
		if(marca.nome == ""){
			COLDIGO.exibirAviso("Preencha todos os campos!")
		}else{
			$.ajax({
				type: "POST",
				url: COLDIGO.PATH + "marca/inserir",
				data: JSON.stringify(marca),
				success: function(msg){
					COLDIGO.exibirAviso(msg)
					$("#addMarca").trigger("reset")
				},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao cadastrar um novo produto: "+ info.status + " -"+ info.statusText);
				}
			});
		}
	};
	
	//Busca no BD e exibe na página os produtos que atendam á solicitação do usuário
	COLDIGO.marca.buscarPorNome = function(){
		
		var valorBusca = $("#campoBuscarMarca").val();
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorNome",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				
				dados = JSON.parse(dados);
				console.log(dados);
				$("#listaMarcas").html(COLDIGO.marca.exibir(dados));
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
			}
			
			
		});
		
	};
	//Transforma os dados dos produtos recebidos do servidor em uma tabela HTML
	COLDIGO.marca.exibir = function(listaDeMarcas) {
   
    var tabela = "<table>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Marca</th>" +
        "<th class='acoes'>Ações</th>" +
        "</tr>";

    if (listaDeMarcas != undefined && listaDeMarcas.length > 0) {
   		 for (var i = 0; i < listaDeMarcas.length; i++) {
        	tabela += "<tr>" +
	            "<td>" + listaDeMarcas[i].id + "</td>" +
	            "<td>" + listaDeMarcas[i].nome + "</td>" +
	            "<td>" +
	            "<a onclick=\"COLDIGO.marca.exibirEdicao('" + listaDeMarcas[i].id + "')\"><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
	            "<a onclick=\"COLDIGO.marca.excluir('" + listaDeMarcas[i].id + "')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
	            "</td>" +
	            "</tr>";
    }
      
    } else if (listaDeMarcas == "") {
        tabela += "<tr><td colspan='6'> Nenhum registro encontrado</td ></tr > "
    }
    tabela += "</table>";
    return tabela;
};
	COLDIGO.marca.buscarPorNome();

//Exclui o produto selecionado
	COLDIGO.marca.excluir = function(id){
		$.ajax({
			type: "DELETE",
			url: COLDIGO.PATH + "marca/excluir/" + id,
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscarPorNome();
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao excluir marca: "+ info.status + " - " + info.statusText);

			}
		});
	};
	
	COLDIGO.marca.exibirEdicao = function(id){
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorId",
			data: "id="+id,
			success: function(marca){
				document.frmEditaMarca.idMarca.value = marca.id;
				document.frmEditaMarca.nome.value = marca.nome;
				
				var modalEditaMarca = {
					title: "Editar Marca",
					height: 400,
					width: 550,
					modal: true,
					buttons: {
						"Salvar": function() {
							COLDIGO.marca.editar();
						},
						"Cancelar": function() {
							$(this).dialog("close");
						},
						close: function() {

						}
					}
				};
				$("#modalEditaMarca").dialog(modalEditaMarca);
		
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao buscar marca na edição: "+ info.status + " - " + info.statusText);
			}
		});
	};
	
	//Realiza a edição dos dados no BD
	COLDIGO.marca.editar = function() {

		var marca = new Object();
		marca.id = document.frmEditaMarca.idMarca.value;
		marca.nome = document.frmEditaMarca.nome.value;

		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "marca/alterar",
			data: JSON.stringify(marca),
			success: function(msg) {
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscarPorNome();
				$("#modalEditaMarca").dialog("close");
			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao editar marca: " + info.status + " - " + info.statusText);
			}
		});

	};

});