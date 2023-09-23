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
    let verify = 0
    res.render('login', { verify })
})

app.get('/novoUsuario', ( req, res) =>{
    let nome = ""
    let senha = ""
    let idade = ""
    let verify = 0
    res.render('newUser', { verify, nome, senha, idade })
})

app.get('/novaTaks', ( req, res ) => {
    let idUser = cache.get('id_user_para_consultar_tarefas');
    let idConfirm = cache.get('id_user_para_consultar_tarefas');
    res.render('newTask', { idUser, idConfirm });
})

app.get('/novaTaksAllUsers', ( req, res ) => {
    let idUser = cache.get('id_user_para_consultar_tarefas');
    let idConfirm = '';
    res.render('newTask', { idUser, idConfirm });
})

app.get('/tarefas/:id', ( req, res ) => {
    cache.set('id_user_para_consultar_tarefas', req.params.id, 3600)
    res.render('tarefas')
})

app.get('/editUser/:id', ( req, res ) => {
    let id = req.params.id;
    res.render('editUser', {id});
})

app.get('/editTask/:id', ( req, res ) => {
    let id_user = cache.get('id_user_para_consultar_tarefas')
    let id_taks = req.params.id
    res.render('editTask', { id_taks, id_user })
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

