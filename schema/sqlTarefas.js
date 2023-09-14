const mysql = require('mysql2');
const logger = require('../controlers/winston');
require('dotenv').config();

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
const sqlQueryTarefas = 'SELECT * FROM tarefas WHERE id_usuario = ?';
const sqlInsertTarefa = 'INSERT INTO tarefas (dia_semana, descricao_tarefa, condominio, concluido, justificativa, id_usuario, dia_da_tarefa, hora_da_tarefa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
const sqlUpdateTarefa = 'UPDATE tarefas SET descricao_tarefa = ?, concluido = ?, justificativa = ? WHERE id_tarefa = ?';
const sqlDeleteTarefa = 'DELETE FROM tarefas WHERE id_tarefa = ?';


const tarefasController = {
    consultarTarefas: function (req, res) {
        id = req.params.id
        connection.query(sqlQueryTarefas, [id],(err, results) => {
            if (err) {
              logger.error('Erro ao executar a consulta SQL:', err);
              return;
            }
            res.json(results)
            console.log('Resultados da consulta:', results);
          });
      // Implementação para consultar tarefas...
    },
    adicionarTarefa: function (req, res) {
        const novaTarefa = {
            dia_semana: req.body.dia,
            descricao_tarefa: req.body.descricao,
            condominio: req.body.condominio,
            concluido: req.body.concluido,
            justificativa: req.body.justificativa,
            id_usuario: req.body.usuario,
            dia_da_tarefa: "",
            hora_da_tarefa: ""
        }

        connection.query(sqlInsertTarefa, [novaTarefa.dia_semana, novaTarefa.descricao_tarefa, novaTarefa.condominio, novaTarefa.concluido, novaTarefa.justificativa, novaTarefa.id_usuario, novaTarefa.dia_da_tarefa, novaTarefa.hora_da_tarefa], (err, result) => {
            if (err) {
              logger.error('Erro ao inserir registro no banco de dados:', err);
              res.status(500).send('Erro')
            }else{
              logger.info('Registro inserido com sucesso. ID:', result);
              res.status(200).send('Tarefa Cadastrado!')
            }
        });
      // Implementação para adicionar tarefas...
    },
    editarTarefa: function (req, res) {
        let ID = req.params.id

        let novoUser = {
            justificativa: req.body.justificativa,
            descricao_tarefa: req.body.descricao, 
            concluido: req.body.concluido, 
        }

      connection.query(sqlUpdate, [ID], ( err, results ) => {
        if( err ){
          console.log(err)
          logger.error('Erro ao atualizar usuário!');
          res.status(500).send('Erro ao Atualizar!')
        }else{
          logger.info('Usuário Atualizado com sucesso!')
          res.status(200).send('Usuário Atualizado!')
        }
    })
      // Implementação para editar tarefas...
    },
    deletarTarefa: function (req, res) {
        let id = req.params.id
        connection.query(sqlDeleteTarefa, [id], ( err, results ) => {
          if( err ){
            logger.error('Erro ao deletar Tarefa!');
            res.status(500).send('Erro ao deletar!')
          }else{
            logger.info('Tarefa deletado com sucesso!')
            res.status(200).send('Tarefa Deletada!')
          }
      })
      // Implementação para deletar tarefas...
    },
  };
  
  module.exports = tarefasController;