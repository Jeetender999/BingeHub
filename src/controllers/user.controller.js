import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
    //  res.status(200).json({
    //     message : "Reister user message code "
    // })

    const {fullName, email, username, password} = req.body

    console.log(email, fullName, username, password)

    if(
        [fullName, email, username, password].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"Missing value")
    }


   const existedUser = User.findOne({
        $or : [{username},{email}]
    })

    console.log(existedUser)

    // Showing error need to check this error

    // if(existedUser)
    // {
    //     throw new ApiError(409,"User with email or username already exist")
    // }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError("409", "Avatar image is requireds")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError("409", "Avatar image on cloudinary failed")
    }

  const user = await  User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

   const createdUser = User.findById(user._id).select("-password -refreshToken")

    if(!createdUser)
    {
        throw new ApiError(500, "Something went wrong while creating user")
    }
   
   
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )

   
    
})

export {registerUser}