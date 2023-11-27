const cors = require("cors");
const express = require("express");
const logger = require("./logger");

const additionRoute = require("./routes/addition");
const subtractionRoute = require("./routes/subtraction");
const multiplicationRoute = require("./routes/multiplication");
const divisionRoute = require("./routes/division");
const powerRoute = require("./routes/power");
const sqrtRoute = require("./routes/sqrt");
const logRoute = require("./routes/log");
const factorialRoute = require("./routes/factorial");
const userRoute = require("./routes/user")

const app = express();
const port = 4002;

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/api/", (req, res) => {
  res.json({ txt: "Hello World!" });
});

app.use("/api/add", additionRoute);
app.use("/api/subtract", subtractionRoute);
app.use("/api/multiply", multiplicationRoute);
app.use("/api/divide", divisionRoute);
app.use("/api/power", powerRoute);
app.use("/api/sqrt", sqrtRoute);
app.use("/api/log", logRoute);
app.use("/api/factorial", factorialRoute);
app.use("/api/user", userRoute);


const mongoose = require('mongoose');

const start = async () => {
try {
  await mongoose.connect(
    'mongodb+srv://tester:'+process.env.DB_PASS+'@cluster0.qyr7kyl.mongodb.net/?retryWrites=true&w=majority',
    // { useUnifiedTopology: true }
  );
  app.listen(port, () => logger.log("info", `Calculator BackEnd listening on port ${port}`));
} catch (error) {
  console.error(error);
  process.exit(1);
}
}

start();

module.exports = app;