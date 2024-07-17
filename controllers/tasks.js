const getAllTasks = (req, res) => {
  res.send("getAllTasks");
};

const createTask = (req, res) => {
  res.json(req.body);
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send("updateTask");
};

const deleteTask = (req, res) => {
  res.send("deleteTask");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
