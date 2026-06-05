import { User } from "../models/user.model.js";
import { Recipe } from "../models/recipe.model.js";

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const recipes = await Recipe.find({
      _id: { $in: user.favorites },
    }).populate("user", "username email");

    res.status(200).json({
      success: true,
      favorites: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const recipeId = req.params.id;

    const alreadyFav = user.favorites.includes(recipeId);

    if (alreadyFav) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== recipeId,
      );
    } else {
      user.favorites.push(recipeId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
