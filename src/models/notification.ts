import mongoose from "mongoose"

export interface NotificationDocument extends mongoose.Document {
  user_id: string;
  name: string;
  role: number;
  appointment_id: string;
  appointment_role: number;
  picture_url: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: null,
    },
    role: {
        type: Number,
        default: null,
    },
    name: {
        type: String,
        default: null,
    },
    picture_url: {
        type: String,
        default: null,
    },
    appointment_id: {
        type: String,
        default: null
    },
    appointment_role: {
        type: Number,
        default: null
    },
    text: {
        type: String,
        default: null
    },
}, { timestamps: true, versionKey: false });

const Notification = mongoose.model<NotificationDocument>('Notification', notificationSchema);

export default Notification;


