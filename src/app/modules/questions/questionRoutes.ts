import express from "express";
import { questionController } from "./questionController";

const router = express.Router();


router.post("/create-question", questionController.createQuestion as express.RequestHandler);


// 👇 Get questions by category via query param
router.get("/", questionController.getQuestionsByCategoryQuery as express.RequestHandler);


// 👇 Get all questions
router.get("/all-questions", questionController.getAllQuestions as express.RequestHandler);


export const questionRoutes = router;

