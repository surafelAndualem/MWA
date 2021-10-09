const express=require("express");
const router=express.Router();
const jobs=require("../controller/jobCcontroller.js");


router.route("/jobs").get(jobs.getAllJobs).post(jobs.addNewJobs)
router.route("/jobs/:jid").get(jobs.getOneJob).delete(jobs.deleteJob).put(jobs.updateJob);
//for location
router.route("/jobs/:jid/location").get(jobs.getLocationForJob).post(jobs.addLocation)
router.route("/jobs/:jid/location/:lid").get(jobs.getgetLocationbyId).delete(jobs.deleteLocation).put(jobs.updatLocation)
module.exports=router;