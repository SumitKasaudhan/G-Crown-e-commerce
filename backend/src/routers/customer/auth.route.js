import {Router} from "express";
import multer from "multer";
import otp from "../../controllers/common/otp.controllers.js";
import {Signup, Login, ForgotPassword, changePassword, Signout, UpdateProfile, myProfile, GoogleAuth} from "../../controllers/customer/auth.controllers.js";
import duplicateEmail from "../../middlewares/duplicationEmail.middlware.js";
import {customerEmail} from "../../middlewares/emailPresent.middlware.js";
import isAuth from "../../middlewares/requiredLogin.middleware.js";

let router = Router();


let storage = multer.memoryStorage();

let upload = multer({storage});

router.route("/signupOtp").post(duplicateEmail, otp);
router.route("/signup").post(Signup);
router.route("/login").post(customerEmail, Login);
router.route("/googleLogin").post(duplicateEmail, GoogleAuth);
router.route("/forgetPasswordOtp").post(customerEmail, otp);
router.route("/forgetPassword").put(ForgotPassword);
router.route("/changePassword").put(isAuth, changePassword)
router.route("/signout").post(Signout);
router.route("/profile").put(isAuth, upload.single("profileImage"), UpdateProfile)
router.route("/myProfile").get(isAuth, myProfile)

export default router;
