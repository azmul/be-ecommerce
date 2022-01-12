import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import  bcrypt from "bcrypt"
import {JWT_PRIVATE_KEY} from "../environment";

export interface UserDocument extends mongoose.Document {
  id: number;
  picture_url: string;
  name: string;
  phone: string;
  password: string;
  email: string;
  gender: string;
  birth_day: string;
  district: string;
  upazila: string;
  address: string;
  post_code: number;
  is_active: boolean;
  orders: Array<object>;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}


const userSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  picture_url: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    minlength: 11,
    maxlength: 15
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  gender: {
    type: String,
    default: null,
  },
  birth_day: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    default: null,
  },
  district: {
    type: String,
    default: null,
  },
  upazila: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  post_code: {
    type: Number,
    default: null,
  },
  orders: [{
    type: Object,
    default: null,
  }],
  is_active: {
    type: Boolean,
    default: true,
  },
  role: Number,
}, { timestamps: true, versionKey: false });

userSchema.methods.generateAuthToken = function() { 
  const user = this as UserDocument; 
  const token = jwt.sign({ _id: user._id, is_active: user.is_active, phone: user.phone, name: user.name }, JWT_PRIVATE_KEY);
  return token;
}

// Used for logging in
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e: any) => false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
