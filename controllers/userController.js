const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (req, res) => {
    const { name, email, password, superUser } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "O e-mail já está em uso." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            superUser,
        });

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            superUser: user.superUser,
        };

        res.status(201).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar o usuário." });
    }
};