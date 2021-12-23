import mongoose from "mongoose"
export interface BlogDocument extends mongoose.Document {
  title: string;
  content: object;
  creator_id: string;
  creator_name: string;
  creator_role: string;
  creator_specialist: string;
  creator_institution: string;
  creator_picture_url: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null,
      },
    content: {
      type: Object,
      default: null,
    },
    creator_id: {
      type: String,
      default: null
    },
    creator_name: {
        type: String,
        default: null
      },
    creator_role: {
        type: String,
        default: null
      },
      creator_specialist: {
        type: String,
        default: null
      },
      creator_institution: {
        type: String,
        default: null
      },
      creator_picture_url: {
        type: String,
        default: null
      },
}, { timestamps: true, versionKey: false });

const Blog = mongoose.model<BlogDocument>('Blog', blogSchema);

export default Blog;


