var titulo = document.querySelector('.titulo');
titulo.textContent = 'Edna Nutricionista';


//Cálculo do IMC (indice massa corpo)
  var imc;
  //recupera massa
    var massa = document.querySelector('#primeiro-paciente').querySelector('.info-peso').textContent;
    console.log(massa);
  //recupera Altura
    var altura = document.querySelector('#primeiro-paciente').querySelector('.info-altura').textContent;
    console.log(altura);


    //validacoes
    var pesoEhValido = true; // assumindo de boa fé que o peso é válido
    var alturaEhValida = true; // assumindo de boa fé que a altura é válida

    if(massa <=0 || massa >= 1000) {
       pesoEhValido = false;
    }

    if(altura <= 0 || altura >= 3.00) {
      alturaEhValida = false;
    }

    if(!pesoEhValido && !alturaEhValida){
        document.querySelector('#primeiro-paciente').querySelector('.info-imc').textContent='massa e altura inválida';
        document.querySelector('#primeiro-paciente').querySelector('.info-peso').className='bad-info';
        document.querySelector('#primeiro-paciente').querySelector('.info-altura').className='bad-info';
    }else if(!pesoEhValido){
        document.querySelector('#primeiro-paciente').querySelector('.info-imc').textContent='massa inválida';
        document.querySelector('#primeiro-paciente').querySelector('.info-peso').className='bad-info';
    }else if(!alturaEhValida){
        document.querySelector('#primeiro-paciente').querySelector('.info-imc').textContent='altura inválida';
        document.querySelector('#primeiro-paciente').querySelector('.info-altura').className='bad-info';
    }else{

      //tudo ok, entao
      //calcula imc (https://pt.wikipedia.org/wiki/Índice_de_massa_corporal#Cálculo)
        imc = massa/(altura*altura);
        console.log('imc ' + imc);
        //exibe imc na linha correspondente
        document.querySelector('#primeiro-paciente').querySelector('.info-imc').textContent = imc;
    }
//fim Calculo IMC
