import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },

  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      default: [],
    },
  ],
});

export const User = mongoose.model("User", userSchema);
