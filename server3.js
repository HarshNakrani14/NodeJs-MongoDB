// express
// mongoDB

const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/Person");
const MenuItem = require("./models/menuItem");

app.get("/", function (req, res) {
  res.send("This is Home Page");
});

app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("response data saved.");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving data" });
  }
});

// get person data from database

app.get("/person", async (req, res) => {
  try {
    const data = await Person.find()
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving data" });
  }
});


app.post("/menu", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log("response data saved.");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error saving data" });
    }
  });
  
  // get menu data from database
  
  app.get("/menu", async (req, res) => {
    try {
      const data = await MenuItem.find()
      console.log("data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving data" });
    }
  });
  

app.listen(port, () => console.log(`server listening on port ${port}`));
