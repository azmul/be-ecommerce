import mongoose from "mongoose";
export interface SlidersDocument extends mongoose.Document {
  title: string;
  title_local: string;
  subtitle: string;
  subtitle_local: string;
  image: string;
  public_id: string;
  url: string;
  is_active: boolean;
  comment: string;
  last_updated_by: string;
  createdAt: Date;
  updatedAt: Date;
}

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    title_local: {
      type: String,
      default: null,
    },
    subtitle: {
        type: String,
        default: null,
    },
    subtitle_local: {
      type: String,
      default: null,
    },
    image: {
        type: String,
        default: null,
    },
    public_id: {
      type: String,
      default: null,
    },
    url: {
        type: String,
        default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    last_updated_by: {
      type: String,
      default: null,
  },
  comment: {
      type: String,
      default: null,
  },
  },
  { timestamps: true, versionKey: false }
);

const Slider = mongoose.model<SlidersDocument>("Slider", sliderSchema);

export default Slider;
