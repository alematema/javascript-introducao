var tabIndex=1;
onloadCalculaExibeImcPacientes();

function onloadCalculaExibeImcPacientes(){
  var pacientes = document.querySelectorAll('.paciente');
  for(var i=0; i < pacientes.length;i++){

    var pacienteTr = pacientes[i];
    if(pacienteTr.tabIndex==-1){
      pacienteTr.tabIndex=tabIndex++;
    }
    var paciente = recuperaPacienteDaLinhaTr(pacienteTr);
    var validacao = handleIMC(paciente, pacienteTr);
    atualizarToolTip(paciente,pacienteTr,validacao);
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

  botaoAdicionar.textContent='ADICIONAR';
  var botaoLimparFormulario = document.querySelector('#limpar-formulario-btn');
  botaoLimparFormulario.disabled = false;

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
   return pacienteTr==null;
}

function estahEditandoPaciente(){
  return pacienteTr!=null;
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

function recuperaPacienteDaLinhaTr(tr){

  //recupera nome
  var nome = tr.querySelector('.info-nome').textContent;
  //recupera massa
  var massa = tr.querySelector('.info-peso').textContent;
  //recupera Altura
  var altura = tr.querySelector('.info-altura').textContent;
  //recupera gordura
  var gordura = tr.querySelector('.info-gordura').textContent;
  //recupera imc
  var imc = tr.querySelector('.info-imc').textContent;

  var paciente =

  { nome:nome,
    peso:massa,
    altura:altura,
    gordura:gordura,
    imc:imc
  };

  return paciente;

}

function criarPacienteTr(paciente){

  var pacienteTr = document.createElement('tr');
  var nomeTd = document.createElement('td');
  var massaTd = document.createElement('td');
  var alturaTd = document.createElement('td');
  var gorduraTd = document.createElement('td');
  var imcTd = document.createElement('td');
  var trashTd = criaTrashIconPara(paciente);

  pacienteTr.classList.add('paciente');
  pacienteTr.tabIndex = tabIndex++;

  nomeTd.classList.add('info-nome');
  massaTd.classList.add('info-peso');
  alturaTd.classList.add('info-altura');
  gorduraTd.classList.add('info-gordura');
  imcTd.classList.add('info-imc');

  nomeTd.textContent = paciente.nome;
  massaTd.textContent = paciente.peso;
  alturaTd.textContent = paciente.altura;
  gorduraTd.textContent = paciente.gordura;

  pacienteTr.appendChild(nomeTd);
  pacienteTr.appendChild(massaTd);
  pacienteTr.appendChild(alturaTd);
  pacienteTr.appendChild(gorduraTd);
  pacienteTr.appendChild(imcTd);
  pacienteTr.appendChild(trashTd);

  return pacienteTr;

}

function atualizarToolTip(paciente,pacienteTr,validacao){

  var nomeTd = pacienteTr.querySelector('.info-nome');
  var massaTd = pacienteTr.querySelector('.info-peso');
  var alturaTd = pacienteTr.querySelector('.info-altura');
  var gorduraTd = pacienteTr.querySelector('.info-gordura');
  var imcTd = pacienteTr.querySelector('.info-imc');
  var trashTd = pacienteTr.querySelector('.trash');


  nomeTd.title='✍ clique para EDITAR ' + paciente.nome;
  massaTd.title='✍ clique para EDITAR o peso '+ paciente.peso;
  alturaTd.title='✍ clique para EDITAR a altura '+paciente.altura;
  gorduraTd.title='✍ clique para EDITAR a gordura '+ paciente.gordura;

  if(validacao.hasError){
    // var erros = { classes:[], messages:[], massaInvalida:false, alturaInvalida:false };
    // var validacao = {hasError:false,erros:erros};
    var imcTitle='☹ IMC não calculado \n';
    if(validacao.erros.massaInvalida){
      imcTitle+='a massa deve estar entre 0Kg e 1000Kg \n';
    }
    if(validacao.erros.alturaInvalida){
      if(imcTitle!='☹ IMC não calculado \n')imcTitle+='E\n';
      imcTitle+='a altura deve estar entre 0m e 3m'
    }

    imcTd.title = imcTitle;

  }else{
    imcTd.title = '😃 IMC '+ ' '+ paciente.peso+'/('+paciente.altura+'*'+paciente.altura+')'+'='+paciente.imc.toFixed(2);
  }

  trashTd.title='🗑 EXCLUI (' + paciente.nome + ','+paciente.peso+'kg'+','+paciente.altura+'m)';

}

function criaTrashIconPara(paciente){

  var trashTd = document.createElement('td');
  trashTd.classList.add('trash');
  trashTd.innerHTML='&#x1F5D1';
  trashTd.addEventListener('click',excluirPaciente);
  trashTd.title='EXCLUI ' + paciente.nome + ','+paciente.peso+'kg'+','+paciente.altura+'m';

  return trashTd;

}

function handleCriar(paciente){

  var pacienteTr = criarPacienteTr(paciente);

  var validacao = handleIMC(paciente, pacienteTr);

  atualizarToolTip(paciente,pacienteTr,validacao);

  var tabela = document.querySelector('#tabela-pacientes');
  tabela.appendChild(pacienteTr);

  pacienteTr.addEventListener('click',handlePrepararUpdate);
  pacienteTr.addEventListener('focus',handlePrepararUpdate);

  atualizarTabelaPacientes();

}

function handleEditar(paciente){

  var pacienteTr = getPacienteTr();

  pacienteTr.querySelector('.info-nome').textContent = paciente.nome;
  pacienteTr.querySelector('.info-peso').textContent = paciente.peso;
  pacienteTr.querySelector('.info-altura').textContent= paciente.altura;
  pacienteTr.querySelector('.info-gordura').textContent = paciente.gordura;

  var validacao = handleIMC(paciente,pacienteTr);

  atualizarToolTip(paciente,pacienteTr,validacao);

  setPacienteTr(null);

}

function limparFormulario(form){

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
  }

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

function setPacienteTr(newValue){
  pacienteTr = newValue;
}

function getPacienteTr(){
  return pacienteTr;
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

function handlePrepararUpdate(event){

  if(event.srcElement.classList.contains('trash')){
    limparFormulario(document.getElementById("form-adiciona"))
    return;
  }

  botaoAdicionar.textContent='EDITAR';
  var botaoLimparFormulario = document.querySelector('#limpar-formulario-btn');
  botaoLimparFormulario.disabled = true;


  var pacienteTr = event.srcElement;
  if(event.type=='click') pacienteTr = event.srcElement.parentNode;

  setPacienteTr(pacienteTr);

  limparFormulario(document.getElementById("form-adiciona"));

  preencheFormulario(pacienteTr);

}

function preencheFormulario(tr){

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

  limparFormulario(document.getElementById("form-adiciona"));
  atualizarTabelaPacientes();
  atualizarTabIndex();
  

}

function atualizarTabIndex(){

  var tabelaPacientes = document.querySelector('#tabela-pacientes');
  var pacientes = tabelaPacientes.querySelectorAll('tr');
  var quantidadePacientesNaTabela = pacientes.length;
  if(quantidadePacientesNaTabela != tabIndex){

    tabIndex=1;

    for(var paciente = 0; paciente < quantidadePacientesNaTabela; paciente++){

      pacientes[paciente].tabIndex=tabIndex++;

    }

  }

}

function limparForm(event){

  event.preventDefault();

  var form = document.getElementById("form-adiciona");

  limparFormulario(form);

  atualizarBotaoAdicionar();

}

function atualizarBotaoAdicionar(){

  var btnAdicionar = document.querySelector('#adicionar-paciente');

  if( ! estahEditandoPaciente() ){
    btnAdicionar.textContent = 'ADICIONAR'
  }else{
    btnAdicionar.textContent = 'EDITAR';
  }

}

function validaNomeInput(event){
  // console.log(event);
  // console.log(event.srcElement.value);
  // var form = document.getElementById("form-adiciona");
  // if(event.srcElement.value.trim()!=''){
  //   if(form.nome.classList.contains('campo-invalido')){
  //     form.nome.classList.remove('campo-invalido');
  //   }
  // }else{
  //   if(!form.nome.classList.contains('campo-invalido')){
  //     form.nome.classList.add('campo-invalido');
  //   }
  // }
}
