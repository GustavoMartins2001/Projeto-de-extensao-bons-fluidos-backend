const { Event, User } = require('../models');

exports.create = async (req, res) => {

    const { date, description, participants } = req.body;

    if (!date || !description || !participants) {
        return res.status(400).json({ error: "Data, descrição e participantes são obrigatórios." });
    }

    try {
        const newEvent = await Event.create({
            date,
            description
        });

        const ids = participants.map(participant => participant.id);

        const users = await User.findAll({
            where: {
                id: ids
            }
        });

        if (users.length !== participants.length) {
            return res.status(404).json({ error: "Um ou mais usuários não foram encontrados." });
        }

        await newEvent.setUsers(users);

        res.status(201).json({
            id: newEvent.id,
            date: newEvent.date,
            description: newEvent.description,
            participants: users.map(user => user.id),
            createdAt: newEvent.createdAt,
            updatedAt: newEvent.updatedAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar evento." });
    }
};

exports.list = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [{
                model: User,
                through: { attributes: [] },
                attributes: ['id', 'name', 'email']
            }]
        });

        if (events.length === 0) {
            return res.status(404).json({ error: "Nenhum evento encontrado." });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar eventos." });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.query
        const event = await Event.findByPk(id, {
            include: [{
                model: User
            }]
        });
        

        if (event == null || event == undefined) {
            return res.status(404).json({ error: "evento não encontrado." });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar eventos." });
    }
};

exports.destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ error: "Evento não encontrado." });
        }

        await event.destroy();

        res.status(200).json({ message: "Evento excluído com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao excluir o evento." });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;  
    const { date, description, participants } = req.body;

    if (!date || !description || !participants) {
        return res.status(400).json({ error: "Data, descrição e participantes são obrigatórios." });
    }

    try {
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ error: "Evento não encontrado." });
        }

        event.date = new Date(date);
        event.description = description;
        await event.save();

        const ids = participants.map(participant => participant.id);

        const users = await User.findAll({
            where: {
                id: ids
            }
        });

        if (users.length !== participants.length) {
            return res.status(404).json({ error: "Um ou mais usuários não foram encontrados." });
        }

        await event.setUsers(users);

        res.status(200).json({
            message: "Evento atualizado com sucesso.",
            event: {
                id: event.id,
                date: event.date,
                description: event.description,
                participants: users.map(user => user.id),
                createdAt: event.createdAt,
                updatedAt: event.updatedAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar o evento." });
    }
};