const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // If you installed and decided to use CORS

const app = express();

// Middlewares
app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());  // If you installed and decided to use CORS

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Define a Mongoose Schema and Model
const cardSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String
});

const Card = mongoose.model('Card', cardSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/projects', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json({statusCode: 200, data: cards, message: "Success"});
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    }
});

// Server Listener
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
    console.log('Successfully connected to MongoDB.');
});