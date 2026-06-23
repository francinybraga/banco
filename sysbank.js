// ============================================================
// BANCO SYSBANK - Sistema bancário simples (Trabalho SENAI)
// ============================================================

// Franciny Braga, Gabriel Freitas, Juçara Dassi e Yasmin Kawakame

const lerTeclado = require("readline-sync");

let contasSalvas = [
  {
    usuario: "JOANA",
    cpf: "999.999.999-99",
    email: "jo@gmail.com",
    dataNascimento: "27/09/2004",
    senha: "123456",
    numConta: "876543",
    saldo: 0,
    tipoConta: "Pessoa Fisica",
    extrato: [],
    notificacoes: [],
    investimentos: 0,
    bonus: 0
  },
];

// ============================================================
// MENU PRINCIPAL
// ============================================================
function exibirMenu() {
  console.log(`
    ===========================
            BANCO SYSBANK 
    ===========================
      Selecione uma das opções:
      1 - Acessar conta
      2 - Criar conta pessoa 
      3 - Criar conta empresa
      0 - Sair
`);
  let opcao = lerTeclado.questionInt(`Digite a opção desejada:\n`);

  switch (opcao) {
    case 1:
      acessarConta();
      break;
    case 2:
      criarContaPF();
      break;
    case 3:
      criarContaPJ();
      break;
    case 0:
      console.log("Finalizando e Saindo... Obrigado por acessar!");
      break;
    default:
      console.log("Opção invalida");
      exibirMenu(); // chama o menu de novo até o usuário digitar algo válido
      break;
  }
}

// ============================================================
// CRIAÇÃO DE CONTA - PESSOA FÍSICA
// ============================================================
function criarContaPF() {
  let conta = {
    usuario: "",
    cpf: "",
    email: "",
    dataNascimento: "",
    senha: "",
    numConta: null,
    saldo: 0,
    tipoConta: "Pessoa Fisica",
    extrato: [],
    notificacoes: [],
    investimentos: 0,
    bonus: 0
  };

const regexApenasLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

while (true) {
  conta.usuario = lerTeclado.question("Digite seu nome completo:\n")
    .trim();

  // Verifica se o nome tem tamanho mínimo e se passa no teste da Regex
  if (conta.usuario.length > 1 && regexApenasLetras.test(conta.usuario)) {
    conta.usuario = conta.usuario.toUpperCase();
    break; // Sai do loop se for válido
  } else {
    console.log("Nome inválido. Digite apenas letras (sem números ou caracteres especiais).");
  }
}

  // --- CPF (aceita digitar com ou sem pontuação, formata sozinho) ---
  while (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(conta.cpf)) {
    let cpfLimpo = lerTeclado.question("Digite seu CPF:\n").trim().replace(/\D/g, ""); // remove tudo que não é número
    conta.cpf = cpfLimpo.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4",
    );
    if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(conta.cpf))
      console.log("CPF inválido. Certifique-se de digitar os 11 números.");
  }
  // --- E-mail ---
  while (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(conta.email)) {
    conta.email = lerTeclado.questionEMail("Digite seu email:\n").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(conta.email))
      console.log("E-mail inválido");
  }
  // --- Data de nascimento (com validação de maioridade e dias por mês) ---
  let anoNascimento = 0,
    mesNascimento = 0,
    diaNascimento = 0;

  while (anoNascimento < 1900 || anoNascimento > new Date().getFullYear() - 18) {
    anoNascimento = lerTeclado.questionInt("Digite o ano que nasceu:\n");
    if (anoNascimento < 1900 || anoNascimento > new Date().getFullYear() - 18)
      console.log("Ano de nascimento inválido (Mínimo 18 anos).");
  }

  while (mesNascimento < 1 || mesNascimento > 12) {
    mesNascimento = lerTeclado.questionInt("Digite o mês que nasceu:\n");
    if (mesNascimento < 1 || mesNascimento > 12) console.log("Mês inválido.");
  }

  while (!validarDiaNascimento(mesNascimento, diaNascimento)) {
    diaNascimento = lerTeclado.questionInt("Digite o dia que nasceu:\n");
    if (!validarDiaNascimento(mesNascimento, diaNascimento))
      console.log("Dia inválido.");
  }

  conta.dataNascimento = new Date(
    anoNascimento,
    mesNascimento - 1,
    diaNascimento,
  ).toLocaleDateString("pt-BR");

  conta.senha = criarSenha();
  conta.numConta = numeroConta();

  console.log(`NUMERO DA CONTA: ${conta.numConta} - SENHA: ${conta.senha}`);

  depositoInicial(conta);

  contasSalvas.push(conta);

  exibirMenu();
}

// ============================================================
// CRIAÇÃO DE CONTA - PESSOA JURÍDICA
// ============================================================
function criarContaPJ() {
  let conta = {
    usuario: "",
    cnpj: "",
    email: "",
    senha: "",
    numConta: null,
    saldo: 0,
    tipoConta: "Pessoa Juridica",
    extrato: [],
    notificacoes: [],
    investimentos: 0,
    bonus: 0
  };

  // --- Nome fantasia ---
  while (conta.usuario.length <= 1) {
    conta.usuario = lerTeclado
      .question("Digite o nome fantasia da empresa:\n")
      .toUpperCase()
      .trim();

    if (conta.usuario.length <= 1) console.log("Nome inválido.");
  }

  while (!/^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-\d{2}$/.test(conta.cnpj,)) {
    let cnpjLimpo = lerTeclado
      .question("Digite o CNPJ:\n")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, ""); // remove pontos, barra, traço etc.

    conta.cnpj = cnpjLimpo.replace(
      /^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})(\d{2})$/,
      "$1.$2.$3/$4-$5",
    );

    if (
      !/^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-\d{2}$/.test(
        conta.cnpj,
      )
    )
      console.log("CNPJ inválido.");
  }

  // --- E-mail ---
  while (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(conta.email)) {
    conta.email = lerTeclado.questionEMail("Digite seu email:\n").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(conta.email))
      console.log("E-mail invalido");
  }

  // --- Senha e número da conta ---
  conta.senha = criarSenha();
  conta.numConta = numeroConta();

  console.log(`NUMERO DA CONTA: ${conta.numConta} - SENHA: ${conta.senha}`);

  depositoInicial(conta);

  contasSalvas.push(conta);

  exibirMenu();
}

function criarSenha() {
  let senha = "";
  while (!/^\d{6}$/.test(senha)) {
    senha = lerTeclado.question("Digite uma senha de 6 números: ").trim();
    if (!/^\d{6}$/.test(senha))
      console.log("A senha deve conter exatamente 6 números.");
  }
  console.log("Senha criada com sucesso!");
  return senha;
}

function validarDiaNascimento(mes, dia) {
  let meses31 = [1, 3, 5, 7, 8, 10, 12];
  let meses30 = [4, 6, 9, 11];

  if (mes === 2 && dia <= 28 && dia > 0) {
    return true;
  } else if (meses30.includes(mes) && dia <= 30 && dia > 0) {
    return true;
  } else if (meses31.includes(mes) && dia <= 31 && dia > 0) {
    return true;
  }
  return false;
}

function numeroConta() {
  let numConta = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return numConta;
}

function depositoInicial(conta) {
  let valor = lerTeclado.questionFloat("Digite o valor do depósito inicial (mínimo R$100): ",);
  
  while (valor < 100) {
    console.log("Valor inválido. O depósito mínimo é R$100,00.");
    valor = lerTeclado.questionFloat("Digite o valor novamente: ");
  }

  conta.saldo += valor;
  sistemaBonus(conta, valor);
  addHistorico(conta, "Depósito Inicial", valor);
  console.log(`Depósito inicial de R$ ${valor.toFixed(2)} realizado com sucesso!`,);
}

function menuConta(contaLogada) {
  console.log(`
    ===========================
            BANCO SYSBANK
    ===========================
        Olá, ${contaLogada.usuario} 
        (${contaLogada.tipoConta})
      Saldo: R$ ${contaLogada.saldo.toFixed(2)}
      Bônus: R$ ${(contaLogada.bonus || 0).toFixed(2)}
    ---------------------------
      1 - Depositar
      2 - Sacar
      3 - Extrato
      4 - Transferência
      5 - Empréstimo
      6 - Investimentos
      7 - Recarga celular
      0 - Sair
`);
  let opcao = lerTeclado.questionInt(`Digite a opção desejada:\n`);

  switch (opcao) {
    case 1:
      depositar(contaLogada);
      menuConta(contaLogada);
      break;
    case 2:
      sacar(contaLogada);
      menuConta(contaLogada);
      break;
    case 3:
      extrato(contaLogada);
      menuConta(contaLogada);
      break;
    case 4:
      tranferencias(contaLogada);
      menuConta(contaLogada);
      break;
    case 5:
      emprestimo(contaLogada);
      menuConta(contaLogada);
      break;
    case 6:
      menuInvestimentos(contaLogada);
      menuConta(contaLogada);
      break;
    case 7:
      recargaCelular(contaLogada);
      menuConta(contaLogada);
      break;
    case 0:
      console.log("Finalizando e Saindo... Obrigado por acessar!");
      exibirMenu();
      break;
    default:
      console.log("Opção inválida!");
      menuConta(contaLogada);
      break;
  }
}

// ============================================================
// ACESSAR CONTA (LOGIN)
// ============================================================
function acessarConta() {
  let numeroContaDigitado = lerTeclado.question("Digite o número da sua conta: ",);
  let senhaDigitada = lerTeclado.question("Digite sua senha: ");

  for (let i = 0; i < contasSalvas.length; i++) {
    if (
      contasSalvas[i].numConta == numeroContaDigitado &&
      contasSalvas[i].senha == senhaDigitada
    ) {
      menuConta(contasSalvas[i]);
      return;
    }
  }

  console.log("Número de conta ou senha inválidos!");
  exibirMenu();
}

// ============================================================
// CONSULTAR SALDO
// ============================================================
function verSaldo(contaLogada) {
  console.log("\n=== SALDO ATUAL ===");
  console.log(`Cliente: ${contaLogada.usuario}`);
  console.log(`Saldo: R$ ${contaLogada.saldo.toFixed(2)}`);
  console.log("===================\n");
}

// ============================================================
// DEPOSITAR
// ============================================================
function depositar(contaLogada) {
  let valorDeposito = lerTeclado.questionFloat(
    "Qual valor deseja depositar?\n",
  );

  if (valorDeposito <= 0) {
    console.log("Valor de depósito inválido!");
    return;
  }

  contaLogada.saldo += valorDeposito;
  sistemaBonus(contaLogada, valorDeposito);
  addHistorico(contaLogada, "Depósito", valorDeposito);

  console.log(
    `Depósito de R$ ${valorDeposito.toFixed(2)} realizado com sucesso!`,
  );
  console.log(`Saldo atual: R$ ${contaLogada.saldo.toFixed(2)}`);
}

// ============================================================
// SACAR
// ============================================================
function sacar(contaLogada) {
  let valorSaque = lerTeclado.questionFloat(
    "Qual o valor que deseja sacar?\n",
  );

  if (valorSaque <= 0) {
    console.log("Valor de saque inválido!");
    return;
  }

  if (contaLogada.saldo >= valorSaque) {
    contaLogada.saldo -= valorSaque;
    addHistorico(contaLogada, "Saque", -valorSaque);
    console.log("Saque realizado com sucesso!");
    verSaldo(contaLogada);
  } else {
    console.log("Saldo insuficiente");
  }
}

// ============================================================
// EXTRATO
// ============================================================
// function extrato(contaLogada) {
//   const hoje = new Date();
//   console.log("\n==============================");
//   console.log(`EXTRATO - Data: ${hoje.toLocaleDateString("pt-BR")}`);
//   console.log("==============================");
//   verSaldo(contaLogada);
//   console.log("==============================\n");
// }

function extrato(contaLogada) {
  console.log("\n========== EXTRATO ==========");

  if (contaLogada.extrato.length === 0) {
    console.log("Nenhuma movimentação encontrada.");
  } else {
    for (let movimentacao of contaLogada.extrato) {
      console.log(
        `${movimentacao.data} | ${movimentacao.tipo} | R$ ${movimentacao.valor.toFixed(2)}`
      );
    }
  }

  console.log("-----------------------------");
  console.log(`Saldo: R$ ${contaLogada.saldo.toFixed(2)}`);
  console.log("=============================\n");
}

function validacaoDeSenha(contaOrigem) {
  let tentativas = 0;

  while (tentativas < 4) {
    let digiteSenha = lerTeclado.question("Digite a senha: ");
    if (digiteSenha === contaOrigem.senha) {
      console.log("Senha correta!");
      return true;
    } else {
      tentativas++;
      console.log(`Senha incorreta. Tentativa ${tentativas}/4`);
    }
  }

  console.log("Número máximo de tentativas excedido.");
  return false;
}

// ============================================================
// TRANSFERÊNCIAS (PIX, DOC, TED)
// ============================================================
function tranferencias(contaLogada) {

  let origem = contaLogada;
 
  let valorTransferencia = lerTeclado.questionFloat("Valor: ");
  let opcao = lerTeclado.questionInt("1) PIX 2) DOC 3) TED: ");
 
  let contaDestino = lerTeclado.question("Digite conta destino: ");
  let destino = contasSalvas.find((c) => c.numConta == contaDestino);
 
  if (!destino) {
    console.log("Conta destino não encontrada!");
    return;
  }
 
  if (origem.numConta === destino.numConta) {
    console.log("Não é possível transferir para a própria conta!");
    return;
  }
 
  if (valorTransferencia <= 0) {
    console.log("Valor de transferência inválido!");
    return;
  }
 
  if (origem.saldo < valorTransferencia) {
    console.log("Saldo insuficiente!");
    return;
  }
 
  switch (opcao) {
    case 1:
      realizarPix(origem, destino, valorTransferencia);
      break;
    case 2:
      realizarDoc(origem, destino, valorTransferencia);
      break;
    case 3:
      realizarTed(origem, destino, valorTransferencia);
      break;
    default:
      console.log("Opção inválida");
  }
}
 
function realizarPix(origem, destino, valor) {
  if (validacaoDeSenha(origem)) {
    origem.saldo -= valor;
    destino.saldo += valor;
    addHistorico(origem, "PIX", -valor);
    console.log("PIX realizado!");
  } else {
    console.log("Transferência cancelada.");
  }
}
 
function realizarDoc(origem, destino, valor) {
  if (validacaoDeSenha(origem)) {
    origem.saldo -= valor;
    destino.saldo += valor;
    addHistorico(origem, "DOC", -valor);
    setTimeout(() => {
      console.log("DOC concluído!");
    }, 3000);
  } else {
    console.log("Transferência cancelada.");
  }
}
 
function realizarTed(origem, destino, valor) {
  if (validacaoDeSenha(origem)) {
    origem.saldo -= valor;
    destino.saldo += valor;
    addHistorico(origem, "TED", -valor);
    setTimeout(() => {
      console.log("TED concluído!");
    }, 2000);
  } else {
    console.log("Transferência cancelada.");
  }
}

// ============================================================
// HISTÓRICO DE OPERAÇÕES
// ============================================================
function addHistorico(conta, descricao, valor) {
  let dataHora = new Date().toLocaleString("pt-BR", {
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric",
    hour: "2-digit", 
    minute: "2-digit"
  });

  conta.extrato.push({
    tipo: descricao,
    valor: valor,
    data: dataHora
  });
}

function enviarNotificacao(conta, mensagem){
  conta.notificacoes.push(mensagem);
  console.log(`\n NOTIFICAÇÃO: ${mensagem}`);
}

function gerarInfos(contaLogada) {
  console.log("\n========== RELATÓRIO DA CONTA ==========");
  console.log(`Cliente: ${contaLogada.usuario}`);
  console.log(`Tipo de Conta: ${contaLogada.tipoConta}`);
  console.log(`Email cadastrado: ${contaLogada.email}`);
  console.log(`Total de operações realizadas: ${contaLogada.extrato.length}`);
  
  let totalEntradas = 0;
  let totalSaidas = 0;
  let totalSacadoconta = 0;

  for (let mov of contaLogada.extrato) {
    if (mov.valor > 0) {
      totalEntradas += mov.valor;
    }
    
    if (mov.valor < 0) {
      totalSaidas += mov.valor;
      
      if (mov.tipo.includes("Saque")) {
        totalSacadoconta += mov.valor;
      }
    }
  }

  console.log(`Total de Entradas: R$ ${totalEntradas.toFixed(2)}`);
  console.log(`Total Sacado (Dinheiro físico): R$ ${Math.abs(totalSacadoconta).toFixed(2)}`);
  console.log(`Total Geral de Saídas (Saques + Envios): R$ ${Math.abs(totalSaidas).toFixed(2)}`);
  console.log("========================================\n");
}

// ============================================================
// EMPRÉSTIMO
// ============================================================
function emprestimo(conta) {
  console.log(`
    1 - Empréstimo pessoal
    2 - Empréstimo consignado
    3 - Simulação de empréstimo
    0 - Voltar`);

  let op = lerTeclado.questionInt("Escolha: ");

  if (op === 1) {
    let valor = lerTeclado.questionFloat("Valor empréstimo: ");
    let taxa = 8;
    let parcelas = lerTeclado.questionInt("Número de parcelas desejadas: ");

    if (valor <= 0) {
      console.log("Valor inválido.");
      return;
    }

    let limiteMaximo = conta.saldo * 5;

    if (valor > limiteMaximo) {
      console.log(`Você pode solicitar até R$ ${limiteMaximo.toFixed(2)}.`);
      return;
    }

    if (parcelas < 1 || parcelas > 48) {
      console.log("Número de parcelas inválido (1 a 48).");
      return;
    }

    console.log(`Total a pagar: R$ ${(valor + (valor * taxa / 100 * parcelas)).toFixed(2)}`);
    console.log("Deseja confirmar o empréstimo? (S/N)");

    let confirmacao = lerTeclado.question().toUpperCase();

    if (confirmacao === "S") {
      console.log(`Emprestimo de R$ ${valor.toFixed(2)} aprovado!`);
      conta.saldo += valor;
      addHistorico(conta, "Empréstimo Pessoal", valor);
    } else {
      console.log("Emprestimo cancelado.");
    }
  } else if (op === 2) {
    let valor = lerTeclado.questionFloat("Valor empréstimo: ");
    let taxa = 3;
    let parcelas = lerTeclado.questionInt("Número de parcelas desejadas(max. 48): ");
    let renda = lerTeclado.questionInt("Informe sua renda mensal: ");

    if (valor <= 0) {
      console.log("Valor inválido.");
      return;
    }

    let limiteMaximo = renda * 0.3;

    if (valor > limiteMaximo) {
      console.log(`Você pode solicitar até R$ ${limiteMaximo.toFixed(2)}.`);
      return;
    }

    if (parcelas < 1 || parcelas > 48) {
      console.log("Número de parcelas inválido (1 a 48).");
      return;
    }

    console.log(`Total a pagar: R$ ${(valor + (valor * taxa / 100 * parcelas)).toFixed(2)}`);
    console.log("Deseja confirmar o empréstimo? (S/N)");

    let confirmacao = lerTeclado.question().toUpperCase();

    if (confirmacao === "S") {
      console.log(`Emprestimo de R$ ${valor.toFixed(2)} aprovado!`);
      conta.saldo += valor;
      addHistorico(conta, "Empréstimo Consignado", valor);
    } else {
      console.log("Emprestimo cancelado.");
    }
  } else if (op === 3) {
    let valor = lerTeclado.questionFloat("Simular emprestimo - Valor: ");
    let taxa = lerTeclado.questionFloat("Informe a taxa de juros: ");
    let parcelas = lerTeclado.questionInt("Número de parcelas desejadas(min. 1, max. 48): ");

    let total = valor + (valor * taxa / 100 * parcelas);

    console.log(`Total a pagar simulação: R$ ${total.toFixed(2)}`);
    console.log(`O valor de cada parcela será de R$ ${(total / parcelas).toFixed(2)}`);
    console.log(`Fazer simulação de novo? (S/N)`);

    let confirmacao = lerTeclado.question().toUpperCase();

    if (confirmacao === "S") {
      emprestimo(conta);
    }
  }
}

// ============================================================
// INVESTIMENTOS
// ============================================================
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
}

function investimentos(conta, tipo) {
  let valor = lerTeclado.questionFloat("Valor a investir: ");

  if (valor > conta.saldo) {
    console.log("Saldo insuficiente");
    return;
  }

  conta.saldo -= valor;

  let rendimento = calcularRendimento(valor, tipo);

  if (!conta.investimentos) conta.investimentos = 0;
  conta.investimentos += valor;

  console.log(`Rendimento estimado: R$ ${rendimento.toFixed(2)}`);
  addHistorico(conta, "Investimento", -valor);
}

function consultarInvestimentos(conta) {
  if (!conta.investimentos) conta.investimentos = 0;
  console.log(`Total investido: R$ ${conta.investimentos.toFixed(2)}`);
}

function calcularRendimento(valor, tipo) {
  if (tipo === "fixa") return valor * 0.02;
  return valor * (Math.random() * 0.1);
}

function resgatarInvestimentos(conta) {
  if (!conta.investimentos || conta.investimentos <= 0) {
    console.log("Você não possui investimentos para resgatar.");
    return;
  }

  let valor = lerTeclado.questionFloat("Valor a resgatar: ");

  if (valor > conta.investimentos) {
    console.log("Valor maior que o total investido.");
    return;
  }

  conta.investimentos -= valor;
  conta.saldo += valor;

  console.log(`Resgate realizado com sucesso! R$ ${valor.toFixed(2)} creditado na conta.`);
  addHistorico(conta, "Resgate de Investimento", valor);
}

// ============================================================
// RECARGA DE CELULAR
// ============================================================
function recargaCelular(conta) {
  let valor = lerTeclado.questionFloat("Valor recarga: ");
  let numeroCelular = lerTeclado.question("Número do celular: ");

  if (valor > conta.saldo) {
    console.log("Saldo insuficiente");
  } else {
    conta.saldo -= valor;
    console.log("Recarga realizada!");
    sistemaBonus(conta, valor);
    addHistorico(conta, "Recarga de Celular", -valor);
  }
}

// ============================================================
// SISTEMA DE BÔNUS (CASHBACK)
// ============================================================
function sistemaBonus(conta, valor) {
  if (!conta.bonus) conta.bonus = 0;
  let cashback = valor * 0.5 / 100;
  console.log(`Você recebeu R$ ${cashback.toFixed(2)} de cashback!`);
  conta.bonus += cashback;
}

exibirMenu();