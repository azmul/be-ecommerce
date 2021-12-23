import mongoose from 'mongoose'
import { Schedules } from "../utils/schedules"
export interface DoctorScheduleDocument extends mongoose.Document {
  doctor_id: string;
  doctor_name: string;
  doctor_phone: string;
  is_updated: boolean;
  schedules: object;
  createdAt: Date;
  updatedAt: Date;
}

const doctorScheduleSchema = new mongoose.Schema({
    doctor_id:{
      type: String,
      default: null
    },
    doctor_name: {
      type: String,
      default: null
    },
    doctor_phone: {
      type: String,
      default: null
    },
    is_updated: {
      type: Boolean,
      default: false
    },
    schedules: {
       type: Object,
       default: Schedules
    }
    
}, {timestamps: true, versionKey: false });

const DoctorSchedule = mongoose.model<DoctorScheduleDocument>('DoctorSchedule', doctorScheduleSchema);

export default DoctorSchedule;