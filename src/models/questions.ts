import mongoose from 'mongoose'
export interface QuestionsDocument extends mongoose.Document {
  product_name: string;
  product_id: string;
  product_image: string;
  product_numeric_id: number;
  questions: Array<Object>;
  is_question: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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
      type: Boolean,
      default: false,
    },   
    is_question: {
      type: Boolean,
      default: false
    },
    questions: [{
        ques: null,
        ques_time: null,
        is_ans: false,
        ans: null,
        ans_time: null,
        cutomer_name: null,
        cutomer_phone: null,
    }]
}, {timestamps: true, versionKey: false });

const Question = mongoose.model<QuestionsDocument>('Question', questionSchema);

export default Question;
