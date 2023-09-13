const mysql = require('mysql2');
const logger = require('../controlers/winston');
require('dotenv').config()


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

// Funções
const sqlQuery = 'SELECT * FROM usuario';
const sqlInsert = 'INSERT INTO usuario (id, nome, senha, funcao, cpf, idade) VALUES (?, ?, ?, ?, ?, ?)';
const sqlUpdate = 'UPDATE usuario SET nome = ?, senha = ?, funcao = ?, cpf = ?, idade = ? WHERE ID = (?)';
const sqlDelete = 'DELETE FROM usuario WHERE ID = (?)';

const sqlControlerUser = {
//Adicionar
    addUser : function( req, res) {
        let usuario = {
            nome: req.body.nome,
            senha: req.body.senha,
            funcao: req.body.funcao,
            cpf: req.body.cpf,
            idade: req.body.idade
        }

        connection.query(sqlInsert, [usuario.id, usuario.nome, usuario.senha, usuario.funcao, usuario.cpf, usuario.idade], (err, result) => {
            if (err) {
              logger.error('Erro ao inserir registro no banco de dados:', err);
              res.status(500).send('Erro')
            }else{
              logger.info('Registro inserido com sucesso. ID:', result);
              res.status(200).send('Usuário Cadastrado!')
            }
          });
    },
//Consultar
    consultaBanco: function ( req, res ) {
      connection.query(sqlQuery, (err, results) => {
        if (err) {
          logger.error('Erro ao executar a consulta SQL:', err);
          return;
        }
        res.json(results)
        console.log('Resultados da consulta:', results);
      });
    },
//Editar
    editarUsuário: function( req, res ) {
      let ID = req.params.id

      let novoUser = {
        nome: req.body.nome,
        senha: req.body.senha,
        funcao: req.body.funcao,
        cpf: req.body.cpf,
        idade: req.body.idade
      }

      connection.query(sqlUpdate, [novoUser.nome, novoUser.senha, novoUser.funcao, novoUser.cpf, novoUser.idade, ID], ( err, results ) => {
        if( err ){
          console.log(err)
          logger.error('Erro ao atualizar usuário!');
          res.status(500).send('Erro ao Atualizar!')
        }else{
          logger.info('Usuário Atualizado com sucesso!')
          res.status(200).send('Usuário Atualizado!')
        }
    })
    },
// Deletar
    deleteUsuario: function( req, res ) {
      let id = req.params.id
      connection.query(sqlDelete, [id], ( err, results ) => {
          if( err ){
            logger.error('Erro ao deletar usuário!');
            res.status(500).send('Erro ao deletar!')
          }else{
            logger.info('Usuário deletado com sucesso!')
            res.status(200).send('Usuário deletado!')
          }
      })
    }
}

module.exports = sqlControlerUser