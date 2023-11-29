import UserModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";

// get all Users
export const getAllUser = async (req, res) => {
  // Check if the request has an 'Origin' header
  const url = req.get('Origin');
  console.log('Domain:', url);

  if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
    res.status(403).json({ message: `${process.env.AccessForbiddenCustomMsg}`, url: url });
    return;
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10000000;
    const skip = (page - 1) * limit;
    const users = await UserModel
      .find()
      .select('-password')
      .skip(skip)
      .limit(limit);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get a User
export const getUser = async (req, res) => {
  
  const id = req.params.id;

 // Check if the request has an 'Origin' header
  const url = req.get('Origin');
  console.log('Domain:', url);

  if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
    res.status(403).json({ message: `${process.env.AccessForbiddenCustomMsg}`, url: url });
    return;
  }

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...userDetails } = user._doc;
      // Extract specific fields
      const { _id, firstname, lastname, gender, username, followers, following, likesRoommate, likesRoom } = userDetails;
      res.status(200).json({ _id, firstname, lastname, gender, username, followers, following, likesRoommate, likesRoom });
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, password } = req.body;

  // Check if the request has an 'Origin' header
  const url = req.get('Origin');
  console.log('Domain:', url);

  if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
    res.status(403).json({ message: `${process.env.AccessForbiddenCustomMsg}`, url: url });
    return;
  }

  try {
    // Retrieve the user from the database
    const user = await UserModel.findById(id);

    // Compare currentUserId with the retrieved user's id
    if (id === currentUserId) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Update the user's profile
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);

        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        res.status(200).json(updatedUser);
      } else {
        res.status(403).json("Invalid password");
      }
    } else {
      res.status(403).json("Access Denied! You can only update your own profile");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  // Check if the request has an 'Origin' header
  const url = req.get('Origin');
  console.log('Domain:', url);

  if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
    res.status(403).json({ message: `${process.env.AccessForbiddenCustomMsg}`, url: url });
    return;
  }

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;

  // Check if the request has an 'Origin' header
  const url = req.get('Origin');
  console.log('Domain:', url);

  if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
    res.status(403).json({ message: `${process.env.AccessForbiddenCustomMsg}`, url: url });
    return;
  }

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);
      
      try {
        const user = await UserModel.findById(currentUserId);
    
        if (user) {
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("User followed!");
            } else {
                res.status(403).json("User is Already followed by you");
            }
        }
        else {
            res.status(404).json("No such user exists that you are trying to follow.");
            }
        } catch (error) {
            res.status(500).json(error);
        }

    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// UnFollow a User
export const UnFollowUser = async (req, res) => {
  const id = req.params.id;

  // Check if the request has an 'Origin' header
  const url = req.get('Origin');
  console.log('Domain:', url);

  if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
    res.status(403).json({ message: `${process.env.AccessForbiddenCustomMsg}`, url: url });
    return;
  }

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);


      try {
        const user = await UserModel.findById(currentUserId);
    
        if (user) {
            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.status(200).json("User Unfollowed!");
            } else {
            res.status(403).json("User is not followed by you");
            }
        }
        else {
            res.status(404).json("No such user exists that you are trying to unfollow.");
            }
        } catch (error) {
            res.status(500).json(error);
        }     
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// follow/unfollow - like/unlike a room (trying 2nd method - smaller version).
export const likeRoom = async (req, res) => {
  const id = req.params.id;

  // Check if the request has an 'Origin' header
  const url = req.get('Origin');
  console.log('Domain:', url);

  if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
    res.status(403).json({ message: `${process.env.AccessForbiddenCustomMsg}`, url: url });
    return;
  }

  const { roomId } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user.likesRoom.includes(roomId)) {
      await user.updateOne({ $push: { likesRoom: roomId } });
      res.status(200).json("Room liked");
    } else {
      await user.updateOne({ $pull: { likesRoom: roomId } });
      res.status(200).json("Room Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/unlike a roommate
export const likeRoommate = async (req, res) => {
  const id = req.params.id;

  // Check if the request has an 'Origin' header// Check if the request has an 'Origin' header
  const url = req.get('Origin');
  console.log('Domain:', url);

  if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
    res.status(403).json({ message: `${process.env.AccessForbiddenCustomMsg}`, url: url });
    return;
  }

  const { roommateId } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user.likesRoommate.includes(roommateId)) {
      await user.updateOne({ $push: { likesRoommate: roommateId } });
      res.status(200).json("Roommate liked");
    } else {
      await user.updateOne({ $pull: { likesRoommate: roommateId } });
      res.status(200).json("Roommate Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};