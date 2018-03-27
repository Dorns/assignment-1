var nome = document.querySelector('#nome');
var email = document.querySelector('#email'); 

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
  let updates = {};
  updates[`/clientes/${this.gerarID('clientes')}`] = {
    Nome: nome.value,
    Email: email.value,
  };
  
  firebase.database().ref().update(updates);

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

function gerarID(referencia){
  return firebase.database().ref().child(referencia).push().key;
}