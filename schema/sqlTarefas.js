require('dotenv').config();

// Dependencias
const NodeCache = require("node-cache")
const mysql = require('mysql2');
const logger = require('../controlers/winston');

//Configs
const cache = require('../controlers/cache')

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.USER_BASE,
  password: process.env.PASSWORD_BASE,
  database: process.env.DATA_BASE,
  waitForConnections: true,
});

connection.connect(( err ) => {
    if( err ) {
        logger.error(`Erro ao se conectar com o banco, ${err}`);
        return;
    }
    logger.info('Conectado com sucesso ao banco');
  });

// Consultas SQL para a tabela de tarefas
const sqlTarefaDetalhada = 'SELECT * FROM tarefas where id_tarefa = ?'
const sqlQueryTarefas = 'SELECT * FROM tarefas WHERE id_usuario = ?';
const sqlQueryTarefasSearch = 'SELECT * FROM tarefas WHERE dia_semana = ? AND id_usuario = ?'
const sqlInsertTarefa = 'INSERT INTO tarefas (dia_semana, descricao_tarefa, condominio, concluido, justificativa, id_usuario, dia_da_tarefa, hora_da_tarefa, nome_tarefa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
const sqlUpdateTarefa = 'UPDATE tarefas SET dia_semana = ?, descricao_tarefa = ?, condominio = ?, concluido = ?, nome_tarefa = ? WHERE id_tarefa = ?';
const sqlUpdateTarefaUser = 'UPDATE tarefas SET dia_semana = ?, descricao_tarefa = ?, justificativa = ?, concluido = ?, nome_tarefa = ? WHERE id_tarefa = ?';
const sqlUpdateState = 'UPDATE tarefas SET concluido = ? WHERE id_tarefa = ?'
const sqlDeleteTarefa = 'DELETE FROM tarefas WHERE id_tarefa = ?';

// Controlador
const tarefasController = {
    detalhesTarefa: function ( req, res ){
      connection.query(sqlTarefaDetalhada, [req.params.id], ( err, results ) => {
        if( err ){
          logger.error('Erro ao consultar tarefa:', err);
          return
        }
        let tarefa = results[0]
        console.log(tarefa)
        res.render('tarefaDetalhe', {tarefa})
      })
    },
    detalhesTarefaUser: function ( req, res ){
      connection.query(sqlTarefaDetalhada, [req.params.id], ( err, results ) => {
        if( err ){
          logger.error('Erro ao consultar tarefa:', err);
          return
        }
        let tarefa = results[0]
        console.log(tarefa)
        res.render('tarefaDetalheUser', {tarefa})
      })
    },
    consultarTarefas: function (req, res) {
        id = req.params.id
        connection.query(sqlQueryTarefas, [id],(err, results) => {
            if (err) {
              logger.error('Erro ao executar a consulta SQL:', err);
              return;
            }
            res.json(results)
            console.log('Consulta feita com sucesso Tarefas!');
          });
      // Implementação para consultar tarefas...
    },
    consultarTarefaEspecifica: function ( req, res ){
      let dia_semana = req.body.dia;
      let id = req.body.id;

      connection.query(sqlQueryTarefasSearch, [dia_semana, id], (err, results) => {
        if (err) {
          logger.error('Erro ao executar a consulta SQL:', err);
          return;
        }
        res.json(results)
        console.log('Consulta feita com sucesso Tarefas!');
      });
    // Implementação para consultar tarefas especificas...
    },
    adicionarTarefa: function (req, res) {
        const novaTarefa = {
            dia_semana: req.body.dia,
            descricao_tarefa: req.body.descricao,
            condominio: req.body.condominio,
            concluido: req.body.concluido,
            justificativa: req.body.justificativa,
            id_usuario: req.body.usuario,
            dia_da_tarefa: req.body.dia_da_tarefa,
            hora_da_tarefa: req.body.horario_tarefa,
            nome_tarefa: req.body.nome_tarefa
        }

        connection.query(sqlInsertTarefa, [novaTarefa.dia_semana, novaTarefa.descricao_tarefa, novaTarefa.condominio, novaTarefa.concluido, novaTarefa.justificativa, novaTarefa.id_usuario, novaTarefa.dia_da_tarefa, novaTarefa.hora_da_tarefa, novaTarefa.nome_tarefa], (err, result) => {
            if (err) {
              logger.error('Erro ao inserir registro no banco de dados:', err);
              res.status(500).send('Erro')
            }else{
              logger.info('Registro inserido com sucesso. ID:', result);
              res.status(200).render('admin')
            }
        });
      // Implementação para adicionar tarefas...
    },
    editarTarefa: function (req, res) {
        let ID = req.params.id
        let id_usuario =cache.get('id_user_para_consultar_tarefas')

        let novaTarefa = {
            dia: req.body.dia,
            condominio: req.body.condominio,
            descricao_tarefa: req.body.descricao, 
            concluido: req.body.concluido, 
            nome_tarefa: req.body.nome_tarefa
        }

      connection.query(sqlUpdateTarefa, [novaTarefa.dia, novaTarefa.descricao_tarefa, novaTarefa.condominio, novaTarefa.concluido, novaTarefa.nome_tarefa, ID], ( err, results ) => {
        if( err ){
          console.log(err)
          logger.error('Erro ao atualizar Tarefa!');
          res.status(500).send('Erro ao Atualizar!')
        }else{
          logger.info('Tarefa Atualizada com sucesso!')
          res.status(200).redirect(`/tarefas/${id_usuario}`)
        }
    })
      // Implementação para editar tarefas...
    },

    editarTarefaUser: function (req, res) {
        let ID = req.params.id
        let id_usuario =cache.get('id_user_para_consultar_tarefas')

        let novaTarefa = {
            dia: req.body.dia,
            justificativa: req.body.justificativa,
            descricao_tarefa: req.body.descricao, 
            concluido: req.body.concluido, 
            nome_tarefa: req.body.nome_tarefa
        }

      connection.query(sqlUpdateTarefaUser, [novaTarefa.dia, novaTarefa.descricao_tarefa, novaTarefa.justificativa, novaTarefa.concluido, novaTarefa.nome_tarefa, ID], ( err, results ) => {
        if( err ){
          console.log(err)
          logger.error('Erro ao atualizar Tarefa!');
          res.status(500).send('Erro ao Atualizar!')
        }else{
          logger.info('Tarefa Atualizada com sucesso!')
          res.status(200).redirect(`/paginainicial`)
        }
    })
      // Implementação para editar tarefas pelo Usuário...
    },

    atualizarEstado: function( req, res ){
      let concluido = req.body.estado;
      let id = req.body.id;

      connection.query(sqlUpdateState, [ concluido, id], ( err, results ) => {
        if( err ){
          console.log(err)
          logger.error('Erro ao atualizar Tarefa!');
          res.status(500).send('Erro ao Atualizar!')
        }else{
          logger.info('Tarefa Atualizada com sucesso!')
          res.status(200).redirect(`/paginainicial`)
        }
      })
    },

    deletarTarefa: function (req, res) {
        let idUser = cache.get('id_user_para_consultar_tarefas')
        let id = req.params.id
        connection.query(sqlDeleteTarefa, [id], ( err, results ) => {
          if( err ){
            logger.error('Erro ao deletar Tarefa!');
            res.status(500).send('Erro ao deletar!')
          }else{
            logger.info('Tarefa deletado com sucesso!')
            res.status(200).redirect(`/tarefas/${idUser}`)
          }
      })
      // Implementação para deletar tarefas...
    }
  };
  
  module.exports = tarefasController;