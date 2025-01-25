import mongoose from "mongoose";

// Define schema. It should match structure of collection in mongoDB
const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  dateOfBirth: {type: Number, required: true, min: 1900, max: 2024},
  nationality: {type: String, required: true},
  hasValidStatus: {type: Boolean, required: true}
});

export default mongoose.model('userModel', userSchema);