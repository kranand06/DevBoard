import mongoose from "mongoose";

const widgetConfigSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  theme: { type: String, default: 'dark' },
  widgets: [{
    id: { type: String, required: true }, // e.g., 'github-stats', 'pomodoro'
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    w: { type: Number, required: true },
    h: { type: Number, required: true },
    isVisible: { type: Boolean, default: true }
  }]
});

export default mongoose.model("WidgetConfig", widgetConfigSchema);