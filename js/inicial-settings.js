atualizarTabelaPacientes();


function atualizarTabelaPacientes(){

  var tabelaPacientes = document.querySelector('#tabela-pacientes');
  var temPacienteNaTabela = tabelaPacientes.querySelectorAll('tr').length!=0;

  if(!temPacienteNaTabela){

    if(!document.querySelector('table').classList.contains('invisible-table')){

      document.querySelector('table').classList.add('invisible-table');
      document.querySelector('.msg-tabela-nao-vazia').classList.add('msg-tabela-vazia');
      document.querySelector('.msg-tabela-vazia').classList.remove('msg-tabela-nao-vazia');
      document.querySelector('.msg-tabela-vazia').innerHTML="Sem pacientes para exibir. Insira dados e clique em <strong class=\"botaoAdd\">ADICIONAR</strong>"

    }

  }else{

      document.querySelector('table').classList.remove('invisible-table');

      if(document.querySelector('.msg-tabela-vazia')!=null){

          if(!document.querySelector('.msg-tabela-vazia').classList.contains('msg-tabela-nao-vazia')){
              document.querySelector('.msg-tabela-vazia').classList.add('msg-tabela-nao-vazia');
              document.querySelector('.msg-tabela-nao-vazia').classList.remove('msg-tabela-vazia');
          }

      }
  }
}
