## ParkEase


# 🛡️ Sistema de Estacionamento - Front-end Blindado

Este projeto foi desenvolvido com foco em **Segurança de Escopo** e **Performance**, fugindo do padrão comum de variáveis globais.

## 🚀 Implementações de Segurança

### 1. Encapsulamento com IIFE
Todo o script principal foi envolvido em uma **IIFE (Immediately Invoked Function Expression)**. Isso garante que:
- Nenhuma variável (como `estaEditando`) ou função (`gravarDados`) fique exposta no objeto global `window`.
- Usuários mal-intencionados não consigam manipular o estado do sistema via **Console (F12)**.

### 2. Gestão de Estado (State Management)
Implementei travas lógicas para impedir conflitos de dados:
- **Modo Edição:** Bloqueia novos cadastros e buscas enquanto um registro está sendo alterado.
- **Trava de UI:** Desabilita botões e aplica feedback visual (opacidade) para guiar o fluxo do usuário.

### 3. Delegação de Eventos (Event Delegation)
Em vez de múltiplos listeners ou o uso de `onclick` no HTML, utilizei a técnica de delegação no elemento pai (`lista`). 
- **Vantagem:** Redução drástica no uso de memória e suporte automático para elementos criados dinamicamente.

## 🛠️ Tecnologias Utilizadas
- **JavaScript (ES6+)** - Lógica encapsulada.
- **Bootstrap 5** - Interface responsiva com componentes `Collapse`.
- **Fetch API** - Comunicação assíncrona com o servidor.



<p align="center">
  <video src="https://github.com/user-attachments/assets/3956ed59-6a05-43ca-a2db-b639a96b82b2" autoplay loop muted playsinline width="70%"></video>
  <br>
  <em>Demonstração do sistema ParkEase em funcionamento</em>
</p>





## Licença
Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
