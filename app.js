require('dotenv').config()
const express = require('express')
const app = express()
const porta = 3000;



// Depêndencias
const logger = require('./controlers/winston');
const userRouterUser = require('./routers/user')
const userRouterTarefas = require('./routers/tarefas')
const bodyParser = require('body-parser');

// Setando Configs
app.use(bodyParser.json());



// Setando a viewEngine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


//Rotas
app.get('/', ( req, res ) => {
    res.send('Servidor Ok')
})

app.use('/', userRouterUser)
app.use('/', userRouterTarefas)

app.listen(porta, (err) => {
    if(err){
        console.log(`Erro ao iniciar na porta ou no servidor, ${ err }`)
    }
    logger.info('Servidor Aberto')
})

