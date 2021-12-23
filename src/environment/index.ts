import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URL = process.env.MONGO_URL!;
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY!;
export const TWILIO_VERIFICATION_SID = process.env.TWILIO_VERIFICATION_SID!;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME!;
export const APPLICATION = process.env.APPLICATION!;
export const FRONT_END_URL = process.env.FRONT_END_URL!;
