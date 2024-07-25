const notFount = (req, res) =>
  res.status(404).send(`Route not found: ${req.url}`);

module.exports = { notFount };
