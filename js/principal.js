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
  console.log(tds);
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
