const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile")
const { isDemo } = require("../middlewares/demo");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth,isDemo,deleteAccount)
router.put("/updateProfile", auth,isDemo, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth,isDemo, updateDisplayPicture)
//get instructor dashboard details
router.get("/getInstructorDashboardDetails",auth,isInstructor, instructorDashboard)

module.exports = router;