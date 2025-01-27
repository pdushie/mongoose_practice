import mongoose from "mongoose";

// Define schema. It should match structure of collection in mongoDB
const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  yearOfBirth: {type: Number, required: true},
  nationality: {type: String, required: true},
  hasValidStatus: {type: Boolean, required: true},
});

const User = mongoose.model('User', userSchema);
export default User;