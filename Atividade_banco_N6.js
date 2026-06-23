const lerTeclado = require('readline-sync');

// ================= MENU INICIAL =================

function exibirMenu() {
    console.log(`
    ===========================
            BANCO SYSBANK 
    ===========================
      Selecione uma das opcoes:
      1 - Acessar conta
      2 - Criar conta PF 
      3 - Criar conta PJ
      0 - Sair
`)
    let opcao = lerTeclado.questionInt(`Digite a opção desejada:\n`)

    switch (opcao) {
        case 1:
            acessarConta();
            break;
        case 2:
            criarContaPF()
            break;
        case 3:
            criarContaPJ()
            break;
        case 0:
            console.log("Finalizando e Saindo... Obrigado por acessar!");
            break;
        default:
            console.log("Opção invalida");
            exibirMenu()
            break;
    };
}

// ================= BASE DE CONTAS =================

let contasSalvas = [{
    usuario: "joana",
    cpf: "999.999.999-99",
    email: "jo@gmail.com",
    dataNascimento: "27/09/2004",
    senha: 123456,
    numConta: 876543,
    saldo: 0,
    tipoConta: 'Pessoa Fisica',
    investimentos: 0,
    bonus: 0
}];

// ================= CRIAR CONTA =================

function criarContaPF() {

    let conta = {
        usuario: "",
        cpf: "",
        email: "",
        dataNascimento: "",
        senha: 0,
        numConta: null,
        saldo: 0,
        tipoConta: null,
        investimentos: 0,
        bonus: 0
    }

    conta.tipoConta = 'Pessoa Fisica'

    while (conta.usuario.length <= 1) {
        conta.usuario = lerTeclado.question("Digite seu nome completo:\n")
            .toUpperCase()
            .trim();

        if (conta.usuario.length <= 1)
            console.log("Nome inválido.");
    }

    while (!(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/.test(conta.cpf))) {
        conta.cpf = lerTeclado.question("Digite seu CPF:\n")
            .trim()
            .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

        if (!/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/.test(conta.cpf))
            console.log("CPF invalido");
    }

    while (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(conta.email)) {
        conta.email = lerTeclado.questionEMail("Digite seu email:\n")
            .trim()

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(conta.email))
            console.log("E-mail invalido");
    }

    let anoNascimento = 0, mesNascimento = 0, diaNascimento = 0

    while (anoNascimento < 1900 || anoNascimento > new Date().getFullYear() - 18) {
        anoNascimento = lerTeclado.questionInt("Digite o ano que nasceu:\n")
    }

    while (mesNascimento < 1 || mesNascimento > 12) {
        mesNascimento = lerTeclado.questionInt("Digite o mês que nasceu:\n");
    }

    while (!validarDiaNascimento(mesNascimento, diaNascimento)) {
        diaNascimento = lerTeclado.questionInt("Digite o dia que nasceu:\n");
    }

    conta.dataNascimento = new Date(anoNascimento, mesNascimento - 1, diaNascimento).toLocaleDateString('pt-BR');

    conta.senha = criarSenha()

    conta.numConta = numeroConta()

    console.table(conta);

    contasSalvas.push(conta)

    exibirMenu()
}

// ================= FUNÇÕES AUX =================

function criarSenha() {
    let senha = 0;
    while (senha.toString().length !== 6) {
        senha = lerTeclado.questionInt(`Digite uma senha de 6 números:\n`)
    }
    return senha;
}

function validarDiaNascimento(mes, dia) {
    let meses31 = [1, 3, 5, 7, 8, 10, 12];
    let meses30 = [4, 6, 9, 11];

    if (mes === 2 && dia <= 28 && dia > 0) return true
    if (meses30.includes(mes) && dia <= 30 && dia > 0) return true
    if (meses31.includes(mes) && dia <= 31 && dia > 0) return true

    return false
}

function numeroConta() {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

// ================= MENU CONTA =================

function menuConta(conta) {
    console.log(`
    ===========================
            BANCO SYSBANK
    ===========================
        Olá ${conta.usuario}
      Saldo: R$ ${conta.saldo}
      Bônus: R$ ${conta.bonus.toFixed(2)}
    ---------------------------
      1 - Depositar
      2 - Sacar
      3 - Extrato
      4 - Empréstimo
      5 - Investimentos
      6 - Recarga celular
      0 - Sair
`)

    let op = lerTeclado.questionInt("Escolha: ");

    switch (op) {
        case 1:
            depositar(conta);
            break;
        case 2:
            sacar(conta);
            break;
        case 3:
            console.log(conta);
            menuConta(conta);
            break;
        case 4:
            emprestimo(conta);
            break;
        case 5:
            menuInvestimentos(conta);
            break;
        case 6:
            recargaCelular(conta);
            break;
        case 0:
            exibirMenu();
            break;
    }
}

// ================= ACESSO =================

function acessarConta() {
    let numeroConta = lerTeclado.questionInt("Digite o número da sua conta:\n");
    let senha = lerTeclado.questionInt("Digite sua senha: \n")

    for (let i = 0; i < contasSalvas.length; i++) {
        if (contasSalvas[i].numConta == numeroConta && contasSalvas[i].senha == senha) {
            menuConta(contasSalvas[i])
            return
        }
    }
    console.log("Numero conta ou senha invalidos!");
    acessarConta()
}

// ================= OPERAÇÕES =================

function depositar(conta) {
    let valor = lerTeclado.questionFloat("Valor depósito: ");
    conta.saldo += valor;

    sistemaBonus(conta, valor);

    menuConta(conta);
}

function sacar(conta) {
    let valor = lerTeclado.questionFloat("Valor saque: ");

    if (valor > conta.saldo) {
        console.log("Saldo insuficiente");
    } else {
        conta.saldo -= valor;
    }

    menuConta(conta);
}

// ================= EMPRÉSTIMO =================

function emprestimo(conta) {
    console.log(`
    1 - Empréstimo pessoal
    2 - Empréstimo consignado
    3 - Simulação de empréstimo
    4 - Consultar empréstimos
    0 - Voltar`);

    let op = lerTeclado.questionInt("Escolha: ");

    if (op === 1) {
        let valor = lerTeclado.questionFloat("Valor empréstimo: ");
        let taxa = 8; // 8% de taxa de juros (alto risco - empréstimo pessoal)
        let parcelas = lerTeclado.questionInt("Número de parcelas desejadas: ");

        // ================= VALIDAÇÕES DE CRÉDITO PESSOAL =================
        // 1. Verificar se valor é válido
        if (valor <= 0) {
            console.log("Valor inválido.");
            return menuConta(conta);
        }

        // 2. Limitar valor máximo de empréstimo
        // (bancos normalmente liberam entre 2x e 5x da renda ou limite fixo)
        let limiteMaximo = conta.saldo * 5; // exemplo: até 5x o saldo atual

        if (valor > limiteMaximo) {
            console.log(`Você pode solicitar até R$ ${limiteMaximo.toFixed(2)}.`);
            return menuConta(conta);
        }
        // 3. Limitar número de parcelas
        if (parcelas < 1 || parcelas > 48) {
            console.log("Número de parcelas inválido (1 a 48).");
            return menuConta(conta);
        }

        // ================= APROVAÇÃO =================
        console.log(`Total a pagar: R$ ${(valor + (valor * taxa / 100 * parcelas)).toFixed(2)}`);
        console.log("Deseja confirmar o empréstimo? (S/N)");

        let confirmacao = lerTeclado.question().toUpperCase();

        if (confirmacao === "S") {
            console.log(`Emprestimo de R$ ${valor.toFixed(2)} aprovado!`);
            conta.saldo += valor;
            menuConta(conta);

        } else {
            console.log("Emprestimo cancelado.");
            menuConta(conta);
        }
    }

    if (op === 2) {
        let valor = lerTeclado.questionFloat("Valor empréstimo: ");
        let taxa = 3; // 3% de taxa de juros
        let parcelas = lerTeclado.questionInt("Número de parcelas desejadas(max. 48): ");
        let renda = lerTeclado.questionInt("Informe sua renda mensal: ")

        if (valor <= 0) {
            console.log("Valor inválido.");
            return menuConta(conta);
        }
        // 2. Limitar valor máximo de empréstimo
        let limiteMaximo = renda * 0.3

        // ================= VALIDAÇÕES CONSIGNADO =================
        if (valor > limiteMaximo) {
            console.log(`Você pode solicitar até R$ ${limiteMaximo.toFixed(2)}.`);
            return menuConta(conta);
        }
        // 3. Limitar número de parcelas
        if (parcelas < 1 || parcelas > 48) {
            console.log("Número de parcelas inválido (1 a 48).");
            return menuConta(conta);
        }

        let valorParcela = (valor + (valor * taxa / 100 * parcelas)) / parcelas;

        // ================= SE PASSOU NAS REGRAS =================
        console.log(`Total a pagar: R$ ${(valor + (valor * taxa / 100 * parcelas)).toFixed(2)}`);
        console.log("Deseja confirmar o empréstimo? (S/N)");

        let confirmacao = lerTeclado.question().toUpperCase();

        if (confirmacao === "S") {
            console.log(`Emprestimo de R$ ${valor.toFixed(2)} aprovado!`);
            conta.saldo += valor;
            menuConta(conta);

        } else {
            console.log("Emprestimo cancelado.");
            menuConta(conta);
        }
    }

    else if (op === 3) {
        let valor = lerTeclado.questionFloat("Simular emprestimo - Valor: ");
        let taxa = lerTeclado.questionFloat("Informe a taxa de juros: ")
        let parcelas = lerTeclado.questionInt("Número de parcelas desejadas(min. 1, max. 48): ");

        let total = valor + (valor * taxa / 100 * parcelas);

        console.log(`Total a pagar simulação: R$ ${total.toFixed(2)}`);
        console.log(`O valor de cada parcela será de R$ ${(total / parcelas).toFixed(2)}`);
        console.log(`Fazer simulação de novo? (S/N)`);

        let confirmacao = lerTeclado.question().toUpperCase();

        if (confirmacao === "S") {
            emprestimo(conta);
        }
        else {
            menuConta(conta);
        }
    }

    else if (op === 4) {
        console.log("Consulta de empréstimos não implementada ainda.");
        menuConta(conta);
    }

    else if (op === 0) {
        menuConta(conta);
    }
}

// ================= INVESTIMENTOS =================

function menuInvestimentos(conta) {
    console.log(`
    1 - Renda Fixa
    2 - Renda Variável
    3 - Consultar investimentos
    4 - Resgatar investimentos
    0 - Voltar
    `);

    let op = lerTeclado.questionInt("Escolha: ");

    if (op === 1) investimentos(conta, "fixa");
    if (op === 2) investimentos(conta, "variavel");
    if (op === 3) consultarInvestimentos(conta);
    if (op === 4) resgatarInvestimentos(conta);
    if (op === 0) menuConta(conta);
}

function investimentos(conta, tipo) {
    let valor = lerTeclado.questionFloat("Valor a investir: ");

    if (valor > conta.saldo) {
        console.log("Saldo insuficiente");
        return menuConta(conta);
    }

    conta.saldo -= valor;

    let rendimento = calcularRendimento(valor, tipo);

    conta.investimentos += valor;

    console.log(`Rendimento estimado: R$ ${rendimento.toFixed(2)}`);

    menuConta(conta);
}

function consultarInvestimentos(conta) {
    console.log(`Total investido: R$ ${conta.investimentos.toFixed(2)}`);
    menuInvestimentos(conta);
}

function calcularRendimento(valor, tipo) {
    if (tipo === "fixa") return valor * 0.02;
    return valor * (Math.random() * 0.1);
}

function resgatarInvestimentos(conta) {
    if (conta.investimentos <= 0) {
        console.log("Você não possui investimentos para resgatar.");
        return menuInvestimentos(conta);
    }

    let valor = lerTeclado.questionFloat("Valor a resgatar: ");

    if (valor > conta.investimentos) {
        console.log("Valor maior que o total investido.");
        return menuInvestimentos(conta);
    }

    conta.investimentos -= valor;

    conta.saldo += valor;

    console.log(`Resgate realizado com sucesso! R$ ${valor.toFixed(2)} creditado na conta.`);

    menuConta(conta);
}

// ================= RECARGA =================

function recargaCelular(conta) {
    let valor = lerTeclado.questionFloat("Valor recarga: ");
    let numeroCelular = lerTeclado.question("Número do celular: ");

    if (valor > conta.saldo) {
        console.log("Saldo insuficiente");
    } else {
        conta.saldo -= valor;
        console.log("Recarga realizada!");
    }

    menuConta(conta);
}

// ================= BONUS =================

function sistemaBonus(conta, valor) {
    let cashback = valor * 0.5 / 100; // 0.5% de cashback
    console.log(`Você recebeu R$ ${cashback.toFixed(2)} de cashback!`);
    conta.bonus += cashback;
}

// ================= START =================

exibirMenu();