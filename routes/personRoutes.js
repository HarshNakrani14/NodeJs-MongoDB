const express = require('express');
const router = express.Router();

const Person = require("../models/Person");

router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
    try {
      const data = await Person.find()
      console.log("data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving data" });
    }
});


// get data according to work professions 
router.get("/:workType", async(req,res) =>{
    try{
        const workType = req.params.workType;
        if(workType == 'chief' || workType == 'waiter' || workType == 'manager'){
            const response = await Person.find({work : workType})
            console.log("workType data fetched");
            res.status(200).json(response); 
        }else{
            res.status(400).json({ message: "Invalid work type" });
            return;
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error retrieving data" });
    }
})

module.exports = router;
