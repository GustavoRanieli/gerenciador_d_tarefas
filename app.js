require('dotenv').config()
const express = require('express')
const app = express()
const porta = 3000;
const path = require('path');


// Depêndencias
const logger = require('./controlers/winston');
const userRouterUser = require('./routers/user')
const userRouterTarefas = require('./routers/tarefas')
const bodyParser = require('body-parser');
const ejs = require('ejs');


// Setando Configs
app.use(bodyParser.urlencoded({ extended: true }));



// Setando a viewEngine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Arquivos estaticos 
app.use('/public', express.static('public'));


//Rotas
app.get('/', ( req, res ) => {
    res.render('login')
})

app.get('/tarefas/:id', ( req, res ) => {
    res.render('tarefas')
})

app.use('/', userRouterUser(cache))
app.use('/', userRouterTarefas(cache))

app.listen(porta, (err) => {
    if(err){
        console.log(`Erro ao iniciar na porta ou no servidor, ${ err }`)
    }
    logger.info('Servidor Aberto')
})

