let readline = require("readline-sync");

//dinheiro taxa são variáveis deposito saque acesso tranferencia pix tfd doc emprestimo investimento renda fixa renda variavel
//sistema de validador-segurança extrato conta limites tipo infor pessoais. Sistema de ajuda. Cash back, recarga celular. notificações(cartao vencido, valores em atraso, novo limite)
//bonus deposito inicial
// let conta = [{

// }]
// function criarConta() {
//     let nome = readline.question('Digite o seu nome completo: ')
//         .toUpperCase()
//         .trim()
//     if (nome.length < 1 || nome === '' || nome === ' ' || Number.isNaN(nome)) {
//         console.log('Nome invalido.')
//     }
//     else {
//         conta.nome = nome
//         let CPF = readline.questionInt('Digite seu CPF: ')
//         if (CPF.length < 11 && CPF > 11) {
//             console.log('Dados invalidos.')
//         }
//         else {
//             conta.CPF = CPF
//             let dataNascimento = {
//                 dia: readline.questionInt('Digite o dia que nasceu: '),
//                 mes: readline.questionInt('Digite o mes (numero) que nasceu: '),
//                 ano: readline.questionInt('Digite o ano: '),
//             }
//             conta.push(dataNascimento.dia)
//             conta.push(dataNascimento.mes)
//             conta.push(dataNascimento.ano)
//             let email = readline.question('Digite seu email: ')
//             if (!email.includes("@")) {
//                 console.log('Não tem @');
//             } else {
//                 conta.email = email
//             }
//         }
//     }
// }
// criarConta()
// console.table(conta)

// let conta = {};

// function criarContaFisica() {
//   let nome = readline
//     .question("Digite o seu nome completo: ")
//     .toUpperCase()
//     .trim();
//   while (nome.length <= 1) {
//     console.log("Nome inválido.");
//     nome = readline
//       .question("Digite o seu nome completo: ")
//       .toUpperCase()
//       .trim();
//   }
//   conta.nome = nome;
//   let CPF = readline.question("Digite seu CPF: ").trim();

//   while (/^\d{11}$/.test(CPF)) {
//     console.log("CPF inválido. Deve conter 11 dígitos.");
//     CPF = readline.question("Digite seu CPF novamente: ").trim();
//   }
//   conta.CPF = CPF;
//   let dia = readline.questionInt("Digite o dia que nasceu: ");
//   while (dia < 1 || dia > 31) {
//     console.log("Dia inválido.");
//     dia = readline.questionInt("Digite o dia que nasceu: ");
//   }
//   let mes = readline.questionInt("Digite o mês que nasceu: ");
//   while (mes < 1 || mes > 12) {
//     console.log("Mês inválido.");
//     mes = readline.questionInt("Digite o mês que nasceu: ");
//   }
//   let ano = readline.questionInt("Digite o ano que nasceu: ");
//   while (ano < 1900 || ano > new Date().getFullYear() - 18) {
//     console.log("Ano inválido.");
//     ano = readline.questionInt("Digite o ano que nasceu (+18 anos): ");
//   }
//   conta.dataNascimento = {
//     dia,
//     mes,
//     ano,
//   };
//   let email = readline.question("Digite seu email: ").trim();
//   while (!email.includes("@")) {
//     console.log("Email inválido.");
//     email = readline.question("Digite seu email novamente: ").trim();
//   }
//   conta.senha = criarSenha();
//   numeroConta();
//   console.log("\nConta criada com sucesso!");
//   conta.email = email;
//   console.log("\nConta criada com sucesso!");
// }

// criarContaFisica();
// console.table(conta);

// function criarSenha() {
//   let senha = readline.question("Digite sua senha: ");

//   while (senha.length !== 6) {
//     console.log("A senha deve ter exatamente 6 caracteres.");
//     senha = readline.question("Digite sua senha novamente: ");
//   }
//   console.log("Senha criada com sucesso");
//   conta.senha = senha;
//   return senha;
// }
// // criarSenha();

// function numeroConta() {
//   conta.numeroConta = String(Math.floor(Math.random() * 1000000)).padStart(
//     6,
//     "0",
//   );
// }

const lerTeclado = require('readline-sync');

// Acesso, deposito, saque, transferência(PIX, TED, DOC), emprestimo, (FUNÇÕES)
// investimento (renda fixa, variavel), notificações (valores em atraso, novo limite). (FUNÇÕES)
// Limite, Extrato, Conta, Senha, Tipo de conta, Saldo. (VARIAVEIS)
// Dinheiro, Taxas. (VARIAVEIS)
// Sistema de segurança. (VALIDADORES)
// Sistema de ajuda. 
// Extrato() - Quanto, Data e hora

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
`)
  let opcao = lerTeclado.questionInt(`Digite a opção desejada:\n`)

  switch (opcao) {
    case 1:
      console.log("Em desenvolvimento!\n");
      exibirMenu()
      break;
    case 2:
      criarContaPF()
      break;
    case 3:
      console.log("Em desenvolvimento!\n");
      exibirMenu()
    case 0:
      console.log("Finalizando e Saindo... Obrigado por acessar!");
      break;
    default:
      console.log("Opção invalida");
      exibirMenu()
      break;
  };
}

let contasSalvas = [{
  usuario: "joana",
  cpf: "999.999.999-99",
  email: "jo@gmail.com",
  dataNascimento: "27/09/2004",
  senha: 123456,
  numConta: 876543,
  saldo: 0,
  tipoConta: 'Pessoa Fisica',
}];

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
    if (anoNascimento < 1900 || anoNascimento > new Date().getFullYear() - 18)
      console.log("Ano de nascimento inválido.");
  }

  while (mesNascimento < 1 || mesNascimento > 12) {
    mesNascimento = lerTeclado.questionInt("Digite o mês que nasceu:\n");
    if (mesNascimento < 1 || mesNascimento > 12)
      console.log("Mês inválido.");
  }

  while (!validarDiaNascimento(mesNascimento, diaNascimento)) {
    diaNascimento = lerTeclado.questionInt("Digite o dia que nasceu:\n");
    if (!validarDiaNascimento(mesNascimento, diaNascimento))
      console.log("Dia inválido.");
  }

  conta.dataNascimento = new Date(anoNascimento, mesNascimento - 1, diaNascimento).toLocaleDateString('pt-BR');

  conta.senha = criarSenha()

  conta.numConta = numeroConta()

  console.table(conta);

  contasSalvas.push(conta)

  exibirMenu()
}

function criarSenha() {
  let senha = 0;
  while (senha.toString().length !== 6) {
    senha = lerTeclado.questionInt(`A senha deve conter 6 números e o primeiro digito não pode ser 0. Digite sua senha:\n`)

    if (senha.toString().length !== 6)
      console.log("A senha deve ter exatamente 6 caracteres.");
  }
  console.log("Senha criada com sucesso");
  return senha;
}

function validarDiaNascimento(mes, dia) {
  let meses31 = [1, 3, 5, 7, 8, 10, 12];
  let meses30 = [4, 6, 9, 11];

  if (mes === 2 && dia <= 28 && dia > 0) {
    return true
  } else if (meses30.includes(mes) && dia <= 30 && dia > 0) {
    return true
  } else if (meses31.includes(mes) && dia <= 31 && dia > 0) {
    return true
  }
  return false
}

function numeroConta() {
  let numConta = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return numConta
}

exibirMenu()

function menuConta(conta) {
  console.log(`
    ===========================
            BANCO SYSBANK
    ===========================
        Olá ${conta.usuario}
      O que você quer fazer hoje:
      1 - Depositar
      2 - Sacar
      3 - Extrato
      0 - Sair
`)
}

function acessarConta() {
  let numeroConta = lerTeclado.questionInt("Digite o número da sua conta:\n");
  let senha = lerTeclado.questionInt("Digite sua senha: \n")

  for (let i = 0; i <= contasSalvas.length; i++) {
    if (contasSalvas[i].numConta == numeroConta && contasSalvas[i].senha == senha) {
      menuConta(contasSalvas[i])
      return
    }
  }
  console.log("Numero conta ou senha invalidos!");
  acessarConta()
}

function validacaoDeSenha(contasSalvas) {
  let tentativas = 0;

  while (tentativas < 4) {
    let digiteSenha = lerTeclado.questionInt("Digite a senha: ");

    if (digiteSenha === contasSalvas.senha) {
      console.log("Senha correta!");
      return true; // sai da função
    } else {
      tentativas++;
      console.log(`Senha incorreta. Tentativa ${tentativas}/4`);
    }
  }

  console.log("Conta bloqueada por excesso de tentativas.");
  return false;
}



function tranferencias() {
  let contaOrigem = lerTeclado.questionInt("Digite sua conta (origem): ");
  let valorTransferencia = lerTeclado.questionFloat("Valor: ");
  let opcao = lerTeclado.questionInt("1) PIX 2) DOC 3) TED: ");

  let origem = contasSalvas.find(c => c.numConta == contaOrigem);

  if (!origem) {
    console.log("Conta origem não encontrada!");
    return;
  }

  let contaDestino = lerTeclado.questionInt("Digite conta destino: ");
  let destino = contasSalvas.find(c => c.numConta == contaDestino);

  if (!destino) {
    console.log("Conta destino não encontrada!");
    return;
  }

  if (origem.saldo < valorTransferencia) {
    console.log("Saldo insuficiente!");
    return;
  }

  switch (opcao) {
    case 1:
      validacaoDeSenha()
      origem.saldo -= valorTransferencia;
      destino.saldo += valorTransferencia;
      console.log("PIX realizado!");
      break;

    case 2:
      validacaoDeSenha()
      setTimeout(() => {
        origem.saldo -= valorTransferencia;
        destino.saldo += valorTransferencia;
        console.log("DOC concluído!");
      }, 3000);
      break;

    case 3:
      validacaoDeSenha()
      setTimeout(() => {
        origem.saldo -= valorTransferencia;
        destino.saldo += valorTransferencia;
        console.log("TED concluído!");
      }, 2000);
      break;

    default:
      console.log("Opção inválida");
  }
}
tranferencias()

function depositoInicial(contasSalvas) {
  let depositoInicial = lerTeclado.questionFloat('Digite o valor do deposito inicial (mínimo R$100):')
  while (true) {
    if (depositoInicial < 100) {
      console.log('valor invalido')
    } else {
      conta.saldo += depositoInicial
      console.log('Depósito realizado com sucesso!')
    }
  }
}

