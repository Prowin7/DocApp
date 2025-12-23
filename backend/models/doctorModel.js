import mongoose from "mongoose";

// Define the schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // image: { type: String },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default: true },
  fees: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Number, default: Date.now },
  slots_booked: { type: Object, default: {}}
}, { 
  timestamps: true, // Adds createdAt and updatedAt fields
  minimize: false,
  collection: 'doctors' // Explicitly set the collection name
});

// Create indexes
doctorSchema.index({ email: 1 }, { unique: true });

// Export the schema and model
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export { doctorSchema, Doctor };
export default Doctor;
