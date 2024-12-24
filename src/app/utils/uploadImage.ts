import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const sendImageToCloudinary = async () => {

    // Configuration
    cloudinary.config({
        cloud_name: config.cloud_name,
        api_key: config.cloud_api_key,
        api_secret: config.cloud_api_secret,
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes',
        }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);


};