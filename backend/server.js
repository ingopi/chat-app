const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();

app.use(express.json()); // To accept json data
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  res.send("API IS running");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   //   console.log(req.params.id);

//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 2000;
app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
