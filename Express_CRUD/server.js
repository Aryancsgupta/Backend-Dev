import express from "express";
import { logfun, userValidation, authMiddleware } from "./middleware.js";

const app = express();

const data = [
  {
    id: 1,
    username: "qwer",
    password: "qwer123",
  },
  {
    id: 2,
    username: "ramesh",
    password: "1234",
  },
];

app.use(express.json());
app.use(logfun);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "home route",
  });
});

app.get("/user", (req, res) => {
  res.status(200).json({
    message: "all user",
    data,
  });
});

app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = data.find((ele) => ele.id === id);

  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  res.status(200).json({
    message: "user found",
    user,
  });
});

app.post("/user", userValidation, (req, res) => {
  let newuser = {
    id: data.length + 1,
    ...req.body,
  };

  data.push(newuser);

  res.status(200).json({
    message: "user created",
  });
});


app.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "welcome to admin profile",
  });
});

app.put("/user/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let userIdx = data.findIndex((ele) => ele.id === id);

  if (userIdx === -1) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  data[userIdx] = { ...data[userIdx], ...req.body };

  res.status(200).json({
    message: "user updated",
  });
});

app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIdx = data.findIndex((ele) => ele.id === id);

  if (userIdx === -1) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  const userdeleted = data[userIdx];
  data.splice(userIdx, 1);

  res.status(200).json({
    message: "user deleted",
    user: userdeleted,
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
