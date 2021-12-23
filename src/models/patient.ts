import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import  bcrypt from "bcrypt"
import {JWT_PRIVATE_KEY} from "../environment";
export interface PatientDocument extends mongoose.Document {
  numeric_id: string;
  picture_url: string;
  link: string;
  name: string;
  phone: string;
  password: string;
  email: string;
  gender: string;
  birth_day: string;
  city: string;
  thana: string;
  street: string;
  post_code: number;
  about_your_self: string;
  is_update_profile: boolean;
  is_active: boolean;
  role: number;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}


const patientSchema = new mongoose.Schema({
  numeric_id: {
    type: String,
    default: null,
  },
  picture_url: {
    type: String,
    default: null,
  },
  link: {
    type: String,
    required: true,
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
  city: {
    type: String,
    default: null,
  },
  thana: {
    type: String,
    default: null,
  },
  street: {
    type: String,
    default: null,
  },
  post_code: {
    type: Number,
    default: null,
  },
  about_your_self: {
    type: String,
    default: null,
  },
  is_update_profile: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  role: Number,
}, { timestamps: true, versionKey: false });

patientSchema.methods.generateAuthToken = function() { 
  const patient = this as PatientDocument; 
  const token = jwt.sign({ _id: patient._id, is_active: patient.is_active, phone: patient.phone, role: patient.role, is_update_profile: patient.is_update_profile, name: patient.name }, JWT_PRIVATE_KEY);
  return token;
}

// Used for logging in
patientSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const patient = this as PatientDocument;

  return bcrypt.compare(candidatePassword, patient.password).catch((e: any) => false);
};

const Patient = mongoose.model<PatientDocument>('Patient', patientSchema);

export default Patient;
