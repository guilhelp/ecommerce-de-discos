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
const db = require("./database/banco");

// tables
const Usuarios = require("./models/usuarios");
const Produtos = require("./models/produtos");
const Carrinho = require("./models/carrinho");

// cryptography
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
      const user = await Usuarios.findOne({ where: { email } });
      if (!user) {
          return res.status(401).json({ error: 'Email not founded' });
      }
      const passwordCorrect = await bcrypt.compare(senha, user.senha);
      if (!passwordCorrect) {
          return res.status(401).json({ error: 'Wrong password', auth: false });
      }
      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
      res.json({ token, auth: true });
  } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ error: 'Authentication error', auth: false });
  }
});

// register route
app.post('/register', async (req, res) => {
  try {
    const { nome, email, senha, data_nascimento, cep, numero, complemento } = req.body;

    const alreadyUser = await Usuarios.findOne({ where: { email } });
    if (alreadyUser) {
      return res.status(400).json({ error: 'Email has already been registered' });
    }

    const passwordHash = await bcrypt.hash(senha, 10);

    const newUser = await Usuarios.create({
      nome,
      email,
      senha: passwordHash,
      data_nascimento,
      cep,
      numero,
      complemento
    });

    res.status(201).json({ message: 'Successfully registered users', usuario: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user:' });
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