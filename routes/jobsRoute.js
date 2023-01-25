const express = require("express");
const Jobs = require("../model/jobsSchema");
const router = express.Router();

router.post("/jobsform", async (req, res) => {
  const { name, position, contract, location } = req.body;

  if (!name || !position || !contract || !location) {
    return res.status(422).json({ error: "All fields are mandetory." });
  }

  const jobs = await Jobs.create(req.body);

  res.status(201).json({
    success: true,
    jobs,
  });
});

router.get("/jobslisting", async (req, res) => {
  const alljob = await Jobs.find();
  //   console.log(alljob);
  res.status(200).json({
    alljob,
  });
});

module.exports = router;
