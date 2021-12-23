import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {JWT_PRIVATE_KEY} from "../environment";
export interface AdminDocument extends mongoose.Document {
  name: string;
  phone: string;
  password: string;
  role: number;
  is_approved: boolean;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken(): string;
}

const adminSchema = new mongoose.Schema({
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
      role: Number,
      is_approved: {
        type: Boolean,
        deafult: false
      },
},   { timestamps: true, versionKey: false  });

adminSchema.methods.generateAuthToken = function() { 
  const admin = this as AdminDocument;
  const token = jwt.sign({ _id: admin._id, phone: admin.phone, role: admin.role, name: admin.name }, JWT_PRIVATE_KEY);
  return token;
};
  
const Admin = mongoose.model<AdminDocument>('Admin', adminSchema);

export default Admin;
