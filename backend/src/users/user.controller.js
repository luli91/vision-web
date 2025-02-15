const User = require('./user.model');

const ensureUserData = async (uid) => {
  let user = await User.findOne({ uid });
  if (!user) {
    user = new User({
      uid: uid,
      displayName: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
      },
      phone: '',
    });
    await user.save();
    console.log("Datos del usuario inicializados:", user);
  }
  return user;
};

const updateUser = async (req, res) => {
  try {
    console.log("updateUser called with data:", req.body);
    await ensureUserData(req.params.uid);
    
    const updatedUser = await User.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true });
    console.log("User updated:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    console.log("getUserById called with id:", req.params.id);
    const user = await ensureUserData(req.params.id);
    console.log("User fetched:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    console.log("getUserProfile called with uid:", req.params.uid);
    const user = await ensureUserData(req.params.uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User profile fetched:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    console.log("updateUserProfile called with data:", req.body);
    const updatedUser = await User.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true });
    console.log("User profile updated:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  updateUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
};
