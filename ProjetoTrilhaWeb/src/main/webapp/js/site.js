function validaFaleConosco(){
	
	var nome = document.frmfaleconosco.txtnome.value;
	var expRegNome = new RegExp("^[A-zÀ-ú]{3,}( [A-zÀ-ú]{2,})+$");
	
	if (!expRegNome.test(nome)) {
	    alert("Preencha o campo nome corretamente");
	    document.frmfaleconosco.txtnome.focus();
	    return false;
	}

	var fone = document.frmfaleconosco.txtfone.value;
	var expRegFone = new RegExp("^[(]{1}[1-9]{2}[)]{1}[0-9]{4,5}[-]{1}[0-9]{4}$");
	
	if (!expRegFone.test(fone)) {
	    alert("Preencha o campo telefone corretamente");
	    document.frmfaleconosco.txtfone.focus();
	    return false;
	}
	if(document.frmfaleconosco.txtemail.value==""){
		alert("Preencha o campo e-mail.");
		document.frmfaleconosco.txtemail.focus();
		return false;	
	}
	if(document.frmfaleconosco.selmotivo.value==""){
		alert("Preencha o campo motivo.");
		document.frmfaleconosco.selmotivo.focus();
		return false;	
	}
	if(document.frmfaleconosco.selmotivo.value=="PR"  && document.frmfaleconosco.opcaoProduto.value==""){
		alert("Preencha o campo produto.");
		document.frmfaleconosco.opcaoProduto.focus();
		return false;	
	}
	
	if(document.frmfaleconosco.txacomentario.value==""){
		alert("Preencha o campo comentário.");
		document.frmfaleconosco.txacomentario.focus();
		return false;	
	}
	return true;
}

function verificaMotivo(motivo){
	var elemento = document.getElementById("opcaoProduto");
	if(motivo=="PR"){
		var select = document.createElement("select");
		select.setAttribute("name", "selprodutos");
		
	var option = document.createElement("option");
	option.setAttribute("value", "");
	var texto = document.createTextNode("");
	option.appendChild(texto);
	
	select.appendChild(option);
	
	var option = document.createElement("option");
	option.setAttribute("value", "FR");
	var texto = document.createTextNode("Freezer");
	option.appendChild(texto);
	select.appendChild(option);
	
	var option = document.createElement("option");
	option.setAttribute("value", "GE");
	var texto = document.createTextNode("Geladeira");
	option.appendChild(texto);
	select.appendChild(option);
	
	elemento.appendChild(select);
	}else{
		if(elemento.firstChild){
			elemento.removeChild(elemento.firstChild);
		}
	}
	
}//final

//Assim que o documento HTML for carregado por completo.....
$(document).ready(function(){
	//Carrega cabeçalho, menu e rodapé aos respectivos locais
	$("header").load("/ProjetoTrilhaWeb/pages/site/general/cabecalho.html");
	$("nav").load("/ProjetoTrilhaWeb/pages/site/general/menu.html");
	$("footer").load("/ProjetoTrilhaWeb/pages/site/general/rodape.html");
	
})