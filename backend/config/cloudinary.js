import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    console.log("Cloudinary name:", process.env.CLOUDINARY_NAME);
    console.log("API key exists:", !!process.env.CLOUDINARY_API_KEY);
    console.log("Secret exists:", !!process.env.CLOUDINARY_SECRET_KEY);
};

export default connectCloudinary;