import {Router} from "express";
import {addWishlist, removeWishlist,removeAll, getWishlist} from "../../controllers/customer/wishlist.controllers.js";
import isAuth from "../../middlewares/requiredLogin.middleware.js";

const router = Router();

router.route("/add").post(isAuth, addWishlist);
router.route("/remove").put(isAuth, removeWishlist);
router.route("/removeall").put(isAuth, removeAll);
router.route("/allitem").get(isAuth, getWishlist);

export default router