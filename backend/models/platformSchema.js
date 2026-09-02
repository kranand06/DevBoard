import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    handle: {
      leetcodeHandle: { type: String, default: '' },
      codeforcesHandle: { type: String, default: '' },
      codechefHandle: { type: String, default: '' },
      githubHandle: { type: String, default: '' },
      hackerrankHandle: { type: String, default: '' },
    },

    codeforcesData: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    leetcodeData: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    codechefData: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    githubData: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
    hackerrankData: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
  },
);

export default mongoose.model('Platform', platformSchema);