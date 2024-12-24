import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    db_url: process.env.DATABASE_URL,
    default_pass: process.env.USER_PASSWORD,
    bcrypt_salt_round: process.env.SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    reset_pass_ui_link : process.env.RESET_PASSWORD_UI_LINK,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    cloud_name : process.env.CLOUD_NAME,
    cloud_api_key : process.env.API_KEY,
    cloud_api_secret : process.env.API_SECRET,
}