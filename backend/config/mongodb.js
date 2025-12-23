import mongoose from "mongoose";
import { registerModels } from '../models/index.js';

// Create a connection class to manage MongoDB connection state
class MongoDBConnection {
  constructor() {
    this.isConnected = false;
    this.connection = null;
  }

  async connect() {
    if (this.isConnected) {
      console.log('Using existing database connection');
      return this.connection;
    }

    try {
      // Ensure the connection string has the database name properly set
      let uri = process.env.MONGODB_URI;
      // If the URI doesn't end with the database name, append it
      if (!uri.includes('mongodb.net/prescripto')) {
        // Remove any trailing slash and append /prescripto if not already in the URI
        uri = uri.replace(/\/$/, '') + '/prescripto';
      }
      console.log("Connecting to MongoDB with URI:", uri.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+@/, '$1*****@'));

      // Configure mongoose options
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: true,
      };

      // Register models before connecting
      const models = registerModels();
      console.log('Registered models:', Object.keys(models));

      // Set up event listeners
      mongoose.connection.on('connected', () => {
        this.isConnected = true;
        console.log('Mongoose connected to DB');
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
        this.isConnected = false;
      });

      // Connect to MongoDB
      this.connection = await mongoose.connect(uri, options);
      console.log('Successfully connected to MongoDB');

      // Ensure collections exist
      await this.ensureCollections();

      return this.connection;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async ensureCollections() {
    try {
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map(c => c.name);
      
      console.log('Available collections:', collectionNames);

      // Ensure doctors collection exists
      if (!collectionNames.includes('doctors')) {
        console.log('Creating doctors collection...');
        const Doctor = mongoose.model('Doctor');
        
        // Create collection by inserting and then removing a document
        await new Doctor({
          name: 'Dummy Doctor',
          email: 'dummy@example.com',
          password: 'dummy',
          image: '',
          speciality: 'General',
          degree: 'MD',
          experience: '1 Year',
          about: 'Dummy doctor for collection creation',
          fees: 0,
          address: { line1: 'Dummy', line2: 'Address' },
          date: Date.now()
        }).save({ validateBeforeSave: false });
        
        // Remove the dummy document
        await Doctor.deleteOne({ email: 'dummy@example.com' });
        console.log('Doctors collection created and initialized');
      }

    } catch (error) {
      console.error('Error ensuring collections:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('MongoDB connection closed');
    }
  }
}

// Create a singleton instance
const mongoDB = new MongoDBConnection();

export default mongoDB;