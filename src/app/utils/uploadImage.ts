import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs'
import AppError from '../errors/appError';
import { StatusCodes } from 'http-status-codes';

// Configuration
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_api_key,
    api_secret: config.cloud_api_secret,
});

export const sendImageToCloudinary = async (
    imageName: string,
    path: string
): Promise<Record<string, unknown>> => {
    // Upload an image
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            { public_id: imageName },
            function (error, result) {
                if (error) {
                    reject(error);
                }
                if (result) {
                    resolve(result);
                } else {
                    reject(new AppError(
                        StatusCodes.NOT_FOUND,
                        'Upload result is undefined'
                    ));
                }

                // delete local file after send db
                fs.unlink(path, (err) => {
                    if (err) {
                        reject(err)
                    }
                })
            }
        );
    });
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