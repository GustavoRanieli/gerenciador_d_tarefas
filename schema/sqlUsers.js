require('dotenv').config()

// Dependencias
const mysql = require('mysql2');
const logger = require('../controlers/winston');

//Configs
const { error } = require('winston');
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


// Funções
let sqlSelect = `SELECT * FROM usuario WHERE `;
let sqlAllSelect = `SELECT * FROM usuario WHERE id <> ?`;
const sqlDeleteTarefa = 'DELETE FROM tarefas WHERE id_usuario = ?';
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

        connection.query(sqlSelect + 'cpf = ?', [usuario.cpf], ( err, result ) => {
          if(err){
            logger.error('Erro ao consultar se o usuário já existe', err);
          }else{
            if(result.length == 0){
                connection.query(sqlInsert, [usuario.id, usuario.nome, usuario.senha, usuario.funcao, usuario.cpf, usuario.idade], (err, result) => {
                  if (err) {
                    logger.error('Erro ao inserir registro no banco de dados:', err);
                    res.status(500).send('Erro')
                  }else{
                    logger.info('Registro inserido com sucesso. ID:', result);
                    res.status(200).redirect('administrate')
                  }
                });
            }else{
              let nome = usuario.nome;
              let senha = usuario.senha;
              let idade = usuario.idade;
              let verify = 1;
              return res.status(401).render('newUser', { verify, nome, senha, idade })
            }
          }
        })

        // connection.query(sqlInsert, [usuario.id, usuario.nome, usuario.senha, usuario.funcao, usuario.cpf, usuario.idade], (err, result) => {
        //     if (err) {
        //       logger.error('Erro ao inserir registro no banco de dados:', err);
        //       res.status(500).send('Erro')
        //     }else{
        //       logger.info('Registro inserido com sucesso. ID:', result);
        //       res.status(200).send('Usuário Cadastrado!')
        //     }
        //   });
          // Implementação para Adicionar...
    },

    consultarTodosUsers: function( req, res ) {
      let id = cache.get('id_admin')
      connection.query(sqlAllSelect, [id], (err, results) => {
        if (err) {
          logger.error('Erro ao executar a consulta SQL:', err);
          return;
        }
        res.json(results)
        console.log( 'Consultado com sucesso!' );
      });
      //Consultando todos os usuários
    },

    consultaBanco: function ( req, res ) {
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
          res.status(200).render('admin')
        }
    })
    // Implementação para Editar...
    },

    deleteUsuario: function( req, res ) {
      let id = req.params.id
      connection.query(sqlDeleteTarefa, [id], ( err, results ) => {
        connection.query(sqlDelete, [id], ( err, results ) => {
          if( err ){
            logger.error('Erro ao deletar usuário!');
            res.status(500).send('Erro ao deletar!')
          }else{
            logger.info('Usuário deletado com sucesso!')
            res.status(200).render('admin')
          }
      })
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
            let verify = 1
            return res.status(401).render('login', { verify });
          }

          const usuario = result[0];
          switch (usuario.funcao) {
            case 'user':
              cache.set('id_user', usuario.id, 3600)
              return res.redirect('/paginainicial')
            case 'admin':
              cache.set('id_admin', usuario.id, 3600)
              return res.redirect('/administrate');
            default:
              return res.status(401).send('Função de usuário desconhecida');
          }
        });
      } catch (err) {
        logger.error('Erro inesperado:', err);
        res.status(500).send('Erro inesperado');
      }
    },

    quebrarLogin: function( req, res ){
      cache.del('id_user');
      res.redirect('/');
    },

    renderizarAdmin: function( req, res ){
      if(cache.has('id_admin')){
        let adminId = cache.get('id_admin');
        res.render('admin');
      }else{
        logger.error('Não existe usuário registrado no cache!')
        res.send('Administrador não encontrado')
      }
    },
    
    renderizarUsuario: function( req, res ){
      if(cache.has('id_user')){
        let adminId = cache.get('id_user');
        res.render('usuario');
      }else{
        logger.error('Não existe usuário registrado no cache!')
        res.send('Usuário não encontrado')
      }
    }
}

module.exports = sqlControlerUser