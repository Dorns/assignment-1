var nome = document.querySelector('#nome');
var email = document.querySelector('#email');
var tbClientes = localStorage.getItem("clientes") ? JSON.parse(localStorage.getItem('clientes')) : [];

function addForm(event) {
  event.preventDefault();

  var validaN = validaNome();
  var validaE = validaEmail();

  if (validaN==true && validaE==true){
    cadastraCli();
  }else{
    document.getElementById("divSucesso").style.display = 'none';
    limpaFormulario();
  }
}

function cadastraCli() {
  let cliente = JSON.stringify({
		Nome     : nome.value,
		Email    : email.value
  });
  tbClientes.push(cliente);
  localStorage.setItem("clientes", JSON.stringify(tbClientes));
  document.getElementById("divSucesso").style.display = 'block';
  limpaFormulario();
}

function validaNome() {
  if (!/[a-z]\s[a-z]/gim.test(this.nome.value)) {
    document.getElementById("erroNome").style.display = 'block';
    return false;
  }
  document.getElementById("erroNome").style.display = 'none';
  return true;
}

function validaEmail() {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email.value)){
    document.getElementById("erroEmail").style.display = 'block';
    return false;
  }
  document.getElementById("erroEmail").style.display = 'none';
  return true;
}

function limpaFormulario() {
  this.nome.value = "";
  this.email.value = "";
  this.nome.focus();
}