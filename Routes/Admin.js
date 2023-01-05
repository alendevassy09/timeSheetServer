const express = require("express");
const router = express.Router();
const controller = require("../Controllers/Controller");

router.get("/", (req, res) => {
  controller.getUser().then((response)=>{
    res.json(response)
  })
});
router.get("/timesheet", (req, res) => {
    controller.getTask().then((response)=>{
      res.json(response)
    })
  });
router.get("/stats", (req, res) => {
  controller.stats().then((response)=>{
    res.json(response)
  })
});
router.get("/monthstats", (req, res) => {
  controller.monthstats().then((response)=>{
    res.json(response)
  })
});
router.get("/getTask", (req, res) => {
  controller.getTask().then((response)=>{
    res.json(response)
  })
});
router.get("/todayTask", (req, res) => {
  controller.todayTask().then((response)=>{
    res.json(response)
  })
});
router.post("/addUser", (req, res) => {
  controller.addUser(req.body).then((response) => {
    res.json(response);
  });
});
router.post("/addTask", (req, res) => {
  controller.addTask(req.body).then((response) => {
    res.json(response);
  });
});
router.patch("/remove", (req, res) => {
  controller.remove(req.body).then((response) => {
    res.json(response);
  });
});
router.patch("/finish", (req, res) => {
  controller.finish(req.body).then((response) => {
    res.json(response);
  });
});


module.exports = router;
