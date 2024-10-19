const express = require('express');
const router = express.Router();

const MenuItem = require("../models/menuItem");

router.post("/", async (req, res) => {
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
  router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find()
      console.log("data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving data" });
    }
  });


  router.get("/:testType", async(req,res) =>{
    try{
        const testType = req.params.testType;
        if(testType == 'sweet' || testType == 'spicy' || testType == 'sour'){
            const response = await MenuItem.find({taste : testType})
            console.log("testType data fetched");
            res.status(200).json(response); 
        }else{
            res.status(400).json({ message: "Invalid test type" });
            return;
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error retrieving data" });
    }
})

  module.exports = router;