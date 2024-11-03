import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
  
    try {
        
        if(!localFilePath) return null
        
        // Upload file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })

        //File is uploaded on server

        console.log("File uploaded on cloudinary ",response.url)

        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // Removes locally saved temporary file as operation failed
        return null
    }
}

export {uploadOnCloudinary}