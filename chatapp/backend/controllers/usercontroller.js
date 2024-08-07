import User from "../models/usermodel.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // console.log('User in request: ', req.user); // Debug log
    const loggedInUserId = req.user._id;

    // fetch user from database 
    // we dont want to send message to ourself so we filter all other user except ourself which is loggedin user ($ne:loggedInUserId)
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
