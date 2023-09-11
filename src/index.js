
const express = require('express');
const app = express();
const rotas = require('./router/router')

app.use(express.json());
app.use(rotas)

app.listen(3000);