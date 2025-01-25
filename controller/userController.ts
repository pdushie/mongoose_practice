import User from '../model/userModel';

// Get all users in the collection (Read)
export const getUsers = async() => {
  try {
    return await User.find();
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Get user by ID (Read)
export const getOneUser = async(userID) => {
  try {
    const check = await User.findOne({"_id": userID}) // Check to see if userID being searched for exist
    if (!check) {
      return { 
        status: 404,
        message: "User not found"
      }
    }
    return await User.findById(userID)
  } catch (error) {
    console.error("Error fetching user", error)
  }
} 

// Create a new document (user)
export const createUser = async (body) => {
  try {
    const newUser = new User(body);
    await newUser.save();
    console.log("User created", newUser);
    
    return {
      status: 201, // HTTP Status: Created
      message: "User created successfully",
      
    };

  } catch (error) {
    console.error("Error creating user:", error)
  }
};

// Delete a document
export const deleteUser = async(userID) => {
  try {
    // Check if user exist before deleting
    const check = await User.findOne({"_id": userID})
    if (!check) {
      return {
        status: 404,
        message: "User does not exist"
      }
    }
    // if user exist, go aheaad and delete user
    return await User.findByIdAndDelete({"_id": userID})
  } catch (error) {
    console.error("Error deleting user", error)
  }

}

// Update a document
export const updateUser = async(userID, body) => {
  try {
    // Check if user exist before updating
    const check = await User.findOne({"_id": userID})
    if (!check) {
      return {
        status: 404,
        message: "User does not exist"
      }
    }
    return await User.findByIdAndUpdate(
      { _id: userID},
      { $set: body},
      {new: true, runValidators: true} // new option and runValidators set to true returns updated document and runs validations
    )
  } catch (error) {
    console.error("Error updating user", error)
  }
}