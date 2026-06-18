let readline = require('readline-sync')

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

let conta = {};

function criarContaFisica() {
    let nome = readline.question('Digite o seu nome completo: ')
        .toUpperCase()
        .trim();
    while (nome.length <= 1) {
        console.log('Nome inválido.');
        nome = readline.question('Digite o seu nome completo: ')
            .toUpperCase()
            .trim();
    }
    conta.nome = nome;
    let CPF = readline.question('Digite seu CPF: ').trim();

    while (CPF.length !== 11) {
        console.log('CPF inválido. Deve conter 11 dígitos.');
        CPF = readline.question('Digite seu CPF novamente: ').trim();
    }
    conta.CPF = CPF;
    let dia = readline.questionInt('Digite o dia que nasceu: ');
    while (dia < 1 || dia > 31) {
        console.log('Dia inválido.');
        dia = readline.questionInt('Digite o dia que nasceu: ');
    }
    let mes = readline.questionInt('Digite o mês que nasceu: ');
    while (mes < 1 || mes > 12) {
        console.log('Mês inválido.');
        mes = readline.questionInt('Digite o mês que nasceu: ');
    }
    let ano = readline.questionInt('Digite o ano que nasceu: ');
    while (ano < 1900 || ano > 2008) {
        console.log('Ano inválido.');
        ano = readline.questionInt('Digite o ano que nasceu (+18 anos): ');
    }
    conta.dataNascimento = {
        dia,
        mes,
        ano
    };
    let email = readline.question('Digite seu email: ').trim();
    while (!email.includes('@')) {
        console.log('Email inválido.');
        email = readline.question('Digite seu email novamente: ').trim();
    }
    conta.email = email;
    console.log('\nConta criada com sucesso!');
}

// criarContaFisica();
// console.table(conta);

function criarSenha() {
    let senha = readline.question('Digite sua senha: ');

    while (senha.length !== 6) {
        console.log('A senha deve ter exatamente 6 caracteres.');
        senha = readline.question('Digite sua senha novamente: ');
        if(senha.length === 6) {
            console.log('Senha criada com sucesso')
            return senha;
        }
    }

}
criarSenha()

function numeroConta() {
    conta.numeroConta = Math.floor(Math.random() * 100000);
}