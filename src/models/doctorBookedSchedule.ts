import mongoose from 'mongoose'
export interface DoctorBookedScheduleDocument extends mongoose.Document {
  doctor_id: string;
  created_at: string;
  time_slot: string;
  createdAt: Date;
  updatedAt: Date;
}

const doctorBookedScheduleSchema = new mongoose.Schema({
    doctor_id:{
      type: String,
      default: null
    },
    created_at: {
      type: String,
      default: null
    },
    time_slot: {
      type: String,
      default: null
    },
}, { timestamps: true, versionKey: false });

const DoctorBookedSchedule = mongoose.model<DoctorBookedScheduleDocument>('DoctorBookedSchedule', doctorBookedScheduleSchema);

export default DoctorBookedSchedule;
