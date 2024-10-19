// express
// mongoDB
const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("This is Home Page");
});

const personRoutes = require("./routes/personRoutes");
app.use('/person',personRoutes) 

const menuRoutes = require("./routes/menuRoutes");
app.use('/menu',menuRoutes)
  

app.listen(port, () => console.log(`server listening on port ${port}`));
