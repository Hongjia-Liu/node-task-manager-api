const getAllTasks = (req, res) => {
  res.json({
    success: true,
    data: [],
  });
};

module.exports = { getAllTasks };
