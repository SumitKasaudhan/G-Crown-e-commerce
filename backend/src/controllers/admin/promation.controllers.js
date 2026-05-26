import subscriberModel from "../../models/common/subscriber.models.js";
import nodemailer from "nodemailer";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js"


const promation = async (req, res) => {
  try {
    const { subject, message, code, percent, expiresAt } = req.body;

    if (!global.PROMO_COUPONS) global.PROMO_COUPONS = {};

    if (!subject || !message) {
      return res.status(400).json(new ApiError(400, "Subject and message are required."));
    }

    const promoCode = code?.toUpperCase();

    if (promoCode && !percent) {
      return res.status(400).json(new ApiError(400, "Percent is required for promo coupon"));
    }

    if (promoCode && !expiresAt) {
      return res.status(400).json(new ApiError(400, "Expiry date is required for promo coupon"));
    }

    const expiry = new Date(expiresAt);
    if (promoCode && isNaN(expiry.getTime())) {
      return res.status(400).json(new ApiError(400, "Invalid expiry date"));
    }

    const subscribers = await subscriberModel.find({ confirmed: true });
    const emails = subscribers.map(s => s.email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Pass
      }
    });

    await transporter.sendMail({
      from: `"G-Crown" <logine786@gmail.com>`,
      bcc: emails,
      subject,
      html: promoCode ? `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #fff8f2; padding: 30px; border-radius: 10px; border: 1px solid #f5e3d8; max-width: 600px; margin: auto;">

          <div style="text-align: center;">
            <h1 style="color: #c19b6b; font-weight: 600; letter-spacing: 1px; font-size: 28px; margin-bottom: 5px;">
              Exclusive Offer from G-Crown ✨
            </h1>
            <p style="color: #8b6b45; margin: 0 0 15px; font-size: 14px;">
              ${message}
            </p>
          </div>

          <div style="background-color: #ffffff; border: 1px solid #e3d3c1; padding: 18px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; color: #7a5b3b; font-size: 15px;">
              <b>Your Offer Gift Awaits 👑</b>
            </p>
            <p style="margin: 10px 0 0; font-size: 26px; font-weight: bold; color: #c19b6b; letter-spacing: 2px;">
              ${promoCode}
            </p>
            <p style="margin: 8px 0 0; color: #5f4933; font-size: 14px;">
              Enjoy <strong>${percent}% OFF</strong> on purchase.
            </p>
            <p style="margin: 8px 0 0; color: #8b6b45; font-size: 13px;">
              Valid until: <strong>${expiry.toDateString()}</strong>
            </p>


            <div style="text-align: center; margin-top: 22px;">
    <a href="http://localhost:5173" style="display: inline-block; padding: 12px 26px; background-color: #c19b6b; color: white; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 500; letter-spacing: 1px;">
      Explore G-Crown
    </a>
  </div>
          </div>

          <p style="text-align: center; font-size: 12px; color: #97826b; margin-top: 25px;">
            With Love & Craftsmanship — G-Crown Family
          </p>
        </div>`
        : `<div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #fff8f2; padding: 30px; border-radius: 10px; border: 1px solid #f5e3d8; max-width: 600px; margin: auto;">

  <div style="text-align: center;">
    <h1 style="color: #c19b6b; font-weight: 600; letter-spacing: 1px; font-size: 28px; margin-bottom: 5px;">
      A Special Note from G-Crown ✨
    </h1>
    <p style="color: #8b6b45; margin: 0 0 15px; font-size: 14px;">
      Discover Elegance. Embrace Luxury.
    </p>
  </div>

 <p style="color: #5e4d3c; font-size: 15px; line-height: 24px; margin-top: 10px; text-align:center; white-space:pre-line;">
  ${message}
</p>


  <p style="font-size: 14px; color: #624c35; text-align: center; margin: 25px 0 10px;">
    We appreciate your presence in our exclusive community of jewelry lovers.
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

    // Save promo code globally
    if (promoCode) {
      global.PROMO_COUPONS[promoCode] = {
        percent,
        expiresAt: expiry
      };
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        promoCode
          ? `Promotion with code ${promoCode} sent successfully!`
          : "Promotion sent to all subscribers!"
      )
    );

  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
};


export { promation }