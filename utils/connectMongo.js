const mongoose = require('mongoose');

const url = process.env.MONGO_URI
const dbName = 'sample_restaurants';


async function connectMongo() {
    try {
        // Connect to the database
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Return the Mongoose connection object
        return mongoose.connection;
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
        throw error;
    }
}

module.exports = { connectMongo };