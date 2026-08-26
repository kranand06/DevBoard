import mongoose from "mongoose";

const productivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  todos: [{
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
  }],
  notes: [{
    title: { type: String, default: 'Untitled Note' },
    content: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now }
  }],
  goals: [{
    goal: { type: String, required: true },
    date: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false }
  }]
});

export default mongoose.model("Productivity", productivitySchema);