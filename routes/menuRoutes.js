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

// update menu items
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await MenuItem.findByIdAndUpdate(id, data, { 
      new: true,
      runValidators: true
    });
    if (!data) {
      return res.status(404).json({ message: "menu not found" }); 
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating data" });
  }
});

// delete menu items

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await MenuItem.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ message: "menu not found" }); 
    }
    console.log("data deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting data" });
  }
});

module.exports = router;