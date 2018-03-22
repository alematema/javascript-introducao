var botaoAdicionar = document.querySelector('#adicionar-paciente');
botaoAdicionar.addEventListener('click',function(event){
  event.preventDefault();
  var form = document.querySelector('#form-adiciona');
  var nome = form.nome.value;
  var massa = form.peso.value;
  var altura = form.altura.value;
  var gordura = form.gordura.value;

  var temCampoInvalido=false;
  if(nome.trim()==''){
    //console.log('nome invalido :(');
    form.nome.classList.add('campo-invalido');
    form.nome.value='';
    temCampoInvalido=true;
  }

  if(massa.trim()==''){
    form.peso.classList.add('campo-invalido');
    form.peso.value='';
    temCampoInvalido=true;
  }

  if(altura.trim()==''){
    form.altura.classList.add('campo-invalido');
    form.altura.value='';
    temCampoInvalido=true;
  }

  if(temCampoInvalido) return;

  if(linhaTabela==null){//Create
    var pacienteTr = document.createElement('tr');
    var nomeTd = document.createElement('td');
    var massaTd = document.createElement('td');
    var alturaTd = document.createElement('td');
    var gorduraTd = document.createElement('td');
    var imcTd = document.createElement('td');

    pacienteTr.classList.add('paciente');
    nomeTd.classList.add('info-nome');
    massaTd.classList.add('info-peso');
    alturaTd.classList.add('info-altura');
    gorduraTd.classList.add('info-gordura');
    imcTd.classList.add('info-imc');


    nomeTd.textContent = nome;
    massaTd.textContent = massa;
    alturaTd.textContent = altura;
    gorduraTd.textContent = gordura;

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(massaTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);
    var trashTd = document.createElement('td');
    trashTd.classList.add('trash');
    trashTd.innerHTML='&#x1F5D1';
    trashTd.addEventListener('click',excluirPaciente);
    trashTd.title='EXLCUI ' + nome + ','+massa+'kg'+','+altura+'m';
    nomeTd.title='clique para EDITAR ' + nome;
    massaTd.title='clique para EDITAR o peso '+ massa;
    alturaTd.title='clique para EDITAR a altura '+altura;
    gorduraTd.title='clique para EDITAR a gordura '+ gordura;
    pacienteTr.appendChild(trashTd);
  /*
    var editarTd = document.createElement('td');
    editarTd.classList.add('editar');
    editarTd.innerHTML='&#9997;';
    editarTd.addEventListener('click',editarPaciente);
    pacienteTr.appendChild(editarTd);
  */
    calculaImcDo(pacienteTr);

    var tabela = document.querySelector('#tabela-pacientes');
    tabela.appendChild(pacienteTr);
    pacienteTr.addEventListener('click',populaFormulario);

  }else{//update

    linhaTabela.querySelector('.info-nome').textContent = nome;
    linhaTabela.querySelector('.info-peso').textContent = massa;
    linhaTabela.querySelector('.info-altura').textContent= altura;
    linhaTabela.querySelector('.info-gordura').textContent = gordura;
    calculaImcDo(linhaTabela);
    linhaTabela = null;
  }

  if(form.nome.classList.contains('campo-invalido')){
    form.nome.classList.remove('campo-invalido');
  }
  if(form.peso.classList.contains('campo-invalido')){
    form.peso.classList.remove('campo-invalido');
  }
  if(form.altura.classList.contains('campo-invalido')){
    form.altura.classList.remove('campo-invalido');
  }
  if(form.gordura.classList.contains('campo-invalido')){
    form.gordura.classList.remove('campo-invalido');
  }

  form.nome.value = '';
  form.peso.value = '';
  form.altura.value = '';
  form.gordura.value = '';

  botaoAdicionar.textContent='ADICIONAR';

});

var linhaTabela = null;

var addPacienteTitulo = document.getElementById('titulo-form');
//console.log(addPacienteTitulo);
addPacienteTitulo.addEventListener('mouseover',hoverOnTituloPaciente);
addPacienteTitulo.addEventListener('mouseout', mouseOutTituloPaciente);
addPacienteTitulo.addEventListener('click', addClienteHabilitar);
var tituloMouseOut = addPacienteTitulo.textContent;
function hoverOnTituloPaciente(event){
    addPacienteTitulo.innerHTML='&#8855;'+'paciente';
}
function mouseOutTituloPaciente(event){
    addPacienteTitulo.innerHTML=tituloMouseOut;
}
function addClienteHabilitar(event){
  //console.log('clicado');
  document.getElementById("form-adiciona").classList.add('form-adiciona-habilitado');
}

function populaFormulario(event){

  if(event.srcElement.classList.contains('trash')) return;

  botaoAdicionar.textContent='EDITAR';

  var src = event.srcElement;
  var tr;
  if(src == undefined){
      tr = event;
  }else{
      tr = src.parentElement;
  }

  linhaTabela = tr;

  var nome = tr.querySelector('.info-nome').textContent;
  var massa = tr.querySelector('.info-peso').textContent;
  var altura = tr.querySelector('.info-altura').textContent;
  var gordura = tr.querySelector('.info-gordura').textContent;

  var form = document.querySelector('#form-adiciona');
  form.nome.value = nome;
  form.peso.value = massa;
  form.altura.value = altura;
  form.gordura.value = gordura;

}

function excluirPaciente(event){

  var tr = event;
  if(event.type=='click'){
    tr = event.srcElement;
  }
  var tr2 = tr.parentNode;
  tr2.parentNode.removeChild(tr2);

}
