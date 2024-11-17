require('dotenv').config(); // Подключаем dotenv для загрузки переменных окружения
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Подключение к базе данных MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Роуты
app.use('/auth', authRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/admin', userRoutes);

// Главная страница
app.get('/', (req, res) => {
  res.render('index');
});

// Запуск сервера
const port = process.env.PORT || 3000; // Используем PORT из переменных окружения
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
