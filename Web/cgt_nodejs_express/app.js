const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors()).use(bodyParser.json());

const user = require("./routes/user");
const role = require("./routes/role");
const feed = require("./routes/feed");
const excretion = require("./routes/excretion");
const inventory = require("./routes/inventory");
const medication = require("./routes/medication");
const test = require("./routes/test");

app.use("/user", user);
app.use("/role", role);
app.use("/feed", feed);
app.use("/excretion", excretion);
app.use("/inventory", inventory);
app.use("/medication", medication);
app.use("/test", test);

app.listen(3000, () => {
  console.log(`Caregiver tracker listening on port 3000!`);
});
