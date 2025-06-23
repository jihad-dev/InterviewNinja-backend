import Question, { IQuestion } from "./questionModel";
import { Request, Response } from "express";

const createQuestion = async (data: {
    question: string;
    answer: string;
    category: string;
}): Promise<IQuestion> => {
    const newQuestion = new Question(data);
    return await newQuestion.save();
};

const getQuestionsByCategory = async (category: string): Promise<IQuestion[]> => {
    return await Question.find({ category });
};

export const createQuestionServices = {
    createQuestion,
    getQuestionsByCategory,
}