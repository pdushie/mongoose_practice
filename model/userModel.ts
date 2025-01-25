import mongoose from "mongoose";

// Define schema. It should match structure of collection in mongoDB
const userSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Number,
  nationality: String,
  hasValidStatus: Boolean
});

const User = mongoose.model('User', userSchema);
export default User;