import mongoose from "mongoose"
export interface MessageDocument extends mongoose.Document {
  name: string;
  phone: string;
  message: string;
  is_done: boolean;
  comment: string;
  last_updated_by: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        default: null,
    },
    comment: {
        type: String,
        default: null,
    },
    is_done: {
        type: Boolean,
        default: true,
    },
    last_updated_by: {
        type: String,
        default: null,
    },

}, { timestamps: true, versionKey: false });

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;


