// src/models/questionModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  answer: string;
  category: string;
}

const QuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
});

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
