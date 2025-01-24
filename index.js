const dotenv = require('dotenv');
const express = require('express');
const connectDb = require('./db/connection.js');

dotenv.config();

const app = express();

// Connexion à la base de données
connectDb();

// Récupération de toutes les routes
const booksRoutes = require('./controllers/books-controller.js')

app.use('/api/books', booksRoutes)

/**
 * Code de gestion des erreurs
 */
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes

    // Render a more descriptive error message as a JSON response
    res.status(503).json({ error: `Erreur : ${err.message}` });
});

app.get('*', function (req, res) {
    res.status(404).send('Ressource non trouvée');
});

app.listen(process.env.PORT, () => {
    console.log(`Le serveur a démarré sur le port ${process.env.PORT}`);
})