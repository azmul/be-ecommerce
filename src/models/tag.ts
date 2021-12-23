import mongoose from "mongoose"
export interface TagDocument extends mongoose.Document {
  name: string;
  name_local: string;
  number_id: number;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    name_local: {
        type: String,
        default: null,
    },
    number_id: {
        type: Number,
        default: null,
    },
    is_active: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true, versionKey: false });

const Tag = mongoose.model<TagDocument>('Tag', tagSchema);

export default Tag;


