require('dotenv').config()
const express = require('express')
const app = express()
const porta = 3000;
const path = require('path');


// Depêndencias
const cache = require('./controlers/cache')
const ejs = require('ejs');
const bodyParser = require('body-parser');


// Controlers
const logger = require('./controlers/winston');
const userRouterUser = require('./routers/user');
const userRouterTarefas = require('./routers/tarefas');
const userRouterCache = require('./routers/cache');



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
    cache.set('id_user_para_consultar_tarefas', req.params.id, 3600)
    res.render('tarefas')
})

// Atribuindo Rotas existentes
app.use('/', userRouterUser)
app.use('/', userRouterTarefas)
app.use('/', userRouterCache)

// Rodando o servidor
app.listen(porta, (err) => {
    if(err){
        console.log(`Erro ao iniciar na porta ou no servidor, ${ err }`)
    }
    logger.info('Servidor Aberto')
})

