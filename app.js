const express = require('express');
require('dotenv').config({path: '.env'});
const userRoutes  = require('./routes/userRoutes');
const authRoutes  = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');

const app = express();

app.use(cors({ 
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));
  
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));