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
                    <th scope="row">${item.ID}</th>
                    <td>${item.nome}</td>
                    <td>${item.empresa}</td>
                    <td>${item.veiculo}</td>
                    <td>${item.placa}</td>
                </tr>`;
        });
    } catch (error) {
        console.error('Erro na busca:', error);
    }
}


async function gravarDados(event) {
    
    event.preventDefault();  // <--- OBRIGATÓRIO para não recarregar a página
    document.getElementById('placa').addEventListener('input', (e) => {
    e.target.style.borderColor = ''; // Limpa o vermelho quando ele digita
});

 

          
        
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
    
        
        
    
      } catch (error) {
        console.error('Erro ao gravar:', error);
    }
}
