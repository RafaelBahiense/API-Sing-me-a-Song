import { Router } from "express";

const router: Router = Router();

router.use("/", () => console.log(""));

export const MainRouter: Router = router;
