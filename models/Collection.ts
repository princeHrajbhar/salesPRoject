import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  position: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  git: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

const Collection =mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;