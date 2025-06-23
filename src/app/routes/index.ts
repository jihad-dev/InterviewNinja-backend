
import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { questionRoutes } from "../modules/questions/questionRoutes";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/questions",
        route: questionRoutes,
    },
   



];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
