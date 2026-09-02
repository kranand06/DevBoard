import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  githubId: { type: String },
  platforms: {
    leetcodeHandle: { type: String, default: '' },
    codeforcesHandle: { type: String, default: '' },
    codechefHandle: { type: String, default: '' },
    githubHandle: { type: String, default: '' },
    hackerrankHandle: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);