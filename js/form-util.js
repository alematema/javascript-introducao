function enableLixeira(pacienteTr){

  var lixeira = getLixeira(pacienteTr);
  lixeira.disabled=false;
  lixeira.title = lastTrashToolTip;

}
var lastTrashToolTip='';
function disableLixeira(pacienteTr){

  var lixeira = getLixeira(pacienteTr);
  lixeira.disabled=true;
  lastTrashToolTip=lixeira.title;

  lixeira.title = '🚫 excluir não permitido enquanto editar';

}

//Encontra a lixeira
function getLixeira(pacienteTr){

  var tds = pacienteTr.getElementsByTagName('td');
  var lixeira;
  for(var i=0;i<tds.length;i++){

    if(tds[i].children[0] != undefined && tds[i].children[0].classList.contains('trash')){

        lixeira = tds[i].children[0];
        break;
    }
  }

  return lixeira;

}

function setPacienteTr(newValue){
  pacienteTr = newValue;
}

function getPacienteTr(){
  return pacienteTr;
}


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

function criaTrashIconPara(paciente){

  var trashButton = document.createElement('button');

  trashButton.classList.add('trash');
  trashButton.innerHTML='&#x1F5D1';
  trashButton.addEventListener('click',excluirPaciente);
  trashButton.title='EXCLUI ' + paciente.nome + ','+paciente.peso+'kg'+','+paciente.altura+'m';

  var trashTd = document.createElement('td');
  trashTd.appendChild(trashButton);

  return trashTd;

}

function atualizarToolTipLixeira(pacienteTr){

  var lixeira = getLixeira(pacienteTr);

}

function atualizarToolTips(paciente,pacienteTr,validacao){

  var nomeTd = pacienteTr.querySelector('.info-nome');
  var massaTd = pacienteTr.querySelector('.info-peso');
  var alturaTd = pacienteTr.querySelector('.info-altura');
  var gorduraTd = pacienteTr.querySelector('.info-gordura');
  var imcTd = pacienteTr.querySelector('.info-imc');
  var lixeira = getLixeira(pacienteTr);


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

  lixeira.title='🗑 EXCLUI (' + paciente.nome + ','+paciente.peso+'kg'+','+paciente.altura+'m)';

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

function limparForm(){

  var form = document.getElementById("form-adiciona");

  limparFormulario(form);

  return false;

}

function atualizarBotaoAdicionar(){

  var btnAdicionar = document.querySelector('#adicionar-paciente');

  if( ! estahEditandoPaciente() ){
    btnAdicionar.textContent = 'ADICIONAR'
  }else{
    btnAdicionar.textContent = 'EDITAR';
  }

}
