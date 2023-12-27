import express from "express";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures  } from "../controllers/courseControllers.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Get All courses without Lectures
router.route("/courses").get(getAllCourses)

//  Create new course - only admin 
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse)

// Add lectures, delete course and course details
router.route("/course/:id").get(isAuthenticated, authorizeSubscribers, getCourseLectures).post( isAuthenticated, authorizeAdmin, singleUpload, addLecture).delete(isAuthenticated, authorizeAdmin, deleteCourse)

// delete lectures
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture)

export default router;