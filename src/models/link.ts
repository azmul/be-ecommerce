import mongoose from 'mongoose'
export interface LinkDocument extends mongoose.Document {
  link: string;
  is_active: boolean;
  patient_phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const linkSchema = new mongoose.Schema({
    link: {
      type: String,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: false,
    },   
    patient_phone: {
      type: String,
      default: null
    }
}, {timestamps: true, versionKey: false });

const Link = mongoose.model<LinkDocument>('Link', linkSchema);

export default Link;
