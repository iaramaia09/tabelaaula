// Declarando variáveis globais
let clientes = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo cliente
    let btnNovoCliente = document.getElementById("btnNovoCliente");
    let modalNovoCliente = document.getElementById("modalNovoCliente");
    let spanNovoCliente = modalNovoCliente.querySelector(".close");

    // Configurando eventos do modal novo cliente
    btnNovoCliente.onclick = function () {
        modalNovoCliente.style.display = "block";
    };

    spanNovoCliente.onclick = function () {
        modalNovoCliente.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoCliente) {
            modalNovoCliente.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar cliente por placa
function identifica(matricula) {
    for (let cliente of clientes) {
        if (cliente.matricula === matricula.id) {
            return cliente;
        }
    }
    return null;
}

// Função para exibir modal de informações do cliente
function modal(button) {
    let cliente = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do cliente
    let matriculaModal = modal.querySelector("#matriculaModal");
    let nomeModal = modal.querySelector("#nomeModal");
    let atendimentoModal = modal.querySelector("#atendimentoModal");
    let livroModal = modal.querySelector("#livroModal");
    let infraestruturaModal = modal.querySelector("#infraestruturaModal");
    let qualidadeServicoModal = modal.querySelector("#qualidadeServicoModal");
    let btnExcluirCliente = modal.querySelector("#btnExcluirCliente");

    if (!matriculaModal || !nomeModal || !atendimentoModal || !livroModal || !infraestruturaModal || !qualidadeServicoModal || !btnExcluirCliente) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    matriculaModal.innerHTML = cliente.matricula;
    nomeModal.innerHTML = cliente.nome;
    atendimentoModal.innerHTML = cliente.atendimento;
    livroModal.innerHTML = cliente.conhecimento;
    infraestruturaModal.innerHTML = cliente.infraestrutura;
    qualidadeServicoModal.innerHTML = cliente.qualidadeServico;

    // Configurando o botão de excluir
    btnExcluirCliente.onclick = function () {
        excluirCliente(cliente.matricula);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

// Função para excluir cliente
function excluirCliente(matricula) {
    clientes = clientes.filter(cliente => cliente.matricula !== matricula);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("tabela");
    clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    tabela.innerHTML = "";

    for (let cliente of clientes) {
        let botaoid = `<td><button id='${cliente.matricula}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${cliente.matricula}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.atendimento}</td>
            <td>${cliente.livro}</td>
            <td>${cliente.infraestrutura}</td>
            <td>${cliente.qualidadeServico}</td>
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo cliente
function cadastrarCliente() {
    let matricula = document.getElementById("matricula").value;
    let nome = document.getElementById("nome").value;
    let atendimento = document.getElementById("atendimento").value;
    let livro = document.getElementById("livro").value;
    let infraestrutura = document.getElementById("infraestrutura").value;
    let qualidadeServico = document.getElementById("qualidadeServico").value;

    // Verifica se a placa já está cadastrada
    if (clienteExistente(matricula)) {
        alert("Matrícula já cadastrada. Insira uma matrícula única.");
        return;
    }

    let novoCliente = {
        matricula: matricula,
        nome: nome,
        atendimento: atendimento,
        livro: livro,
        infraestrutura: infraestrutura,
        qualidadeServico: qualidadeServico
    };

    clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(novoCliente);

    // Salva no localStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Recarrega a tabela após cadastrar um novo cliente
    carrega();

    // Esconde o modal de novo cliente
    modalNovoCliente.style.display = "none";
}

// Função para verificar se o cliente já existe
function clienteExistente(matricula) {
    return clientes.some(cliente => cliente.matricula === matricula);
}