var tabIndex=1;
onloadCalculaExibeImcPacientes();

function onloadCalculaExibeImcPacientes(){
  var pacientes = document.querySelectorAll('.paciente');
  for(var i=0; i < pacientes.length;i++){

    var pacienteTr = pacientes[i];
    // if(pacienteTr.tabIndex==-1){
    //   pacienteTr.tabIndex=tabIndex++;
    // }
    var paciente = recuperaPacienteDaLinhaTr(pacienteTr);
    var validacao = handleIMC(paciente, pacienteTr);
    atualizarToolTips(paciente,pacienteTr,validacao);
  }

}

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

  limparFormulario(form);

  });

//CRUD
//CReat
function handleCriar(paciente){

  var pacienteTr = criarPacienteTr(paciente);

  var validacao = handleIMC(paciente, pacienteTr);

  atualizarToolTips(paciente,pacienteTr,validacao);

  var tabela = document.querySelector('#tabela-pacientes');
  tabela.appendChild(pacienteTr);

  pacienteTr.addEventListener('click',handlePrepararUpdate);
  pacienteTr.addEventListener('focus',handlePrepararUpdate);

  atualizarTabelaPacientes();

  botaoAdicionar.textContent='ADICIONAR';
  var botaoLimparFormulario = document.querySelector('#limpar-formulario-btn');
  botaoLimparFormulario.disabled = false;

}

//Update
function handlePrepararUpdate(event){

  if(event.srcElement.classList.contains('trash')){
    return;
  }

  var pacienteTr = event.srcElement;
  if(event.type=='click') pacienteTr = event.srcElement.parentNode;


  //permite trocar usuarios para update
  //reabilita exclusao do ultimo paciente
  //se esta se tentando editar o mesmo paciente que o
  //do click anterior, reseta 
  if(getPacienteTr()!=null){
     enableLixeira(getPacienteTr());
     if(getPacienteTr() == pacienteTr){
       limparForm();
       setPacienteTr(null);
       botaoAdicionar.textContent='ADICIONAR';
       var botaoLimparFormulario = document.querySelector('#limpar-formulario-btn');
       botaoLimparFormulario.disabled = false;
       return;
     }
  }

  botaoAdicionar.textContent='EDITAR';
  var botaoLimparFormulario = document.querySelector('#limpar-formulario-btn');
  botaoLimparFormulario.disabled = true;


  disableLixeira(pacienteTr);

  setPacienteTr(pacienteTr);

  limparFormulario(document.getElementById("form-adiciona"));

  preencheFormulario(pacienteTr);

}
//Update
function handleEditar(paciente){

  var pacienteTr = getPacienteTr();

  pacienteTr.querySelector('.info-nome').textContent = paciente.nome;
  pacienteTr.querySelector('.info-peso').textContent = paciente.peso;
  pacienteTr.querySelector('.info-altura').textContent= paciente.altura;
  pacienteTr.querySelector('.info-gordura').textContent = paciente.gordura;

  var validacao = handleIMC(paciente,pacienteTr);

  enableLixeira(pacienteTr);

  atualizarToolTips(paciente,pacienteTr,validacao);

  setPacienteTr(null);

  botaoAdicionar.textContent='ADICIONAR';
  var botaoLimparFormulario = document.querySelector('#limpar-formulario-btn');
  botaoLimparFormulario.disabled = false;

}
//Delete
function excluirPaciente(event){

  var trPaciente = event.srcElement.parentElement.parentElement;
  var table = trPaciente.parentNode;
  table.removeChild(trPaciente);

  atualizarTabelaPacientes();

}
//CRUD:FIM


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



function handleIMC(paciente, pacienteTr){

  var validacao = validarMassaEAlturaIMC(paciente);

  if(validacao.hasError){

    handleImcMassaAlturaErros(paciente,pacienteTr,validacao.erros);

  }else{

    handleImcMassaAlturaOk(paciente,pacienteTr);

  }

  return validacao;

}

function handleImcMassaAlturaOk(paciente,pacienteTr){

  var imc = calcularImcDo(paciente);

  //exibe imc na linha correspondente ao paciente
  pacienteTr.querySelector('.info-imc').textContent = imc.toFixed(2);

  pacienteTr.querySelector('.info-peso').classList.remove('bad-info');
  pacienteTr.querySelector('.info-altura').classList.remove('bad-info');
  pacienteTr.querySelector('.info-peso').classList.remove('paciente-invalido');
  pacienteTr.querySelector('.info-altura').classList.remove('paciente-invalido');
  var tds = pacienteTr.getElementsByTagName('td');

  for(var i=0;i<tds.length;i++){

    tds[i].classList.add('paciente-valido');

    if(!tds[i].classList.contains('paciente-valido'))tds[i].classList.add('paciente-valido');
    tds[i].classList.remove('paciente-invalido');

  }

  var lixeira = getLixeira(pacienteTr);
  lixeira.classList.add('paciente-valido');
  if(!lixeira.classList.contains('paciente-valido'))tds[i].lixeira.classList.add('paciente-valido');
  lixeira.classList.remove('paciente-invalido');

}

function handleImcMassaAlturaErros(paciente,pacienteTr,erros){

  if(erros.massaInvalida && erros.alturaInvalida){
      erros.classes=['.info-peso','.info-altura'];
      erros.messages=['massa','altura'];
      handleCssDadosInvalidos(paciente,pacienteTr,erros);
  }else if(erros.massaInvalida){
      erros.classes=['.info-peso'];
      erros.messages=['massa'];
      handleCssDadosInvalidos(paciente,pacienteTr,erros);
  }else if(erros.alturaInvalida){
      erros.classes=['.info-altura'];
      erros.messages=['altura'];
      handleCssDadosInvalidos(paciente,pacienteTr,erros);
  }

}

function handleCssDadosInvalidos(paciente,pacienteTr,erros){

  pacienteTr.classList.add('paciente-invalido');
  var tds = pacienteTr.getElementsByTagName('td');

  for(var i=0;i<tds.length;i++){
    if(!tds[i].classList.contains('paciente-invalido'))tds[i].classList.add('paciente-invalido');
    tds[i].classList.remove('paciente-valido');

  }
  var lixeira = getLixeira(pacienteTr);
  if(!lixeira.classList.contains('paciente-invalido'))lixeira.classList.add('paciente-invalido');
  lixeira.classList.remove('paciente-valido');
  //pacienteTr.style.backgroundColor='lightcoral';
  var msg='';

  for(var i = 0; i < erros.classes.length; i++){

    msg+=erros.messages[i];

    pacienteTr.querySelector(erros.classes[i]).classList.remove('paciente-invalido');
    if(!pacienteTr.querySelector(erros.classes[i]).classList.contains('bad-info'))
      pacienteTr.querySelector(erros.classes[i]).classList.add('bad-info');

    if(i<erros.classes.length-1){//poe virgula até a penultima palavra
      msg+=',';
    }else{// ajusta singular ou plural da mensagem, dependendo do numero de erros
      if(i>=1)msg+=' inválidas';
      else msg+=' inválida';
    }

  }

  pacienteTr.querySelector('.info-imc').textContent=msg;
  paciente.imc = msg;

}



var pacienteTr = null;

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
  document.getElementById("form-adiciona").classList.add('form-adiciona-habilitado');
}


function testa(event) {
  console.log(event);
}

function validaNomeInput(event){
}
