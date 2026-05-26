import wishlistModel from "../../models/customer/wishList.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import mongoose from "mongoose";

const addWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { _id, role } = req.user;

    if (role) {
      return res
        .status(401)
        .json(
          new ApiError(401, "Your are not loged in, please login to proceed."),
        );
    }

    let wishlist = await wishlistModel.findOne({ customerId: _id });

    if (!wishlist) {
      wishlist = wishlistModel({
        customerId: _id,
        wishlist: [productId],
      });

      await wishlist.save();
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Added to wishlist"));
    }

    if (wishlist.wishlist.includes(productId)) {
      return res
        .status(409)
        .json(new ApiError(409, "Product already in wishlist"));
    }

    wishlist.wishlist.push(productId);
    await wishlist.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Added to wishlist"));
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiError(500, err.message, [
          { message: err.message, name: err.name },
        ]),
      );
  }
};

const removeWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { _id, role } = req.user;

    if (role) {
      return res
        .status(401)
        .json(
          new ApiError(401, "Your are not loged in, please login to proceed."),
        );
    }

    const wishlist = await wishlistModel.findOneAndUpdate(
      { customerId: _id },
      { $pull: { wishlist: productId } },
      { new: true },
    );

    if (!wishlist) {
      return res.status(404).json(new ApiError(404, "Wishlist not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Removed from wishlist"));
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiError(500, err.message, [
          { message: err.message, name: error.name },
        ]),
      );
  }
};

const removeAll = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role) {
      return res
        .status(401)
        .json(
          new ApiError(401, "Your are not loged in, please login to proceed."),
        );
    }

    const wishlist = await wishlistModel.findOne({ customerId: _id });

    if (!wishlist) {
      return res.status(404).json(new ApiError(404, "Wishlist not found"));
    }

    wishlist.wishlist = [];

    await wishlist.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Wishlist cleared successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiError(500, err.message, [
          { message: err.message, name: err.name },
        ]),
      );
  }
};

const getWishlist = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role) {
      return res
        .status(401)
        .json(
          new ApiError(401, "Your are not loged in, please login to proceed."),
        );
    }

    const wishlist = await wishlistModel.aggregate([
      {
        $match: {
          customerId: new mongoose.Types.ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "wishlist",
          foreignField: "_id",
          as: "products",
        },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, wishlist, "Your Wish List Items."));
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiError(500, err.message, [
          { message: err.message, name: err.name },
        ]),
      );
  }
};

export { addWishlist, removeWishlist, removeAll, getWishlist };
