var titulo = document.querySelector('.titulo');
titulo.textContent = 'Aparecida Nutricionista';


//Cálculo do IMC (indice massa corpo)
  var imc;
  //recupera massa
    var massa = document.querySelector('#primeiro-paciente').querySelector('.info-peso').textContent;
    console.log(massa);
  //recupera Altura
    var altura = document.querySelector('#primeiro-paciente').querySelector('.info-altura').textContent;
    console.log(altura);
  //calcula imc (https://pt.wikipedia.org/wiki/Índice_de_massa_corporal#Cálculo)
    imc = massa/(altura*altura);
    console.log('imc ' + imc);
//fim Calculo

//exibe imc na linha correspondente
    document.querySelector('#primeiro-paciente').querySelector('.info-imc').textContent = imc;
