import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image not uploaded. `req.file` is undefined.",
    });
  }

  let image_filename = req.file.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// all food list
const listFood = async (req,res)=>{
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    })
  }
}; 

// remove food item
const removeFood = async (req,res)=>{
  try {
    // find food item by id
    const food = await foodModel.findById(req.body.id);
    // // romove food image from food item
    fs.unlink(`uploads/${food.image}`,()=>{});

    // delete food item from databas
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success : true,
      message : "Food removed",
    })

  } catch (error) {
    console.log(error);
    res.json({
      success : false,
      message : "Error",
    })
  }
}

export { addFood,listFood,removeFood };
