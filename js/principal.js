//Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
var titulo = document.querySelector('.titulo');
titulo.textContent = 'Edna Nutricionista';
//alguns testes da funcao validar massa e altura
var testeOk=true;
var erros = { 'classes':[], 'messages':[], 'massaInvalida':false, 'alturaInvalida':false };
testeOk=testeOk&&(validarMassaAltura(800,2,erros)==true);//massa valida e altura valida
testeOk=testeOk&&erros.massaInvalida==false&&erros.alturaInvalida==false;
erros = { 'classes':[], 'messages':[], 'massaInvalida':false, 'alturaInvalida':false };
testeOk=testeOk&&(validarMassaAltura(800,3,erros)==false);//altura invalida : extremo 3
testeOk=testeOk&&erros.massaInvalida==false&&erros.alturaInvalida==true;
erros = { 'classes':[], 'messages':[], 'massaInvalida':false, 'alturaInvalida':false };
testeOk=testeOk&&(validarMassaAltura(800,0,erros)==false);//altura invalida: extremo 0
testeOk=testeOk&&erros.massaInvalida==false&&erros.alturaInvalida==true;
erros = { 'classes':[], 'messages':[], 'massaInvalida':false, 'alturaInvalida':false };
testeOk=testeOk&&(validarMassaAltura(1000,2,erros)==false);//massa invalida: extremo 1000
testeOk=testeOk&&erros.massaInvalida==true&&erros.alturaInvalida==false;
erros = { 'classes':[], 'messages':[], 'massaInvalida':false, 'alturaInvalida':false };
testeOk=testeOk&&(validarMassaAltura(0,2,erros)==false);//massa invalida: extremo 0
testeOk=testeOk&&erros.massaInvalida==true&&erros.alturaInvalida==false;
erros = { 'classes':[], 'messages':[], 'massaInvalida':false, 'alturaInvalida':false };
testeOk=testeOk&&(validarMassaAltura(1001,2,erros)==false);//massa invalida: maior que extremo 1000
testeOk=testeOk&&erros.massaInvalida==true&&erros.alturaInvalida==false;
console.log("funcao validarMassaAltura passou nos testes ? "+testeOk);
//fim testes
calculaExibeImcPacientes();

function calculaExibeImcPacientes(){
  var pacientes = document.querySelectorAll('.paciente');
  for(var i=0; i < pacientes.length;i++){
    var paciente = pacientes[i];
    calculaImcDo(paciente)
  }
}
//Cálculo do IMC (indice massa corpo)
//(https://pt.wikipedia.org/wiki/Índice_de_massa_corporal#Cálculo)
function calculaImcDo(paciente){

      var erros = { 'classes':[], 'messages':[], 'massaInvalida':false, 'alturaInvalida':false };

      if(validarMassaEAltura(paciente,erros)){
          //recupera massa
          var massa = paciente.querySelector('.info-peso').textContent;
          //recupera Altura
          var altura = paciente.querySelector('.info-altura').textContent;
            //calcula imc (https://pt.wikipedia.org/wiki/Índice_de_massa_corporal#Cálculo)
          var imc = massa/(altura*altura);
          //exibe imc na linha correspondente ao paciente
          paciente.querySelector('.info-imc').textContent = imc.toFixed(2);

      }else{//massa e/ou altura inválido(s)

          aplicarCssDErrosNaLinhaDo(paciente,erros);

      }
}
function handleDadosInvalidos(paciente,erros){

  paciente.classList.add('paciente-invalido');
  var tds = paciente.getElementsByTagName('td');

  for(var i=0;i<tds.length;i++){
    tds[i].classList.add('paciente-invalido');
  }
  //paciente.style.backgroundColor='lightcoral';
  var msg='';

  for(var i = 0; i < erros.classes.length; i++){

    msg+=erros.messages[i];

    paciente.querySelector(erros.classes[i]).classList.remove('paciente-invalido');
    paciente.querySelector(erros.classes[i]).classList.add('bad-info');

    if(i<erros.classes.length-1){//poe virgula até a penultima palavra
      msg+=',';
    }else{// ajusta singular ou plural da mensagem, dependendo do numero de erros
      if(i>=1)msg+=' inválidas';
      else msg+=' inválida';
    }

  }

  paciente.querySelector('.info-imc').textContent=msg;

}

function validarMassaAltura(massa,altura,erros){

  console.log('validando massa='+massa+' e altura='+altura);

  var massaValida = (massa > 0 && massa < 1000);
  var alturaValida = (altura > 0 && altura < 3.00);

  erros.massaInvalida=!massaValida;
  erros.alturaInvalida=!alturaValida;

  return massaValida && alturaValida;
}

function validarMassaEAltura(paciente,erros){
  //recupera massa
  var massa = paciente.querySelector('.info-peso').textContent;
  //recupera Altura
  var altura = paciente.querySelector('.info-altura').textContent;

  return validarMassaAltura(massa,altura,erros);
}

function aplicarCssDErrosNaLinhaDo(paciente,erros){

  if(erros.massaInvalida && erros.alturaInvalida){
      erros.classes=['.info-peso','.info-altura'];
      erros.messages=['massa','altura'];
      handleDadosInvalidos(paciente,erros);
  }else if(erros.massaInvalida){
      erros.classes=['.info-peso'];
      erros.messages=['massa'];
      handleDadosInvalidos(paciente,erros);
  }else if(erros.alturaInvalida){
      erros.classes=['.info-altura'];
      erros.messages=['altura'];
      handleDadosInvalidos(paciente,erros);
  }

}

titulo.addEventListener('click',mostraMensagem);
function mostraMensagem(){
  console.log('titulo foi clicado');
}

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



});

var addPacienteTitulo = document.getElementById('titulo-form');
console.log(addPacienteTitulo);
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
  console.log('clicado');
  document.getElementById("form-adiciona").classList.add('form-adiciona-habilitado');
}

function populaFormulario(event){

  var src = event.srcElement;
  var tr;
  if(src == undefined){
      tr = event;
  }else{
      tr = src.parentElement;
  }

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
