import express from "express";
const app = express();
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
app.use(cors()).use(json());

import user from "./routes/user.js";
import role from "./routes/role.js";
import feed from "./routes/feed.js";
import excretion from "./routes/excretion.js";
import inventory from "./routes/inventory.js";
import medication from "./routes/medication.js";
import base from "./routes/base.js";

app.use("/user", user);
app.use("/role", role);
app.use("/feed", feed);
app.use("/excretion", excretion);
app.use("/inventory", inventory);
app.use("/medication", medication);
app.use("/base", base);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Caregiver tracker listening on port ${process.env.NODE_PORT}!`);
});
