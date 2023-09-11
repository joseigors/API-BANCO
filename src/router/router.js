const express = require('express');
const { listaContas, aberturaConta, atualizarConta, excluirConta, depositar, efetuarSaque, efetuarTranferencia, exibirSaldo, exibirExtrato } = require('../controller/banco');
const { verificarsenha, verificarDados, verificarNumeroContaEValor } = require('../middleware/middleware')
const rotas = express();

rotas.get('/contas', verificarsenha, listaContas);
rotas.post('/contas', verificarDados, aberturaConta)
rotas.put('/contas/:numeroConta/usuario', verificarDados, atualizarConta)
rotas.delete('/contas/:numeroConta', excluirConta)
rotas.post("/transacoes/depositar", verificarNumeroContaEValor, depositar);
rotas.post('/transacoes/sacar', verificarNumeroContaEValor, efetuarSaque);
rotas.post('/transacoes/transferir', efetuarTranferencia);
rotas.get('/contas/saldo', exibirSaldo)
rotas.get('/contas/extrato', exibirExtrato)
module.exports = rotas