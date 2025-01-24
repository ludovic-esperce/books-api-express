const express = require('express');
const router = express.Router();

const BookModel = require("../models/book-model.js");

/**
 * Définition du endpoint permettant de récupérer tous les livres.
 * 
 * Chemin : 
 */
router.get('/', async (req, res) => {

    try {
        let books = await BookModel.find();
        res.send(books);

    } catch(e) {
        console.error(e);
    }
})

module.exports = router;