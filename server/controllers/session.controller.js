// server/controllers/session.controller.js
import Session from '../models/Session.js';

export const createNewSession = async (req, res) => {
  try {
    const session = new Session({ userId: req.user.id });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create session' });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

export const updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const { chatLog, jsxCode, cssCode } = req.body;

  try {
    const session = await Session.findByIdAndUpdate(
      sessionId,
      {
        chatLog,
        jsxCode,
        cssCode,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update session' });
  }
};
