const dotenv = require('dotenv');

const express = require('express');
const fs = require('fs');

dotenv.config();

const app = express();

app.get('/api/books', (req, res) => {
    
    let books = JSON.parse(fs.readFileSync('./data/books.json', 'utf8'));

    res.send(books);
}
);

/**
 * Code de gestion des erreurs
 */
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
  
    // Render a more descriptive error message as a JSON response
    res.status(503).json({ error: `Erreur : ${err.message}` });
});

app.get('*', function(req, res){
    res.status(404).send('Ressource non trouvée');
  });  

app.listen(process.env.PORT, () => {
    console.log(`Le serveur a démarré sur le port ${process.env.PORT}`);
})