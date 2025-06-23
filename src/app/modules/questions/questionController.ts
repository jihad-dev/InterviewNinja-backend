import { Request, Response } from "express";
import { createQuestionServices } from "./questionService";

const createQuestion = async (req: Request, res: Response) => {
    try {
        // You can add auth logic here if needed (like your creatorRole example)
        const { question, answer, category } = req.body;

        if (!question || !answer || !category) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: question, answer, category",
            });
        }

        const newQuestion = await createQuestionServices.createQuestion({ question, answer, category });

        res.status(201).json({
            success: true,
            message: "Question created successfully",
            data: newQuestion,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};


const getQuestionsByCategoryQuery = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;
        if (!category || typeof category !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Missing or invalid category query parameter",
            });
        }
        const questions = await createQuestionServices.getQuestionsByCategory(category);
        res.status(200).json({
            success: true,
            data: questions,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

export const questionController = {
    createQuestion,
    getQuestionsByCategoryQuery,
}