const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = 5000;
const { MONGOURI } = require("./keys");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

mongoose.connect(
  MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return err;
    }
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log("http://localhost:" + PORT);
    });
  }
);
