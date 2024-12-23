const bcrypt = require('bcryptjs');
const { User, UserContact } = require('../models');

exports.register = async (req, res) => {
    console.log(req.body)
    console.log(req.headers)
    const { name, email, password, superUser, supporter, contact, whatsapp } = req.body;

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
            supporter,
        });

        let userContact = null;
        if (contact) {
            userContact = await UserContact.create({
                user_id: user.id,
                contact,
                whatsapp: whatsapp || false,
            });
        }

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            superUser: user.superUser,
            supporter: user.supporter,
            contact: userContact ? userContact.contact : null,
            whatsapp: userContact ? userContact.whatsapp : null,
        };

        res.status(201).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar o usuário." });
    }
};

exports.list = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: UserContact,
                required: false
            }]
        });

        if (users.length === 0) {
            return res.status(404).json({ error: "Nenhum usuário encontrado." });
        }

        const usersData = users.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                superUser: user.superUser,
                supporter: user.supporter,
                contact: user.UserContacts.length > 0 ? user.UserContacts[0].contact : null,
                whatsapp: user.UserContacts.length > 0 ? user.UserContacts[0].whatsapp : null
            };
        });

        res.status(200).json(usersData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar os usuários." });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, superUser, supporter } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Nome e email são obrigatórios." });
    }

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        user.name = name;
        user.email = email;
        user.superUser = superUser !== undefined ? superUser : user.superUser;
        user.supporter = supporter !== undefined ? supporter : user.supporter;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            superUser: user.superUser,
            supporter: user.supporter,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar o usuário." });
    }
};

exports.destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        await user.destroy();

        res.status(200).json({ message: "Usuário excluído com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao excluir o usuário." });
    }
};