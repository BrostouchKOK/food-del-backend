import mongoose from "mongoose";

export const conectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://brostouchkokit1007:kbt1007@cluster0.yn8dfjh.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
