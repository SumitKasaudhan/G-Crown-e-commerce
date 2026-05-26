import customerModel from "../models/customer/user.model.js";
import adminModel from "../models/admin/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const customerEmail = async (req ,res, next) => {
    try{
        const {email} = req.body;

        const isEmail = await customerModel.findOne({email: email});
    
        if(isEmail){
           return next()
        }

        return res.status(401).json(new ApiError(401, "Email not Found."));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}


const adminEmail = async (req, res, next) => {
    try{
        const {email} = req.body;

        const isEmail = await adminModel.findOne({email: email});

        if(isEmail){
           return next()
        }

        return res.status(401).json(new ApiError(401, "Email not found"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}


export {customerEmail, adminEmail};