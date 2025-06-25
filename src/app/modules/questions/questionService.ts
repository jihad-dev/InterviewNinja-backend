import { Request, Response } from "express";
import Question, { IQuestion } from "./questionModel";


const createQuestion = async (data: {
    question: string;
    answer: string;
    category: string;
}): Promise<IQuestion> => {
    const newQuestion = new Question(data);
    return await newQuestion.save();
};
// get all questions 

const getAllQuestions = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
        $or: [
            { question: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
        ],
    };

    const total = await Question.countDocuments(query);
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;

    const questions = await Question.find(query)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .sort({ createdAt: -1 });

    res.json({
        total,
        questions,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
    });
};


const getQuestionsByCategory = async (category: string): Promise<IQuestion[]> => {
    return await Question.find({ category });
};



export const createQuestionServices = {
    createQuestion,
    getQuestionsByCategory,
    getAllQuestions,
}