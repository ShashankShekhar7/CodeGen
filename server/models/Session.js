// server/models/Session.js
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chatLog: [
    {
      role: { type: String, enum: ['user', 'ai'], required: true },
      content: { type: String, required: true },
    },
  ],
  jsxCode: { type: String, default: '' },
  cssCode: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', SessionSchema);
export default Session;
