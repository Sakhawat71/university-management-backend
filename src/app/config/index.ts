import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DATABASE_URL,
    default_pass: process.env.USER_PASSWORD,
    bcrypt_salt_round: process.env.SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
}