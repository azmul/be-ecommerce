import mongoose from "mongoose";

export type MessageType = {
  id: string;
  user_id: string;
  role: number;
  name: string;
  picture_url: string;
  text: string;
  time: Date;
}
export interface MessageDocument extends mongoose.Document {
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  messages: Array<MessageType>;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema({
    appointment_id: {
      type: String,
      default: null
    },
    patient_id: {
      type: String,
      default: null
    },
    doctor_id: {
        type: String,
        default: null
      },
    messages: {
       type: Array, 
       default: []
    },
}, { timestamps: true, versionKey: false });

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;


