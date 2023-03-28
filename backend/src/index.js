import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { usersRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import { eventsRouter } from "./routes/events.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/message", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use("/auth", authRouter);
app.use("/events", eventsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
