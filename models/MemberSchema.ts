import mongoose from "mongoose";

// Define the schema
const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  ecell_id: {
    type: String,
    required: true,
  },
  description: String,
  phone: {
    type: String,
    required: true,
  },
  position: String,
  portfolio_url: {
    type: String,
    required: true,
  },
  git_url: {
    type: String,
    required: true,
  },
  linkdin_url: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure no re-declaration of the model
export default mongoose.models.Members || mongoose.model("Members", MemberSchema);
