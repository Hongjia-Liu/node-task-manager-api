# Node Task Manager API

## API Design

- GET     /api/v1/tasks        - get all the tasks
- POST    /api/v1/tasks        - create a new task
- GET     /api/v1/tasks/:id    - get a single task
- PATCH   /api/v1/tasks/:id    - update a task
- DELETE  /api/v1/tasks/:id    - delete a task

## Implement Basic API

Setup controllers

```js
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
```

Create routes

```js
const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
```

Prepare middleware and require routes to be passed in to app.use

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

// middleware
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port 3000`);
});
```

## Connect to MongoDB Atlas

Setup MongoDB Atlas connection string in `.env`

In `./db/connect.js`, we have

```js
const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = { connectDB };
```

In `app.js`, connect our server to MongoDB Atlas

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const { connectDB } = require("./db/connect");
require("dotenv").config();
// middleware
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
```

## Define Schema and Create Model

In `./models/Task.js`, we have

```js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this task."],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
```