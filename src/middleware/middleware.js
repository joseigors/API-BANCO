const verificarsenha = (req, res, next) => {
    const { senhaBanco } = req.query
    const { banco } = require('../database/db')

    if (!senhaBanco) {
        return res.status(401).json({ mensagem: "Senha obrigatória, por favor insira a senha solicitada!" })
    }
    if (senhaBanco === banco.senha) {
        next()
    } else {
        return res.status(403).json({ mensagem: "Senha incorreta" });

    }
}

function verificarDados(req, res, next) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório." });
    }

    if (!cpf) {
        return res.status(400).json({ mensagem: "O campo cpf é obrigatório." });
    }

    if (!data_nascimento) {
        return res
            .status(400)
            .json({ mensagem: "O campo data de nascimento é obrigatório." });
    }

    if (!telefone) {
        return res
            .status(400)
            .json({ mensagem: "O campo telefone é obrigatório." });
    }

    if (!email) {
        return res.status(400).json({ mensagem: "O campo email é obrigatório." });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "O campo senha é obrigatório." });
    }

    if ((nome, cpf, data_nascimento, telefone, email, senha)) {
        next();
    }
}

const verificarNumeroContaEValor = (req, res, next) => {
    const { numeroConta, valor } = req.body;

    if (!numeroConta || isNaN(numeroConta) || !valor) {
        res.status(400).json({
            mensagem: "O número da conta e o valor são obrigatórios!.",
        });
    } else {
        next();
    }
};

module.exports = {
    verificarsenha, verificarDados, verificarNumeroContaEValor,
};