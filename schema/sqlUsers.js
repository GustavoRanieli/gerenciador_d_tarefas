require('dotenv').config()

// Dependencias
const NodeCache = require("node-cache")
const mysql = require('mysql2');
const logger = require('../controlers/winston');

//Configs
const { error } = require('winston');
const cache = new NodeCache

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
let sqlSelect = `SELECT * FROM usuario WHERE `;
const sqlInsert = 'INSERT INTO usuario (id, nome, senha, funcao, cpf, idade) VALUES (?, ?, ?, ?, ?, ?)';
const sqlUpdate = 'UPDATE usuario SET nome = ?, senha = ?, funcao = ?, cpf = ?, idade = ? WHERE ID = (?)';
const sqlDelete = 'DELETE FROM usuario WHERE ID = (?)';
const sqlSelectLogin =  'SELECT * FROM usuario WHERE cpf = ? AND senha = ?'

const sqlControlerUser = {
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
          // Implementação para Adicionar...
    },

    consultaBanco: function ( req, res ) {
      console.log(req.body)
      let conditions
      let coluna = req.body.tabela //Qual tabela procurar
      let value = req.body.valor // Valor

      // Deixando a consulta dinâmica
      conditions = `${coluna} = (?)` // Completando o WHERE

      connection.query(sqlSelect + conditions, [value], (err, results) => {
        if (err) {
          logger.error('Erro ao executar a consulta SQL:', err);
          return;
        }
        res.json(results)
        console.log( 'Consultado com sucesso!' );
      });
      // Implementação para Consultar...
    },

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
    // Implementação para Editar...
    },

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
      // Implementação para Deletar...
    },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * 
   * Função que efetua a verificação das credenciais de acesso do usuário
   */
  loginUsuario: function (req, res) {
    const { senha, cpf } = req.body;

    try {
      connection.query(sqlSelectLogin, [cpf, senha], (err, result) => {
        if (err) {
          console.error('Erro ao Procurar os usuários:', err);
          return res.status(500).send('Erro ao Procurar os usuários');
        }

        if (result.length === 0) {
          return res.status(401).send('Credenciais inválidas');
        }

        const usuario = result[0];
        switch (usuario.funcao) {
          case 'user':
            
            return res.render('usuario');
          case 'admin':
            return res.render('admin');
          default:
            return res.status(401).send('Função de usuário desconhecida');
        }
      });
    } catch (err) {
      console.error('Erro inesperado:', err);
      res.status(500).send('Erro inesperado');
    }
  }
}

module.exports = sqlControlerUser