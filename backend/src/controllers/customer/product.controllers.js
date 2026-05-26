import productModel from "../../models/common/product.models.js";
import authModel from "../../models/customer/user.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({
        deleted: { $ne: true },
        status: true,
      })
      .sort({ createdAt: -1 }) // uses index tail part
      .lean();

    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, [{ message: err.message }]));
  }
};

const newArrivalProducts = async (req, res) => {
  try {
    let productList = await productModel
      .find({
        deleted: { $ne: true },
        status: false,
      })
      .sort({ createdAt: -1 })
      .lean();

    if (productList.length === 0) {
      return res.status(404).json(new ApiError(404, "No New Product Arrival"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, productList, "Successful"));
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

const addReview = async (req, res) => {
  try {
    const { productId } = req.query;
    const { _id, role } = req.user;

    if (role) {
      return res
        .status(401)
        .json(
          new ApiError(401, "Your are not loged in, please login to proceed."),
        );
    }

    let { title, comment, rating } = req.body;

    if (!title) {
      title = comment;
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json(new ApiError(404, "Product not found"));
    }

    const userDetail = await authModel.findById(_id);

    product.reviews.push({
      customerId: _id,
      name: `${userDetail.firstName} ${userDetail.lastName}`,
      email: userDetail.email,
      title,
      comment,
      rating,
      media: userDetail.profileImage,
      createdAt: new Date(),
    });

    product.rating.totalReviews = product.reviews.length;
    product.rating.avg =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) /
      product.rating.totalReviews;

    await product.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Review added successfully"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId).select("reviews");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product.reviews || []);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export { getAllProducts, addReview, getProductReviews, newArrivalProducts };
