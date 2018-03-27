var nome = document.querySelector('#nome');
var email = document.querySelector('#email');
var tbClientes = localStorage.getItem("tbClientes");

function addForm(event) {
  tbClientes = JSON.parse(tbClientes); 
  if(tbClientes == null) 
    tbClientes = [];

  event.preventDefault();

  if (validaForm()==false){
    limpaFormulario();
  }else{
    cadastraCli();
    limpaFormulario();
  }
}

function validaForm() {
  if (!/[a-z]\s[a-z]/gim.test(this.nome.value)) {
    document.getElementById("nome").style.color = "red";
    return false;
  }
    
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email.value)){
    document.getElementById("email").style.color = "red";
    return false;
  }
  return true;
}

function cadastraCli() {
  let cliente = JSON.stringify({
		Nome     : nome.value,
		Email    : email.value
  });
  tbClientes.push(cliente);
  localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
}

function limpaFormulario() {
  this.nome.value = "";
  this.email.value = "";
  this.nome.focus();
}