import subscriberModel from "../../models/common/subscriber.models.js";
import nodemailer from "nodemailer";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js"

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json(new ApiError(400, "Invalid email"));
    }

    let subscriber = await subscriberModel.findOne({ email });

    if (subscriber) {
      return res
        .status(400)
        .json(new ApiError(400, "You have already subscribed to G-Crown."));
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Pass
      }
    });

    subscriber = await subscriberModel.create({
      email,
      confirmed: true,
      usedCodes: []
    });

    await transporter.sendMail({
      from: `"G-Crown" <logine786@gmail.com>`,
      to: subscriber.email,
      subject: "Subscription Confirmed 🎉",
      html: `<div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #fff8f2; padding: 30px; border-radius: 10px; border: 1px solid #f5e3d8; max-width: 600px; margin: auto;">

  <div style="text-align: center;">
    <h1 style="color: #c19b6b; font-weight: 600; letter-spacing: 1px; font-size: 28px; margin-bottom: 5px;">
      Welcome to G-Crown ✨
    </h1>
    <p style="color: #8b6b45; margin: 0 0 15px; font-size: 14px;">
      Discover Elegance. Embrace Luxury.
    </p>
  </div>

  <p style="color: #5e4d3c; font-size: 15px; line-height: 24px;">
    Thank you for joining our exclusive community of jewellery lovers!  
    From fine craftsmanship to timeless designs, <strong>G-Crown</strong> brings you the finest curated pieces for every moment.
  </p>

  <div style="background-color: #ffffff; border: 1px solid #e3d3c1; padding: 18px; border-radius: 8px; margin: 20px 0; text-align: center;">
    <p style="margin: 0; color: #7a5b3b; font-size: 15px;">
      <b>Your Welcome Gift Awaits 👑</b>
    </p>
    <p style="margin: 10px 0 0; font-size: 26px; font-weight: bold; color: #c19b6b; letter-spacing: 2px;">
      WELCOME20
    </p>
    <p style="margin: 8px 0 0; color: #5f4933; font-size: 14px;">
      Enjoy <strong>20% OFF</strong> on your first purchase.
    </p>
  </div>

  <p style="font-size: 14px; color: #624c35; text-align: center;">
    Because luxury belongs to those who appreciate beauty.
  </p>

  <div style="text-align: center; margin-top: 22px;">
    <a href="http://localhost:5173" style="display: inline-block; padding: 12px 26px; background-color: #c19b6b; color: white; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 500; letter-spacing: 1px;">
      Explore G-Crown
    </a>
  </div>

  <p style="text-align: center; font-size: 12px; color: #97826b; margin-top: 25px;">
    With Love & Craftsmanship — G-Crown Family
  </p>
</div>`
    });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Subscribed successfully & welcome code sent!"));

  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
  }
};


const userCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const { email } = req.user;

    if (!code) {
      return res.status(400).json(new ApiError(400, "Coupon code required"));
    }

    const coupon = code.toUpperCase();
    const subscriber = await subscriberModel.findOne({ email });

    if (!subscriber) {
      return res.status(404).json(new ApiError(404, "User not subscribed"));
    }

    const defaultCoupons = { WELCOME20: 20 };

    let percent = defaultCoupons[coupon];

    const dynamicCoupon = global.PROMO_COUPONS?.[coupon];

    if (dynamicCoupon) {

      if (dynamicCoupon.expiresAt) {
        const now = new Date();
        const expiry = new Date(dynamicCoupon.expiresAt);
        if (now > expiry) {
          return res.status(400).json(new ApiError(400, "Coupon expired"));
        }
      }

      if (subscriber.usedCodes.includes(coupon)) {
        return res.status(400).json(new ApiError(400, `${coupon} already used`));
      }

      percent = dynamicCoupon.percent;
      subscriber.usedCodes.push(coupon);
      await subscriber.save();
    }

    if (!percent) {
      return res.status(400).json(new ApiError(400, "Invalid coupon code"));
    }

    if (coupon === "WELCOME20") {
      if (subscriber.usedCodes.includes(coupon)) {
        return res.status(400).json(new ApiError(400, `${coupon} already used`));
      }
      subscriber.usedCodes.push(coupon);
      await subscriber.save();
    }

    return res
      .status(200)
      .json(new ApiResponse(200, percent, `${coupon} applied successfully!`));

  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message));
  }
};




export { subscribe, userCoupon };



