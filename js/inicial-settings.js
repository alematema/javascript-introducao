atualizarTabelaPacientes();


function atualizarTabelaPacientes(){

  var tabelaPacientes = document.querySelector('#tabela-pacientes');
  var temPacienteNaTabela = tabelaPacientes.querySelectorAll('tr').length!=0;

  if(!temPacienteNaTabela){

    // console.log('NAO tem paciente');

    if(!document.querySelector('table').classList.contains('invisible-table')){
      // console.log('NAO contem invisible-table');

      document.querySelector('table').classList.add('invisible-table');
      // console.log('ADD invisible-table');

      document.querySelector('.msg-tabela-nao-vazia').classList.add('msg-tabela-vazia');
      // console.log('ADD msg-tabela-vazia');
      document.querySelector('.msg-tabela-vazia').classList.remove('msg-tabela-nao-vazia');
      // console.log('DELETE msg-tabela-nao-vazia');
      document.querySelector('.msg-tabela-vazia').innerHTML="Sem pacientes para exibir. Clique em <strong class=\"botaoAdd\">ADICIONAR</strong>"

    }

  }else{

    // console.log('>>TEM paciente');

    document.querySelector('table').classList.remove('invisible-table');
    // console.log('>>DELETE invisible-table');

    if(document.querySelector('.msg-tabela-vazia')!=null){
      if(!document.querySelector('.msg-tabela-vazia').classList.contains('msg-tabela-nao-vazia')){
        // console.log('>> NAO contem msg-tabela-nao-vazia');
        document.querySelector('.msg-tabela-vazia').classList.add('msg-tabela-nao-vazia');
        // console.log('>> ADD msg-tabela-nao-vazia');
        document.querySelector('.msg-tabela-nao-vazia').classList.remove('msg-tabela-vazia');
        // console.log('>> DELETE msg-tabela-vazia');

    }

    }
  }
}
