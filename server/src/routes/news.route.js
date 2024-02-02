import { Router } from "express";
const router = Router();

import {
  getAllNews,
  deleteNews,
  toggleReadStatus,
} from "../controllers/news.controller.js";

router.route("/").get(getAllNews);
router.route("/:newsId").post(toggleReadStatus).patch(deleteNews);

export default router;
