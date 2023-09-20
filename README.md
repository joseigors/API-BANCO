#  🏦  API-BANCO
Uma API de Banco criada em Node.js/javascript e Express por mim, _José Igor_, **Desenvolvedor Backend**, para o desafio do módulo 02 do curso de Desenvolvimento de Software da Cubos Academy.

## ✔️ Pré-requisitos

![Node.js](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-4000BF.svg?style=for-the-badge&logo=Insomnia&logoColor=white)

# 👨🏻‍💻 Passo a passo:
## Formas de executar em sua máquina:
- Clonando repositório em sua máquina:
1. Copiar o link abaixo em seu prompt de comando:
```
git clone https://github.com/joseigors/API-BANCO.git
```
2. Entre na pasta através do prompt utilzando:
```
cd API-BANCO
```
3. Abra o vsCode dentro da pasta API-BANCO:
```
code .
```
4. Com o vsCode aberto na pasta raiz instale as dependências através do npm:
     - Dependências: Express, nodemon, date-fns
      ```
      npm install express nodemon date-fns
      ```
## 🗒️ Funções

- Listar usuários de contas bancárias
- Criar usuário
- Atualizar usuário da conta bancária
- Remover usuário conta bancária
- Depositar valor
- Efetuar saque
- Transferir valor entre contas
- Exibir saldo
- Exibir extrato bancário

---

## 🔵 Endpoints para utilização da API

GET - Listar contas bancárias
```
"localhost:3000/contas?senhaBanco=Cubos123Bank"
```
POST - Criar usuário
```
"localhost:3000/contas"
```
PUT - Atualizar usuário
```
"localhost:3000/contas/:numeroConta/usuario"
```
DELETE - Remover usuário
```
"localhost:3000/contas/:numeroConta"
```
POST - Depositar valor
```
"localhost:3000/transacoes/depositar"
```
POST - Efetuar saque
```
"localhost:3000"/transacoes/sacar"
```
POST - Transferir valor
```
"localhost:3000/transacoes/transferir"
```
GET - Exibir saldo
```
localhost:3000"/contas/saldo"
```
GET - Exibir extrato bancário
```
"localhost:3000/contas/extrato"
```

### 🔴 Parâmetros dos Endpoints

- Em Listar Contas, a senha do banco deve ser informada - **Cubos123Bank** - como query params, na URL do endpoint. Segue o exemplo:
```
"localhost:3000/contas?senhaBanco=Cubos123Bank"
```
- Em **_Criar Conta_** e **_Atualizar Conta_**, os campos são obrigatórios e devem ser passados através do corpo (body) da requisição. Segue o exemplo:
```
{
    "nome": "Igor Santos",
    "cpf": "00020230589",
    "data_nascimento": "2000-10-12",
    "telefone": "79999924611",
    "email": "igor@cubos.com",
    "senha": "12345"
}
```

- Em **_Depositar_**, é necessário passar o número da conta e valor, no corpo (body) da requisição. Segue o exemplo:
```
{
  "numeroConta":"1",
	"valor": 2000
}
```

- Em **_Sacar_**, é necessário passar o número da conta, valor e senha do usuário, que foi criada no momento de **_Criar Conta_**. Segue o exemplo:
```
{
  "numeroConta":"1",
	"valor": 1000,
	"senha":"12345"
}
````

- Em **_Transferir_**, é necessário passar o número da conta de origem, o numero da conta de destino, valor e senha do usário, que foi criada no momento de **_Criar Conta_**. Segue o exemplo:
```
{
  "numeroContaOrigem":"2",
	"numeroContaDestino":"1",
	"valor": 2000,
	"senha":"12345"
}
```

- Em **_Exibir Saldo_** e **_Extrato_** é necessário passar o número da conta e senha, como query params, na URL do Endpoint. Segue o exemplo:
```
localhost:3000/contas/saldo?numeroConta=1&senha=12345

localhost:3000/contas/extrato?numeroConta=2&senha=12345
```
## 📽️ Utilização dos Endpoints.

Segue o exemplo de utilização dos endpoints (CRUD) realizados através do Insomnia:

https://github.com/joseigors/API-BANCO/assets/89170407/5531dcba-a07f-4b9c-976a-12debcf91e44


Segue o exemplo de utilização dos endpoints (TRANSAÇÕES) realizados através do Insomnia:

https://github.com/joseigors/API-BANCO/assets/89170407/7ded53ed-5c6d-406e-9543-e695a8188ce8


