const express = require('express');
require('dotenv').config();
const userRoutes            = require('./routes/userRoutes');
const authRoutes            = require('./routes/authRoutes');
const postRoutes            = require('./routes/postRoutes');
const postInteractionRoutes = require('./routes/postInteractionRoutes');

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post-interaction', postInteractionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));