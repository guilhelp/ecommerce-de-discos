const express = require('express');
const userRouter = express.Router();
const withAuth = require('../middleware/withAuth');
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');

userRouter.put('/', withAuth, async (req, res) => {
    const { nome, email, senha, data_nascimento, cep, numero, complemento } = req.body;

    if (!nome || !email || !senha || !data_nascimento || !cep || !numero || !complemento) {
        return res.status(400).json({ error: 'Fill in all fields!' });
    }

    try {
        const userId = res.locals.userId; // Obter o ID do usuário do middleware withAuth

        const user = await Usuarios.findOne({ where: { usuarioId: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        await Usuarios.update({
            nome,
            email,
            senha: hashedPassword, 
            data_nascimento,
            cep,
            numero,
            complemento
        }, { where: { usuarioId: userId } });

        res.json({ message: 'User updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
});

userRouter.delete('/', withAuth, async (req, res) => {
    try {
        const userId = res.locals.userId;

        const user = await Usuarios.findOne({ where: { usuarioId: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await Usuarios.destroy({ where: { usuarioId: userId } });

        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

module.exports = userRouter;