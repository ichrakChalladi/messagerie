const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;
  const message = new Message({ sender, receiver, content });
  try {
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.receiveMessages = async (req, res) => {
  const { receiver } = req.params;
  try {
    const messages = await Message.find({ receiver });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.checkMessageStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json({ status: message.status });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMessageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const message = await Message.findByIdAndUpdate(id, { status }, { new: true });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
