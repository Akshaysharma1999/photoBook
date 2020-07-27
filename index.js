const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path')
const cors = require("cors");
const PORT = process.env.PORT||5000;
const { MONGOURI } = require("./config/keys");
require("dotenv").config();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

if(process.env.NODE_ENV=="production")
{
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

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
