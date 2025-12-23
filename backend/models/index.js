import mongoose from 'mongoose';
import { Doctor, doctorSchema } from './doctorModel.js';

// Function to register all models
const registerModels = () => {
  try {
    // Check if Doctor model is already registered
    if (!mongoose.models.Doctor) {
      // Register the model with the schema
      mongoose.model('Doctor', doctorSchema);
      console.log('Doctor model registered successfully');
      
      // Create indexes in the background
      mongoose.model('Doctor').createIndexes()
        .then(() => console.log('Doctor indexes created'))
        .catch(err => console.warn('Error creating indexes:', err));
    }
    
    // Return the models
    return {
      Doctor: mongoose.models.Doctor || Doctor
    };
    
  } catch (error) {
    console.error('Error registering models:', error);
    throw error;
  }
};

// Export the register function and the models
export { registerModels };
export default registerModels;
