const mongoose = require('mongoose');


const connectDb = async () => {

    const mongoConnectionString = process.env.AZURE_COSMOS_CONNECTIONSTRING || process.env.MONGO_URI;

    try {
        await mongoose.connect(mongoConnectionString);
        console.log('Connexion à MongoDB effectuée avec succès');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;