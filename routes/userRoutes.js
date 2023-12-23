import express from "express";
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from "../controllers/userControllers.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();


// To register a new user
router.route("/register").post(singleUpload, register)
// Login
router.route("/login").post(login)
// Logout
router.route("/logout").get(logout)
// Get my profile
router.route("/me").get( isAuthenticated, getMyProfile)
// delete my profile
router.route("/me").delete( isAuthenticated, deleteMyProfile)
// Change password
router.route("/changepassword").put( isAuthenticated, changePassword)
// Update profile 
router.route("/updateprofile").put( isAuthenticated, updateProfile)
// Update profile picture
router.route("/updateprofilepicture").put( isAuthenticated, singleUpload, updateProfilePicture)
// Forget password
router.route("/forgetpassword").post( isAuthenticated, forgetPassword)
// Reset password
router.route("/resetpassword/:token").put( isAuthenticated, resetPassword)
// Add to playlist
router.route("/addtoplaylist").post( isAuthenticated, addToPlaylist)
// Remove to playlist
router.route("/removefromplaylist").delete( isAuthenticated, removeFromPlaylist)

// Admin routes

// get all users
router.route("/admin/users").get( isAuthenticated, authorizeAdmin, getAllUsers)

router.route("/admin/user/:id").put( isAuthenticated, authorizeAdmin, updateUserRole).delete( isAuthenticated, authorizeAdmin, deleteUser)



export default router;