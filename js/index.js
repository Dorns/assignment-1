var nome = document.querySelector('#nome');
var email = document.querySelector('#email'); 
var empresa = document.querySelector('#empresa');

function addForm(event) {
  event.preventDefault();

  var validaN  = validaNome();
  var validaE  = validaEmail();
  var validaEm = validaEmpresa();

  if (validaN==true && validaE==true && validaEm==true){
    cadastraCli();
  }else{
    document.getElementById("divSucesso").style.display = 'none';
    limpaFormulario();
  }
}

function cadastraCli() {
  let updates = {};
  updates[`/clientes/${this.gerarID('clientes')}`] = {
    Name: nome.value,
    Email: email.value,
    Company: empresa.value
  };
  
  firebase.database().ref().update(updates);

  document.getElementById("divSucesso").style.display = 'block';
  limpaFormulario();
}

function validaNome() {
  var erroNome = document.getElementById("erroNome");
  if (!/[a-z]\s[a-z]/gim.test(this.nome.value)) {
    erroNome.style.display = 'block';
    erroNome.innerHTML = "Enter a valid full name!"
    return false;
  }
  erroNome.style.display = 'none';
  return true;
}

function validaEmail() {
  var erroEmail = document.getElementById("erroEmail");
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email.value)){
    erroEmail.style.display = 'block';
    erroEmail.innerHTML = "Enter a valid Email!"
    return false;
  }
  erroEmail.style.display = 'none';
  return true;
}

function validaEmpresa() {
  var erroEmpresa = document.getElementById("erroEmpresa");
  if (!/[a-z]/gim.test(this.empresa)) {
    erroEmpresa.style.display = 'block';
    erroEmpresa.innerHTML = "Enter a valid company name!"
    return false;
  }
  erroEmpresa.style.display = 'none';
  return true;
}

function limpaFormulario() {
  this.nome.value = "";
  this.email.value = "";
  this.empresa.value = "";
  this.nome.focus();
}

function gerarID(referencia){
  return firebase.database().ref().child(referencia).push().key;
}