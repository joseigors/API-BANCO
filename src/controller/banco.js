let { contas, saques, depositos, transferencias } = require('../database/db');
const { format } = require('date-fns');

let contaId;

const listaContas = (req, res) => {
    if (contas.length === 0) {
        return res.status(204).json(contas)
    }
    return res.status(200).json(contas)
}

const aberturaConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha os campos: nome, email e senha. Pois são obrigatórios' })
    }

    const verificarCpf = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    })

    const verificaremail = contas.find((conta) => {
        return conta.usuario.email === email;
    })

    if (verificarCpf) {
        return res.status(400).json({ mensagem: "Este CPF já está cadastrando em nosso banco!" })
    }

    if (verificaremail) {
        return res.status(400).json({ mensagem: "Este email já está cadastrando em nosso banco!" })
    }
    if (contas.length === 0) {
        contaId = 1;
    } else {
        contaId = contas[contas.length - 1].numero + 1;
    }
    contas.push({
        numero: contaId,
        saldo: 0,
        usuario: { nome, cpf, data_nascimento, telefone, email, senha }
    })
    return res.status(201).json();
}

const atualizarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Preencha os campos: nome, email e senha. Pois são obrigatórios" })
    }
    const { numeroConta } = req.params

    const verificarId = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if (!verificarId || isNaN(numeroConta)) {
        return res.status(404).json({
            mensagem:
                "Esta conta não existe ou o numero da conta é inválido. Por favor, Insira outro número de conta.",
        });
    }

    const verificarCpfcadastrado = contas.filter((outraConta) => {
        return outraConta.numero !== numeroConta
    }).find((conta) => {
        return conta.usuario.cpf === cpf;
    })

    const verificarEmailcadastrado = contas.filter((outraConta) => {
        return outraConta.numero !== numeroConta
    }).find((conta) => {
        return conta.usuario.email === email;
    })

    if (verificarCpfcadastrado) {
        return res.status(400).json({ mensagem: "Este CPF se encontra vinculado a outra conta!" })
    }

    if (verificarEmailcadastrado) {
        return res.status(400).json({ mensagem: "Este email já se encontra vinculado a outra conta!" })
    }

    const contaUsuario = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    contaUsuario.usuario.nome = nome;
    contaUsuario.usuario.cpf = cpf;
    contaUsuario.usuario.data_nascimento = data_nascimento;
    contaUsuario.usuario.telefone = telefone;
    contaUsuario.usuario.email = email;
    contaUsuario.usuario.senha = senha;

    return res.status(201).json()
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params
    const verificarId = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if (!verificarId || isNaN(numeroConta)) {
        return res.status(404).json({
            mensagem:
                "Esta conta não existe ou o numero da conta é inválido. Por favor, Insira outro número de conta.",
        });
    }

    if (verificarId.saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    }

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta)
    })
    return res.status(200).json({ mensagem: "Conta excluída com sucesso!" })
}


const depositar = (req, res) => {
    const { numeroConta, valor } = req.body;
    const verificaConta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!verificaConta) {
        return res.status(400).json({ mensagem: "Conta bancária não existe!" });
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: "Saldo insuficiente! Valor do depósito precisa ser acima de 0!" });
    }

    depositos.push({
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numeroConta: numeroConta,
        valor: valor,
    });

    verificaConta.saldo += valor;
    return res.status(200).json();
}

const efetuarSaque = (req, res) => {
    const { numeroConta, valor, senha } = req.body
    if (!senha) {
        return res.status(400).json({ Mensagem: "Senha é obrigatório!" });
    }

    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if (!verificarConta) {
        return res.status(400).json({ mensagem: "Esta conta não existe!" })
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: "Valor do deposito deve ser superior a 0" })
    }

    if (senha !== verificarConta.usuario.senha) {
        return res.status(400).json({ Mensagem: "Senha incorreta" });
    }

    if (verificarConta.saldo < valor) {
        return res.status(400).json({ mensagem: "O saldo é inferior ao valor solicitado." })
    }

    saques.push({
        data: format(new Date(), "yyyy-MM-dd' 'hh:mm:ss"),
        numeroConta,
        valor
    })
    verificarConta.saldo -= valor;

    return res.status(200).json(saques);
}

const efetuarTranferencia = (req, res) => {
    const { numeroContaOrigem, numeroContaDestino, valor, senha } = req.body;
    if (!numeroContaOrigem || isNaN(numeroContaOrigem) || !numeroContaDestino || isNaN(numeroContaDestino) || !valor || !senha) {
        return res.status(400).jsos({ mensagem: "O numero da conta de destino e origem, valor e senha são obrigatórios!" })
    }

    const verificarContaOrigem = contas.find((conta) => {
        return conta.numero === Number(numeroContaOrigem)
    })

    if (!verificarContaOrigem) {
        res.status(400).json({ mensagem: "Número da conta não existe, Por favor inserir um número de conta válido" })
    }

    const verificarContaDestino = contas.find((conta) => {
        return conta.numero === Number(numeroContaDestino)
    })

    if (!verificarContaDestino) {
        res.status(400).json({ mensagem: "Número da conta não existe, Por favor inserir um número de conta válido" })
    }


    if (valor <= 0) {
        res.status(400).json({
            Mensagem: "Valor da transferência precisa ser superior a 0.",
        });
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: "Valor para transferências tem de ser superiores a 0" })
    }

    if (senha !== verificarContaOrigem.usuario.senha) {
        return res.status(400).json({ mensagem: "Por favor inserir uma senha correta!" })
    }

    if (verificarContaOrigem.saldo < valor) {
        return res.status(400).json({ mensagem: "saldo insuficiente!" })
    }

    transferencias.push({
        data: format(new Date(), "yyyy-MM-dd' 'hh:mm:ss"),
        numeroContaOrigem,
        numeroContaDestino,
        valor,
    });


    verificarContaOrigem.saldo -= valor;
    verificarContaDestino.saldo += valor;

    return res.status(200).json(transferencias);
}

const exibirSaldo = (req, res) => {
    const { numeroConta, senha } = req.query

    if (!numeroConta || isNaN(numeroConta) || !senha) {
        return res.status(400).json({ mensgem: "Numero da conta e senha são obrigatórios" })
    }

    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if (!verificarConta) {
        return res.status(400).json({ mensagem: "Conta inexistente" })
    }

    if (senha !== verificarConta.usuario.senha) {
        return res.status(400).json({ Mensagem: "Senha incorreta" });
    }
    return res.status(200).json(`saldo: ${verificarConta.saldo}`);
}

const exibirExtrato = (req, res) => {
    const { numeroConta, senha } = req.query
    if (!numeroConta || isNaN(numeroConta) || !senha) {
        return res.status(400).json({ mensgem: "Numero da conta e senha são obrigatórios" })
    }

    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })

    if (!verificarConta) {
        return res.status(400).json({ mensagem: "Conta inexistente" })
    }

    if (senha !== verificarConta.usuario.senha) {
        return res.status(400).json({ Mensagem: "Senha incorreta" });
    }

    const depositosEfetuados = depositos.filter((deposito) => {
        return Number(deposito.numeroConta) === Number(verificarConta.numero)

    })

    const saquesEfetuados = saques.filter((saque) => {
        return Number(saque.numeroConta) === Number(verificarConta.numero)
    })

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return Number(transferencia.numeroContaOrigem) === Number(verificarConta.numero)
    })

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return Number(transferencia.numeroContaDestino) === Number(verificarConta.numero)
    })

    return res.status(200).json({
        depositos: depositosEfetuados,
        saques: saquesEfetuados,
        transferenciasEnviadas: transferenciasEnviadas,
        transferenciasRecebidas: transferenciasRecebidas
    })
}

module.exports = { listaContas, aberturaConta, atualizarConta, excluirConta, depositar, efetuarSaque, efetuarTranferencia, exibirSaldo, exibirExtrato }