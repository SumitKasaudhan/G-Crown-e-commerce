import auth_Model from "../../models/customer/user.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { encryptPasswordMethod, decryptPasswordMethod } from "../../utils/passwordEncrypt&passwordDecrypt.js";
import cookiesForUser from "../../utils/cookiesForUser.js";
import { cloudinary, deleteFromCloudinary } from "../../configs/cloudinary.js";
import {OAuth2Client} from "google-auth-library"

const Signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const customerDetail = auth_Model({
            email: email,
            password: await encryptPasswordMethod(password),
            firstName: firstName,
            lastName: lastName
        });

        await customerDetail.save();

        customerDetail.password = undefined;
        customerDetail.contact = undefined;
        customerDetail.profileImage = undefined;

        await cookiesForUser(res, customerDetail)

        return res.status(200).json(new ApiResponse(200, null, "Registration Successful"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const customerDetail = await auth_Model.findOne({ email: email });

        const decryptPassword = await decryptPasswordMethod(password, customerDetail.password);

        if (!decryptPassword) {
            return res.status(401).json(new ApiError(401, "Incorrect Password"));
        }

        customerDetail.password = undefined;
        customerDetail.contact = undefined;
        customerDetail.profileImage = undefined;

        await cookiesForUser(res, customerDetail)

        return res.status(200).json(new ApiResponse(200, null, "Access Granted"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const ForgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        let customerDetail = await auth_Model.findOneAndUpdate(
            { email: email },
            {
                password: await encryptPasswordMethod(password)
            }
        );

        customerDetail.password = undefined;
        customerDetail.contact = undefined;
        customerDetail.profileImage = undefined;

        await cookiesForUser(res, customerDetail)
        return res.status(200).json(new ApiResponse(200, null, "Password Change Successfully."));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        const { _id } = req.user;

        const userDetail = await auth_Model.findById(_id);

        const decryptPassword = await decryptPasswordMethod(oldPassword, userDetail.password);

        if (!decryptPassword) {
            return res.status(401).json(new ApiError(401, "Incorrect Old Password"));
        }

        await auth_Model.findByIdAndUpdate(
            { _id },
            { password: await encryptPasswordMethod(newPassword) }
        );

        return res.status(200).json(new ApiResponse(200, null, "Password Changes Successfully"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const UpdateProfile = async (req, res) => {
    try {
        const { firstName, lastName, contact, gender } = req.body;
        const { _id } = req.user;

        const updateData = {};

        let userDetail = await auth_Model.findById(_id);

        // if(userDetail.contact){
        //     return res.status(401).json(new ApiError(401, "Duplicate Contact."));
        // }

        if (userDetail.profileImage) {
            await deleteFromCloudinary(userDetail.profileImage);
        }

        let image = null;

        if (req.file) {
            image = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "image" },
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result.secure_url);
                    }
                );
                stream.end(req.file.buffer);
            });
        }

        if (req.file) updateData.profileImage = image;
        if (contact) updateData.contact = parseInt(contact);
        if (gender) updateData.gender = gender;
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (!lastName) updateData.lastName = ""

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data provided to update"
            });
        }

        let userData = await auth_Model.findByIdAndUpdate(
            _id,
            { $set: updateData },
            { new: true }
        );

        if(!userData){
            return res.status(401).json(new ApiError(401, "Duplication Value"));
        }

        return res.status(200).json(new ApiResponse(200, null, "Profile updated successfully"));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.message }]));
    }
};

const myProfile = async (req, res) => {
    try {
        const { _id } = req.user;

        const userDetail = await auth_Model.findById(_id);

        userDetail.password = undefined

        return res.status(200).json(new ApiResponse(200, userDetail, "SuccessFully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const Signout = async (req, res) => {
    try {
        res.clearCookie("AccessToken");
        res.clearCookie("RefreshToken");

        return res.status(200).json(new ApiResponse(200, null, "Signout Successfully"))
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]))
    }
}

const GoogleAuth = async (req, res) => {
    try {
        const { token } = req.body;

        const client = new OAuth2Client(process.env.Google_ClientId)

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.Google_ClientId
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let nameArray = name.split(" ");

        let user = await auth_Model.findOne({ email });

        if (!user) {
            user = auth_Model({
                email: email,
                firstName: nameArray[0],
                lastName: (!nameArray[1]) ? "" : nameArray[1],
                profileImage: picture
            })

            await user.save();
        }

        await cookiesForUser(res, user);

        return res.status(200).json(new ApiResponse(200, {userEmail: email}, "Successful"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export { Signup, Login, ForgotPassword, changePassword, Signout, UpdateProfile, myProfile, GoogleAuth };