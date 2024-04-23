const express = require('express');
const app = express();
const port = 3000;

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT
const jwt = require('jsonwebtoken');
const SECRET = 'secretkey';

// database
const db = require("./src/database/banco");

// tables
const Usuarios = require("./src/models/usuarios");
const Produtos = require("./src/models/produtos");
const Carrinho = require("./src/models/carrinho");

// criptografia
const bcrypt = require('bcrypt');

// Routes

// index route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// login route
app.post('/login', async (req, res) => {
  try {
      const { email, senha } = req.body;
      const usuario = await Usuarios.findOne({ where: { email } });
      if (!usuario) {
          return res.status(401).json({ error: 'E-mail não encontrado' });
      }
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
          return res.status(401).json({ error: 'Senha incorreta' });
      }
      const token = jwt.sign({ userId: usuario.id }, SECRET, { expiresIn: '1h' });
      res.json({ auth: true, token });
  } catch (error) {
      console.error('Erro de autenticação:', error);
      res.status(500).json({ error: 'Erro de autenticação' });
  }
});

// cadastrar route
app.post('/cadastrar', async (req, res) => {
  try {
    const { nome, email, senha, data_nascimento, cep, numero, complemento } = req.body;

    const usuarioExistente = await Usuarios.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuarios.create({
      nome,
      email,
      senha: senhaHash,
      data_nascimento,
      cep,
      numero,
      complemento
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// logout route
app.post('/logout', (req, res) => { 
    res.send('Logout success');
});

// start the server
app.listen(port, () => {    
  console.log(`Server listening at http://localhost:${port}`);
});