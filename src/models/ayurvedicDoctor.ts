import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {JWT_PRIVATE_KEY} from "../environment";
export interface AyurvedicDoctorDocument extends mongoose.Document {
  numeric_id: string;
  picture_url: string;
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
  chamber_address: string;
  degree: string;
  register_number: string;
  specialist: string;
  institution: string;
  year_of_experience: number;
  fees: number;
  about_your_self: string;
  is_update_profile: boolean;
  is_active: boolean;
  is_emergency: boolean;
  is_approved: boolean;
  payment_method: number;
  payment_number: number;
  patient_count: number;
  role: number;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken(): string;
}

const ayurvedicDoctorSchema = new mongoose.Schema({
  numeric_id: {
    type: String,
    default: null,
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
  email: {
    type: String,
    default: null,
    unique: true,
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
  chamber_address: {
    type: String,
    default: null,
  },
  degree: {
    type: String,
    default: null,
  },
  register_number: {
    type: String,
    default: null,
  },
  specialist: {
    type: String,
    default: null
  },
  institution: {
    type: String,
    default: null
  },
  year_of_experience: {
    type: Number,
    default: null,
  },
  fees: {
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
  is_emergency: {
    type: Boolean,
    default: false,
  },
  payment_method: {
      type: Number,
      default: 1,
    },
  payment_number: {
    type: Number,
    default: null,
  },
  role: Number,
  rate: {
    type: Number,
    default: 5,
  },
  patient_count: {
    type: Number,
    default: 0
  }
}, { timestamps: true, versionKey: false });

ayurvedicDoctorSchema.methods.generateAuthToken = function() { 
  const doctor = this as AyurvedicDoctorDocument;
  const token = jwt.sign({ _id: doctor._id,  is_emergency: doctor.is_emergency, is_active: doctor.is_active, phone: doctor.phone, role: doctor.role, is_update_profile: doctor.is_update_profile, name: doctor.name }, JWT_PRIVATE_KEY);
  return token;
}

const AyurvedicDoctor = mongoose.model<AyurvedicDoctorDocument>('AyurvedicDoctor', ayurvedicDoctorSchema);

export default AyurvedicDoctor;
