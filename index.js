const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser')
const connectDb = require('./db/connection.js');

// Recherche le fichier de configuration ".env" et initialiser les variables d'environnement
dotenv.config();

// Démarrage du framework Express
const app = express();

// Ajout du "BodyParser" à l'application afin de pouvoir analyser les JSON
// contenu dans 
app.user(bodyParser.json());

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

/**
 * Traitement de toutes les autres requêtes effectuées sur les chemins non recensés 
 */
app.get('*', function (req, res) {
    res.status(404).send('Ressource non trouvée');
});

// Lancement du serveur
app.listen(process.env.PORT, () => {
    console.log(`Le serveur a démarré sur le port ${process.env.PORT}`);
})