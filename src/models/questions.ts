import mongoose from 'mongoose'
export interface QuestionsDocument extends mongoose.Document {
  product_name: string;
  product_id: string;
  product_image: string;
  product_numeric_id: number;
  questions: Array<Object>;
  createdAt: Date;
  updatedAt: Date;
}

// {
//   ques: null,
//   isAns: false,
//   ans: null,
//   ansTime: true,
//   cutomerName: null,
//   cutomerPhone: null,
//   id: null,
// }

const questionSchema = new mongoose.Schema({
    product_name: {
      type: String,
      default: null,
    },
    product_id: {
        type: String,
        default: null,
    },
    product_numeric_id: {
        type: Number,
        default: null,
    },
    product_image: {
      type: String,
      default: false,
    },
    questions: [{
      type: Object
    }]
}, {timestamps: true, versionKey: false });

const Question = mongoose.model<QuestionsDocument>('Question', questionSchema);

export default Question;
