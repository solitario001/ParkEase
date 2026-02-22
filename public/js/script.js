(function() {

 const lista = document.querySelector('#corpo-tabela');
 const btnBuscar = document.getElementById('btnBuscar');
 const form = document.getElementById("meuFormulario");
 const form2 = document.getElementById("meuFormulario2");
 const btnRegister = document.getElementById('register');
 const btnCadastro = document.getElementById('Cadastro');
    
 let estaCadastrando = false;
 let estaEditando = false;
 let idatual = null;



 if (btnCadastro) {
     btnCadastro.addEventListener('click', () => {
     
     
        
        
        if (estaEditando ) {
           alert('Ediçao em andamento 55');
           return;
       } 
        
       
        estaCadastrando = true;

        bloquearEdicao(true);

        const collapse = document.getElementById('collapseExample');

        instanciaBS = bootstrap.Collapse.getOrCreateInstance(collapse);

        instanciaBS.show();
        
        

     });
     
 }





 if (btnBuscar) {
    
    btnBuscar.addEventListener('click', () => {
      
       if (estaEditando || estaCadastrando) {
           alert('Ediçao em andamento');
           return;
       } 

       realizarBuscaGeral();
    });

    
 }

  

    if (form) {
        
       if (estaEditando) {
           alert('Ediçao em andamento');
           return;
       } 

       

       form.addEventListener('submit', gravarDados);
         
    }



    if (form2) {
        
       if (estaEditando) {
           alert('Ediçao em andamento');
           return;
       } 

       form2.addEventListener('submit', atualizarDados);
         
    }





function bloquearEdicao(status) {
    
    
    
    // Busca todos os elementos que possuem o atributo data-id
    const botoes = document.querySelectorAll('[data-id]');
    const search = document.querySelectorAll('#btnBuscar');
    const register = document.querySelectorAll('#Cadastro')
    
    botoes.forEach(btn => {
        btn.disabled = status;
      
        if(status) {
            btn.style.opacity = "0.5";
        } else {
            btn.style.opacity = "1";
        }
    });

    search.forEach(btn => {
        btn.disabled = status;
      
        if(status) {
            btn.style.opacity = "0.7";
        } else {
            btn.style.opacity = "1";
        }
    });

    register.forEach(btn => {
        btn.disabled = status;
      
        if(status) {
            btn.style.opacity = "0.7";
        } else {
            btn.style.opacity = "1";
        }
    });
}


lista.addEventListener('click', function(event) {
    // Busca o botão mais próximo do clique que tenha a classe btn-danger
    const botao = event.target.closest('.btn-danger');
    const botao2 = event.target.closest('.btn-primary');
    
    // Se o clique foi em um botão de excluir...
    if (botao) {
        
        if (estaEditando) {
        alert("termine a ediçao first 1");
        return;
    }
        
        
        const idParaExcluir = botao.dataset.id;
        console.log("ID capturado:", idParaExcluir);
        
        dell(idParaExcluir);
    }

    if (botao2) {
        

        if (estaEditando) {
            alert("Ediçao em andamento");
            return;
        }
        
        bloquearEdicao(true);

        estaEditando = true;
        
        const idSelectEdit = botao2.dataset.id;
        console.log("ID capturado:", idSelectEdit);
        idatual = idSelectEdit;

        selectAlter(idSelectEdit);
    }



});

  

async function dell (id) {

    if (estaCadastrando) {
        alert('Cadastro em andamento');
        return;
    }
    
    try {
        
        const response = await fetch('http://localhost:3000/deletar-registro', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: id })
    });

    
    if (response) {
        console.log(`Sucesso: ${id}`);
        document.querySelector(`button[data-id="${id}"]`).closest('tr').remove();
    }
    
    
    
    } catch (error) {
     console.error("Erro no processo:", error)
    }
      
}


async function selectAlter(id) {

    
    if (estaCadastrando) {
        alert('Cadastro em andamento');
        return;
    }
    
    
    try {

        

        const response = await fetch(`http://localhost:3000/select?busca=` + id);
        
        const dados = await response.json();


        document.getElementById('nome2').value = dados[0]?.nome || "";
        document.getElementById('empresa2').value = dados[0]?.empresa || "";
        document.getElementById('veiculo2').value = dados[0]?.veiculo || "";
        document.getElementById('placa2').value = dados[0]?.placa || "";
     

        // 2. Agora busca o elemento do collapse
        const elementoCollapse = document.getElementById('collapseExample2');
        
        // 3. Inicializa o objeto do Bootstrap (se já não estiver inicializado)
        const instanciaBS = bootstrap.Collapse.getOrCreateInstance(elementoCollapse);
        
        
        // 4. Abre com animação suave
        instanciaBS.show();



    } catch (error) {
      console.error('Erro lol',error); 
    }
    
}





async function realizarBuscaGeral() {
    const termoBusca = document.getElementById('seuInputDeBusca').value;
    
    try {
        // Enviamos o termo na URL
        const response = await fetch(`http://localhost:3000/estacionamento?busca=${termoBusca}`);
        const dados = await response.json();

        const tbody = document.getElementById('corpo-tabela');
        tbody.innerHTML = '';

        dados.forEach(item => {
            tbody.innerHTML += `
                <tr>
                    <th scope="row" 
                    style="text-align: center;" 
                    >${item.ID}</th>
                    <td>${item.nome}</td>
                    <td>${item.empresa}</td>
                    <td>${item.veiculo}</td>
                    <td>${item.placa}</td>
                    
                    <td style="text-align: center;width: 0px;">
                   
                        <div style="padding: 0 15px;">
                            
                            <button data-id="${item.ID}" 
                            type= "button" 
                            class="btn btn-danger 
                            d-flex align-items-center gap-1">
                            <img src="assets/icons/trash.svg" 
                            width="12" 
                            height="16" 
                            style="filter: invert(1);"> 
                            </button>
                        
                        </div>
                    
                    </td>

                   <td style="text-align: center;width: 0px;">
                    
                        <div style="padding: 0 15px;">
                            
                            <button data-id="${item.ID}"
                            type="button"   
                            class="btn btn-primary 
                            d-flex align-items-center gap-1">
                            <img src="assets/icons/pencil-square.svg" 
                            width="12" 
                            height="16" 
                            style="filter: invert(1);"> 
                            </button>
                        
                        </div>
                        
                        </td>

                </tr>`;
                    
                    
                    
    
        });
    } catch (error) {
        console.error('Erro na busca:', error);
    }


  




}






async function gravarDados(event) {
    
    
    
  
  
  
    event.preventDefault(event);  // <--- OBRIGATÓRIO para não recarregar a página
    document.getElementById('placa').addEventListener('input', (e) => {
    e.target.style.borderColor = ''; // Limpa o vermelho quando ele digita
});

    if (estaEditando) {
        alert("termine a edição first 2");
        event.target.reset();
        return;
    }

        

        
    // 1. Coleta os 4 inputs
    const dados = {
        nome: document.getElementById('nome').value,
        empresa: document.getElementById('empresa').value,
        veiculo: document.getElementById('veiculo').value,
        placa: document.getElementById('placa').value
    };



    try {
        const response = await fetch('http://localhost:3000/estacionamento', {
            method: 'POST', // Mudamos para POST para gravar
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados) // Transforma o objeto em texto JSON
        });

        if (!response.ok) {
           
        
          const errodoback = await response.json();
        
          alert(errodoback.mensagem);

          const campoComErro = event.target.querySelector(`[name="${errodoback.campo}"]`);

          if (campoComErro) {
            
            
            campoComErro.value = ''; // Limpa só o que está errado
            campoComErro.focus();    // Foca no erro
            campoComErro.style.borderColor = 'red'; // Dica visual extra
          }


        }else{

         const errodoback = await response.json();

         alert(errodoback.mensagem);
         event.target.reset();
        }
    
        bloquearEdicao(false);
        
        const elementoCollapse =document.getElementById("collapseExample");
        
        const instanciaBS = bootstrap.Collapse.getOrCreateInstance(elementoCollapse);
    

        instanciaBS.hide();

        event.target.reset();

        estaCadastrando = false;


      } catch (error) {
        console.error('Erro ao gravar:', error);
    }
   


   


}

    







async function atualizarDados(event) {
    
    event.preventDefault();  // <--- OBRIGATÓRIO para não recarregar a página
    document.getElementById('placa2').addEventListener('input', (e) => {
    e.target.style.borderColor = ''; // Limpa o vermelho quando ele digita
});

 

          
        
    // 1. Coleta os 4 inputs
    const dados = {
        id: idatual,
        nome: document.getElementById('nome2').value,
        empresa: document.getElementById('empresa2').value,
        veiculo: document.getElementById('veiculo2').value,
        placa: document.getElementById('placa2').value,
        
    };



    try {
        const response = await fetch('http://localhost:3000/update', {
            method: 'POST', // Mudamos para POST para gravar
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados) // Transforma o objeto em texto JSON
        });

        if (!response.ok) {
           
        
          const errodoback = await response.json();
        
          alert(errodoback.mensagem);

          const campoComErro = event.target.querySelector(`[name="${errodoback.campo}"]`);

          if (campoComErro) {
            
            
            campoComErro.value = ''; // Limpa só o que está errado
            campoComErro.focus();    // Foca no erro
            campoComErro.style.borderColor = 'red'; // Dica visual extra
          }

       

        }else{

         const errodoback = await response.json();

         alert(errodoback.mensagem);
         event.target.reset();
        }
    
        
         // 2. Agora busca o elemento do collapse
        const elementoCollapse = document.getElementById('collapseExample2');
        
        // 3. Inicializa o objeto do Bootstrap (se já não estiver inicializado)
        const instanciaBS = bootstrap.Collapse.getOrCreateInstance(elementoCollapse);
        
        
        // 4. Abre com animação suave
        instanciaBS.hide();

        event.target.reset(); // 5. Limpa o formulario

        bloquearEdicao(false);

        realizarBuscaGeral();

        estaEditando = false;
    
      } catch (error) {
        console.error('Erro ao gravar:', error);
    }
}


})();