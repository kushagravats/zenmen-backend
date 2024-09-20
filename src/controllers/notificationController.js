const sendNotification = (req, res, io) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  io.emit("notification", { message });

  res.status(200).json({ success: "Notification sent" });
};

module.exports = { sendNotification };
