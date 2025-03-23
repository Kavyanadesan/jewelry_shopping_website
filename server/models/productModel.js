import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  decription: { type: String, requried: true },
  price: { type: Number, requried: true },
  image: { type: Array, requried: true },
  category: { type: String, requried: true },
  subcategory: { type: String, requried: true },
  sizes: { type: Array, requried: true },
  bestseller: { type: Boolean },
  date: { type: Number, requried: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
