import mongoose from "mongoose";
export interface SlidersDocument extends mongoose.Document {
  title: string;
  subtitle: string;
  image: string;
  url: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    subtitle: {
        type: String,
        default: null,
    },
    image: {
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
  },
  { timestamps: true, versionKey: false }
);

const Slider = mongoose.model<SlidersDocument>("Slider", sliderSchema);

export default Slider;
