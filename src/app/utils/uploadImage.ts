import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';

export const sendImageToCloudinary = async (
    imageName: string,
    path: string
) => {

    // Configuration
    cloudinary.config({
        cloud_name: config.cloud_name,
        api_key: config.cloud_api_key,
        api_secret: config.cloud_api_secret,
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            path, {
            public_id: imageName,
        }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);


};

// use multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

export const upload = multer({ storage: storage });