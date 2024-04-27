const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/withAuth');
const SECRET = process.env.SECRET_KEY;
const Usuarios = require("../models/usuarios");
const bcrypt = require('bcrypt');

authRouter.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, data_nascimento, cep, numero, complemento } = req.body;

        if (!nome || !email || !senha || !data_nascimento || !cep || !numero || !complemento) {
            return res.status(400).json({ error: 'Fill in all fields!' });
        }

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

        newUser.setDataValue('senha', undefined);
        const token = jwt.sign({ userId: newUser.usuarioId, sub: newUser.email }, SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Successfully registered users', usuario: newUser, token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user:' });
    }
});

authRouter.post('/login', async (req, res) => {
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
        const token = jwt.sign({ userId: user.usuarioId, sub: user.email }, SECRET, { expiresIn: '1h' });
        res.json({ token, auth: true });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Authentication error', auth: false });
    }
});

authRouter.get("/auth", withAuth, (req, res) => {
    console.log("res.locals.email", res.locals.email)
    return res.json({userId: res.locals.userId, email: res.locals.email})
})

module.exports = authRouter;