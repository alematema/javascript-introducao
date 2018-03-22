var botaoAdicionar = document.querySelector('#adicionar-paciente');
botaoAdicionar.addEventListener('click',function(event){

  event.preventDefault();

  var form = document.querySelector('#form-adiciona');

  var validacao = validar(form);

  if(validacao.hasError) {
      aplicarCssErrosNoForm(form,validacao.erros);
      return;
  }

  var paciente = recuperaPacienteDoForm(form);

  if(estahCriandoPaciente()) handleCriar(paciente);//CRUD: Create
  if(estahEditandoPaciente()) handleEditar(paciente);//CRUD: Update

  limpaFormulario(form);

  botaoAdicionar.textContent='ADICIONAR';

});

function validar(form){

  var erros = {nomeVazio:false,massaVazia:false,alturaVazia:false,gorduraVazia:false};
  var validacao = {hasError:false,erros:erros};

  var nome = form.nome.value;
  var massa = form.peso.value;
  var altura = form.altura.value;
  var gordura = form.gordura.value;

  var temCampoInvalido=false;

  if(nome.trim()==''){
    erros.nomeVazio=true;
    temCampoInvalido=true;
  }

  if(massa.trim()==''){
    erros.massaVazia=true;
    temCampoInvalido=true;
  }

  if(altura.trim()==''){
    erros.alturaVazia=true;
    temCampoInvalido=true;
  }

  if(gordura.trim()==''){
    erros.gorduraVazia=true;
    temCampoInvalido=true;
  }

  if(temCampoInvalido) validacao.hasError=true;

  return validacao;
}

function aplicarCssErrosNoForm(form,erros){

  if(erros.nomeVazio){
    form.nome.classList.add('campo-invalido');
    form.nome.value='';
  }

  if(erros.massaVazia){
    form.peso.classList.add('campo-invalido');
    form.peso.value='';
  }

  if(erros.alturaVazia){
    form.altura.classList.add('campo-invalido');
    form.altura.value='';
  }

  if(erros.gorduraVazia){
    form.gordura.classList.add('campo-invalido');
    form.gordura.value='';
  }

}


function estahCriandoPaciente(){
   return linhaTabela==null;
}

function estahEditandoPaciente(){
  return linhaTabela!=null;
}

function recuperaPacienteDoForm(form){

  var paciente =

  { nome:form.nome.value,
    peso:form.peso.value,
    altura:form.altura.value,
    gordura:form.gordura.value,
    imc:0
  };

  return paciente;

}

function criaPacienteTr(paciente){

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

  nomeTd.textContent = paciente.nome;
  massaTd.textContent = paciente.peso;
  alturaTd.textContent = paciente.altura;
  gorduraTd.textContent = paciente.gordura;

  nomeTd.title='clique para EDITAR ' + paciente.nome;
  massaTd.title='clique para EDITAR o peso '+ paciente.peso;
  alturaTd.title='clique para EDITAR a altura '+paciente.altura;
  gorduraTd.title='clique para EDITAR a gordura '+ paciente.gordura;

  pacienteTr.appendChild(nomeTd);
  pacienteTr.appendChild(massaTd);
  pacienteTr.appendChild(alturaTd);
  pacienteTr.appendChild(gorduraTd);
  pacienteTr.appendChild(imcTd);

  return pacienteTr;

}

function criaTrashIconPara(paciente){
  var trashTd = document.createElement('td');
  trashTd.classList.add('trash');
  trashTd.innerHTML='&#x1F5D1';
  trashTd.addEventListener('click',excluirPaciente);
  trashTd.title='EXLCUI ' + paciente.nome + ','+paciente.peso+'kg'+','+paciente.altura+'m';

  return trashTd;

}

function handleCriar(paciente){

  var pacienteTr = criaPacienteTr(paciente);

  var trashTd = criaTrashIconPara(paciente);

  pacienteTr.appendChild(trashTd);

  calculaImcDo(pacienteTr);

  var tabela = document.querySelector('#tabela-pacientes');
  tabela.appendChild(pacienteTr);

  pacienteTr.addEventListener('click',populaFormulario);

}

function handleEditar(paciente){

  linhaTabela.querySelector('.info-nome').textContent = paciente.nome;
  linhaTabela.querySelector('.info-peso').textContent = paciente.peso;
  linhaTabela.querySelector('.info-altura').textContent= paciente.altura;
  linhaTabela.querySelector('.info-gordura').textContent = paciente.gordura;
  calculaImcDo(linhaTabela);
  linhaTabela = null;

}

function limpaFormulario(form){

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

}

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
