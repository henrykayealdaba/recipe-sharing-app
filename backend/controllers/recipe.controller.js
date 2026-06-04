import mongoose from "mongoose";
import { Recipe } from "../models/recipe.model.js";

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "user",
      "username email",
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.error("GET RECIPE BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyRecipes = async (req, res) => {
  try {
    const userId = req.user._id;

    const recipes = await Recipe.find({ user: userId }).sort({ updatedAt: -1 });

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const { ingredient } = req.query;

    let filter = {};

    if (ingredient) {
      filter.ingredients = {
        $regex: ingredient,
        $options: "i",
      };
    }

    const recipes = await Recipe.find(filter)
      .populate("user", "username email")
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const recipe = await Recipe.create({
      user: req.user._id,
      title: title,
      ingredients: ingredients,
      instructions: instructions,
    });

    res.status(201).json({
      success: true,
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid recipe id",
      });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title,
          ingredients: req.body.ingredients,
          instructions: req.body.instructions,
          updatedAt: new Date(),
        },
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Not found" });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await recipe.deleteOne();

    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
