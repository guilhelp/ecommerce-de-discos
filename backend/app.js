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

// Routes

// index route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin' && password === 'admin') {
        const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: '1h' });
        return res.json({auth: true, token: token});
    } else {
        res.send('Login failed');
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