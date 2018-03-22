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
console.log("funcao validarMassaEAltura passou nos testes ? "+testeOk);
//fim testes


//Cálculo do IMC (indice massa corpo)
//(https://pt.wikipedia.org/wiki/Índice_de_massa_corporal#Cálculo)
function calcularImcDo(paciente){
    //(https://pt.wikipedia.org/wiki/Índice_de_massa_corporal#Cálculo)
    paciente.imc = paciente.peso/(paciente.altura*paciente.altura);
    return paciente.imc;
}

function validarMassaEAlturaIMC(paciente){

  var erros = { classes:[], messages:[], massaInvalida:false, alturaInvalida:false };
  var validacao = {hasError:false,erros:erros};

  var massa = paciente.peso;
  var altura = paciente.altura;

  var massaValida = (massa > 0 && massa < 1000);
  var alturaValida = (altura > 0 && altura < 3.00);

  erros.massaInvalida=!massaValida;
  erros.alturaInvalida=!alturaValida;

  if(erros.massaInvalida || erros.alturaInvalida) validacao.hasError=true;

  return validacao;

}


function validarMassaAltura(massa,altura,erros){

   console.log('validando massa='+massa+' e altura='+altura);

   var massaValida = (massa > 0 && massa < 1000);
   var alturaValida = (altura > 0 && altura < 3.00);

   erros.massaInvalida=!massaValida;
   erros.alturaInvalida=!alturaValida;

   return massaValida && alturaValida;
 }
