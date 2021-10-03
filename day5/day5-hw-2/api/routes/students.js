const express = require("express");
const student = require("../controller/student");
const router = express.Router();

router.get("/students",student.getAllStudents).post("/students", student.creatStudent);
router.route("/students/:id").get(student.getOneStudent).delete(student.deleteStudent).put(student.fullUpdateStudent);
router.get("/students/:id/courses",student.getCoursesForStudent);
router.get("/students/:id/courses/:cid",student.getCourseByIdInStudent);

module.exports = router;
