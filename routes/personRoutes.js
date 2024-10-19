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


// update person data
router.put('/:id', async (req, res) => {
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
      new: true,
      runValidators: true
    });
    if (!updatedPersonData){
      return res.status(404).json({ message: "Person not found" }); 
    }
    console.log("data updated");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Error updating data" });
  }
})

// delete person data
router.delete('/:id', async (req, res) =>{
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response){
      return res.status(404).json({ message: "Person not found" }); 
    }
    console.log("data deleted");
    res.status(200).json(response);  // 200 status code for successful deletion. 404 status code for not found. 500 status code for server error.  // 200 status code for successful deletion. 404 status code for not found. 500 status code for server error.  // 200 status code for successful deletion. 404 status code for not found. 5
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Error deleting data" });
  }
})

module.exports = router;
